import { NextResponse } from "next/server"
import { Resend } from "resend"
import { createClient } from "@/lib/supabase/server"
import { waitlistSchema } from "@/lib/validations"

const FROM = "Listeners <onboarding@resend.dev>"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = waitlistSchema.safeParse(body)

    if (!parsed.success) {
      const errorMessage = parsed.error.issues.map((issue) => issue.message).join(" ")
      return NextResponse.json({ error: errorMessage }, { status: 400 })
    }

    const supabase = await createClient()
    const { error: dbError } = await supabase.from("waitlist").insert(parsed.data)

    if (dbError) {
      if (dbError.code === "23505") {
        return NextResponse.json({ error: "This email is already on the waitlist." }, { status: 409 })
      }
      console.error("[v0] Waitlist DB error:", dbError)
      return NextResponse.json({ error: "Failed to save waitlist submission." }, { status: 500 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.log("[v0] RESEND_API_KEY not set — skipping confirmation email.")
      return NextResponse.json({ ok: true, emailed: false })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: FROM,
      to: parsed.data.email,
      subject: "Welcome to Listeners",
      text: "Thank you for joining the Listeners waitlist. We're building a place where people can feel heard, understood, and supported. You'll be among the first to know when we launch.",
      html: confirmationHtml(parsed.data.name),
    })

    return NextResponse.json({ ok: true, emailed: true })
  } catch (error) {
    console.error("[v0] Waitlist API error:", error)
    return NextResponse.json({ error: "Failed to process waitlist submission." }, { status: 500 })
  }
}

function confirmationHtml(name?: string) {
  const greeting = name ? `Hi ${escapeHtml(name)},` : "Hi there,"
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:480px;margin:0 auto;padding:32px;color:#1E1B4B;line-height:1.6;">
    <h1 style="font-size:22px;font-weight:600;margin:0 0 16px;">Welcome to Listeners</h1>
    <p style="margin:0 0 12px;color:#444;">${greeting}</p>
    <p style="margin:0 0 12px;color:#444;">Thank you for joining the Listeners waitlist. We're building a place where people can feel heard, understood, and supported. You'll be among the first to know when we launch.</p>
    <p style="margin:24px 0 0;color:#888;font-size:13px;">— The Listeners team</p>
  </div>`
}

function escapeHtml(str: string) {
  return str.replace(/[&<>"']/g, (c) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }
    return map[c]
  })
}
