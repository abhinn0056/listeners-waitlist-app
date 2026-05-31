import { NextResponse } from "next/server"
import { Resend } from "resend"

const FROM = "Listeners <onboarding@resend.dev>"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { full_name, email, country, linkedin, motivation, experience } = body ?? {}

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required." }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.log("[v0] RESEND_API_KEY not set — skipping emails.")
      return NextResponse.json({ ok: true, emailed: false })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    // Confirmation to the applicant.
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Your Listeners application",
      text: "Thank you for applying to become a Listener. We've received your application and will review it carefully. We'll reach out soon with next steps.",
      html: applicantHtml(typeof full_name === "string" ? full_name : undefined),
    })

    // Full summary to the admin.
    const adminEmail = process.env.ADMIN_EMAIL
    if (adminEmail) {
      await resend.emails.send({
        from: FROM,
        to: adminEmail,
        subject: `New listener application — ${full_name ?? email}`,
        text: summaryText({ full_name, email, country, linkedin, motivation, experience }),
        html: summaryHtml({ full_name, email, country, linkedin, motivation, experience }),
      })
    } else {
      console.log("[v0] ADMIN_EMAIL not set — skipping admin summary.")
    }

    return NextResponse.json({ ok: true, emailed: true })
  } catch (error) {
    console.log("[v0] Listener email error:", error)
    return NextResponse.json({ error: "Failed to send emails." }, { status: 500 })
  }
}

type Application = {
  full_name?: string
  email?: string
  country?: string
  linkedin?: string | null
  motivation?: string
  experience?: string
}

function applicantHtml(name?: string) {
  const greeting = name ? `Hi ${escapeHtml(name)},` : "Hi there,"
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:480px;margin:0 auto;padding:32px;color:#1E1B4B;line-height:1.6;">
    <h1 style="font-size:22px;font-weight:600;margin:0 0 16px;">Thank you for applying</h1>
    <p style="margin:0 0 12px;color:#444;">${greeting}</p>
    <p style="margin:0 0 12px;color:#444;">Thank you for applying to become a Listener. We've received your application and will review it carefully. We'll reach out soon with next steps.</p>
    <p style="margin:24px 0 0;color:#888;font-size:13px;">— The Listeners team</p>
  </div>`
}

function summaryText(a: Application) {
  return [
    `New listener application`,
    ``,
    `Full name: ${a.full_name ?? ""}`,
    `Email: ${a.email ?? ""}`,
    `Country: ${a.country ?? ""}`,
    `LinkedIn: ${a.linkedin || "—"}`,
    ``,
    `Motivation:`,
    `${a.motivation ?? ""}`,
    ``,
    `Experience:`,
    `${a.experience ?? ""}`,
  ].join("\n")
}

function summaryHtml(a: Application) {
  const row = (label: string, value?: string | null) =>
    `<tr><td style="padding:8px 0;color:#888;font-size:13px;vertical-align:top;width:120px;">${label}</td><td style="padding:8px 0;color:#1E1B4B;font-size:14px;">${escapeHtml(value || "—")}</td></tr>`
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:32px;color:#1E1B4B;line-height:1.6;">
    <h1 style="font-size:20px;font-weight:600;margin:0 0 20px;">New listener application</h1>
    <table style="width:100%;border-collapse:collapse;">
      ${row("Full name", a.full_name)}
      ${row("Email", a.email)}
      ${row("Country", a.country)}
      ${row("LinkedIn", a.linkedin)}
    </table>
    <h2 style="font-size:15px;font-weight:600;margin:24px 0 6px;">Motivation</h2>
    <p style="margin:0;color:#444;white-space:pre-wrap;">${escapeHtml(a.motivation || "—")}</p>
    <h2 style="font-size:15px;font-weight:600;margin:20px 0 6px;">Experience</h2>
    <p style="margin:0;color:#444;white-space:pre-wrap;">${escapeHtml(a.experience || "—")}</p>
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
