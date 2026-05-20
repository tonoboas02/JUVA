import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getService } from "@/lib/bookingServices";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let body: {
    serviceId: string;
    date: string;
    startTime: string;
    name: string;
    email: string;
    phone?: string;
    notes?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { serviceId, date, startTime, name, email, phone, notes } = body;

  if (!serviceId || !date || !startTime || !name || !email) {
    return NextResponse.json(
      { error: "serviceId, date, startTime, name, and email are required" },
      { status: 400 }
    );
  }

  const service = getService(serviceId);
  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  // Check capacity before inserting
  const { count, error: countError } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true })
    .eq("service_id", serviceId)
    .eq("date", date)
    .eq("start_time", startTime)
    .eq("status", "confirmed");

  if (countError) {
    return NextResponse.json({ error: countError.message }, { status: 500 });
  }

  if ((count ?? 0) >= service.capacity) {
    return NextResponse.json(
      { error: "Este horario ya no tiene disponibilidad." },
      { status: 409 }
    );
  }

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      service_id: serviceId,
      service_name: service.name,
      date,
      start_time: startTime,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      notes: notes?.trim() || null,
      status: "confirmed",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ booking: data }, { status: 201 });
}
