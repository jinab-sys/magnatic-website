import { createClient } from "@supabase/supabase-js";
import { google } from "googleapis";
import { NextResponse } from "next/server";

const VALID_SERVICES = [
    "brand_ad",
    "social_calendar",
    "end_to_end_social_media_management",
]

async function appendToSheet(values: string[]) {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: "Sheet1!A:H",
        valueInputOption: "RAW",
        requestBody: { values: [values] },
    });
}

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

        await appendToSheet([
            businessName,
            personName,
            email,
            phone,
            businessAddress || "",
            service,
            message || "",
            new Date().toISOString(),
        ]).catch((err) => console.error("Sheets error:", err));

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error("Server error:", err);
        return NextResponse.json(
            { error: "Server error. Please try again." },
            { status: 500 }
        );
    }
}
