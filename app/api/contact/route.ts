import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_TOKEN = "8217831644:AAGwvBqQUx7ISRk843Mkr9YVupav9Ms9EOU";
const TELEGRAM_CHAT_ID = "1204310951";

export async function POST(req: NextRequest) {
  try {
    const { name, email, type, message } = await req.json();

    const text =
      `📬 *New Contact Form Submission*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📧 *Email:* ${email}\n` +
      `🏷️ *Type:* ${type || "Not specified"}\n` +
      `💬 *Message:*\n${message}`;

    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "Markdown",
        }),
      }
    );

    const data = await res.json();

    if (!data.ok) {
      return NextResponse.json({ error: data.description }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}