// src/app/api/contact/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// POST /api/contact — receives the contact-form submission, validates server-
// side, blocks bots via a honeypot, rate-limits per IP, and forwards the
// message as an email through Resend (https://resend.com).
//
// Returns:
//   200 { ok: true }                 — accepted (and sent if Resend configured)
//   400 { ok: false, error: "..." }  — validation failure (key matches t.contact.form.errors)
//   429 { ok: false, error: "rateLimited" }
//   502 { ok: false, error: "sendFailed" }
//
// If RESEND_API_KEY is missing, the route still returns 200 so the dev UX
// works locally; the submission is logged to the server console only.
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ─── Limits ─────────────────────────────────────────────────────────────────
const MAX_NAME_LEN = 100;
const MAX_EMAIL_LEN = 254;
const MAX_PHONE_LEN = 32;
const MAX_SUBJECT_LEN = 50;
const MAX_MESSAGE_LEN = 5000;
const MIN_MESSAGE_LEN = 10;

const ALLOWED_SUBJECTS = new Set([
  "tour-inquiry",
  "custom-trip",
  "booking",
  "partnership",
  "feedback",
  "other",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── Rate limit ─────────────────────────────────────────────────────────────
// 3 submissions per IP per hour. Module-level Map; serverless instances may
// not share state, so this is best-effort defence — the honeypot is the
// primary spam block.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const ipHits = new Map<string, number[]>();

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const recent = (ipHits.get(ip) || []).filter((t) => t > cutoff);
  if (recent.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, recent);
    return true;
  }
  recent.push(now);
  ipHits.set(ip, recent);
  return false;
}

// ─── HTML escaping (we render the user message inside an email body) ────────
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ─── Handler ────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalidPayload" }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "invalidPayload" }, { status: 400 });
  }
  const data = body as Record<string, unknown>;

  // Honeypot: a hidden field bots fill in but humans don't. Pretend success.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const subject = typeof data.subject === "string" ? data.subject.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (!name) {
    return NextResponse.json({ ok: false, error: "nameRequired" }, { status: 400 });
  }
  if (name.length > MAX_NAME_LEN) {
    return NextResponse.json({ ok: false, error: "nameTooLong" }, { status: 400 });
  }
  if (!email) {
    return NextResponse.json({ ok: false, error: "emailRequired" }, { status: 400 });
  }
  if (email.length > MAX_EMAIL_LEN || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "emailInvalid" }, { status: 400 });
  }
  if (phone.length > MAX_PHONE_LEN) {
    return NextResponse.json({ ok: false, error: "phoneTooLong" }, { status: 400 });
  }
  if (!subject || subject.length > MAX_SUBJECT_LEN || !ALLOWED_SUBJECTS.has(subject)) {
    return NextResponse.json({ ok: false, error: "subjectInvalid" }, { status: 400 });
  }
  if (message.length < MIN_MESSAGE_LEN) {
    return NextResponse.json({ ok: false, error: "messageTooShort" }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LEN) {
    return NextResponse.json({ ok: false, error: "messageTooLong" }, { status: 400 });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rateLimited" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  // Resend's free tier requires the sender to be either a verified domain or
  // their shared sandbox `onboarding@resend.dev` (only delivers to the
  // account-owner's email). For thesis demo, the sandbox is fine.
  const fromAddr = process.env.CONTACT_FROM_EMAIL || "Wanderlust <onboarding@resend.dev>";
  const toAddr = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toAddr) {
    console.warn(
      "[contact] Resend not configured (set RESEND_API_KEY + CONTACT_TO_EMAIL); accepting submission without sending"
    );
    console.log(
      `[contact] dev-mode submission name=${name.length}ch email=${email} subject=${subject} message=${message.length}ch ip=${ip}`
    );
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

  const html = `
    <div style="font-family:-apple-system,system-ui,sans-serif;max-width:560px;margin:0 auto;color:#1c1917;">
      <h2 style="color:#047857;margin:0 0 16px;">New contact form submission</h2>
      <p style="margin:4px 0;"><strong>Name:</strong> ${safeName}</p>
      <p style="margin:4px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color:#047857;">${safeEmail}</a></p>
      ${safePhone ? `<p style="margin:4px 0;"><strong>Phone:</strong> ${safePhone}</p>` : ""}
      <p style="margin:4px 0;"><strong>Subject:</strong> ${safeSubject}</p>
      <hr style="border:none;border-top:1px solid #e7e5e4;margin:16px 0;"/>
      <p style="margin:0;line-height:1.6;">${safeMessage}</p>
      <hr style="border:none;border-top:1px solid #e7e5e4;margin:16px 0;"/>
      <p style="color:#78716c;font-size:12px;margin:0;">Submitted via /contact · IP ${escapeHtml(ip)}</p>
    </div>
  `;

  const text =
    `New contact form submission\n\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    (phone ? `Phone: ${phone}\n` : "") +
    `Subject: ${subject}\n\n` +
    `${message}\n`;

  try {
    const result = await resend.emails.send({
      from: fromAddr,
      to: [toAddr],
      replyTo: email,
      subject: `[Wanderlust] ${subject} — ${name}`,
      html,
      text,
    });

    if (result.error) {
      console.error("[contact] Resend send error", result.error);
      return NextResponse.json({ ok: false, error: "sendFailed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send exception", err);
    return NextResponse.json({ ok: false, error: "sendFailed" }, { status: 502 });
  }
}
