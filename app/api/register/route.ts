import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const VALID_SERVICES = [
    "brand_ad",
    "social_calendar",
    "end_to_end_social_media_management",
]

export async function POST(request: Request) {
    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
        );

        const { businessName, personName, email, phone, businessAddress, service, message } = await request.json();

        if (!businessName || !personName || !email || !phone || !service) {
            return NextResponse.json(
                { error: "Please fill in all required fields." },
                { status: 400 }
            );
        }

        if (!VALID_SERVICES.includes(service)) {
            return NextResponse.json(
                { error: "Please select a valid service." },
                { status: 400 }
            );
        }

        const { error } = await supabase.from("leads").insert({
            business_name:    businessName,
            person_name:      personName,
            email,
            phone,
            business_address: businessAddress || null,
            service,
            message:          message || null,
        });

        if (error) {
            console.error("Supabase error:", error);
            if (error.code === "23505") {
                const isDupe = error.message?.includes("email")
                    ? "This email is already registered."
                    : "This phone number is already registered."
                return NextResponse.json({ error: isDupe }, { status: 409 });
            }
            return NextResponse.json(
                { error: "Failed to save. Please try again." },
                { status: 500 }
            );
        }

        // Fire Make.com webhook without awaiting — doesn't slow down form submission
        fetch(process.env.MAKE_WEBHOOK_URL!, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ businessName, personName, email, phone, businessAddress, service, message }),
        }).catch(() => {});

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error("Server error:", err);
        return NextResponse.json(
            { error: "Server error. Please try again." },
            { status: 500 }
        );
    }
}
