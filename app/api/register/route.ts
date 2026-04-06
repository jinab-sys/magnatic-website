import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { businessName, reachVia, contactValue, message } =
      await request.json();

    if (!businessName || !reachVia || !contactValue) {
      return NextResponse.json(
        { error: "Business name and contact info are required." },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("leads").insert({
      business_name: businessName,
      reach_via:     reachVia,
      contact_value: contactValue,
      message:       message || null,
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}