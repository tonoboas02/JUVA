import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { getService, generateTimeSlots } from "@/lib/bookingServices";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get("serviceId");
    const date = searchParams.get("date");

    if (!serviceId || !date) {
      return NextResponse.json(
        { error: "serviceId and date are required" },
        { status: 400 }
      );
    }

    const service = getService(serviceId);
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const allSlots = generateTimeSlots(service.durationMin);
    const supabase = getSupabase();

    const { data: existingBookings, error } = await supabase
      .from("bookings")
      .select("start_time")
      .eq("service_id", serviceId)
      .eq("date", date)
      .eq("status", "confirmed");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const bookedCounts: Record<string, number> = {};
    for (const booking of existingBookings ?? []) {
      bookedCounts[booking.start_time] =
        (bookedCounts[booking.start_time] ?? 0) + 1;
    }

    const slots = allSlots.map((time) => ({
      time,
      available: (bookedCounts[time] ?? 0) < service.capacity,
      remaining: service.capacity - (bookedCounts[time] ?? 0),
    }));

    return NextResponse.json({ slots, service });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
