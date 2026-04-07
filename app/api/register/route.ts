import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
    );

    const { businessName, email, phone, message } = await request.json();

    if (!businessName || !email) {
      return NextResponse.json(
        { error: "Business name and email are required." },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existing } = await supabase
      .from("leads")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: "This email is already on the waitlist." },
        { status: 409 }
      );
    }

    const { error } = await supabase.from("leads").insert({
      business_name: businessName,
      email,
      phone:         phone || null,
      message:       message || null,
    });

    if (error) {
      console.error("Supabase error:", error);
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already on the waitlist." },
          { status: 409 }
        );
      }
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
