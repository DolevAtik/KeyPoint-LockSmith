/* =============================================================================
 *  LEAD FORM — BACKEND INTEGRATION POINT
 * =============================================================================
 *
 *  This is the ONLY file you need to touch to connect the contact form to a
 *  real inbox. Everything else about the form (markup, validation, success and
 *  error states) already works.
 *
 *  ── Right now ──────────────────────────────────────────────────────────────
 *  `LEAD_ENDPOINT` is empty, so the form runs in WhatsApp hand-off mode: it
 *  validates the input, builds a tidy summary and opens WhatsApp with the
 *  message pre-filled, ready to send. Nothing is silently dropped, and no
 *  server is required — which is why the site can ship today.
 *
 *  ── To deliver leads by email instead ──────────────────────────────────────
 *  Pick any form-to-email service that accepts a plain JSON POST, then set
 *  LEAD_ENDPOINT to the URL it gives you. Two that need no server of your own:
 *
 *    Web3Forms  https://web3forms.com   -> https://api.web3forms.com/submit
 *                                          (also set WEB3FORMS_ACCESS_KEY below)
 *    Formspree  https://formspree.io    -> https://formspree.io/f/<your-id>
 *
 *  Or point it at your own endpoint / serverless function. It receives:
 *
 *    { name, phone, service, message, source, submittedAt }
 *
 *  Both modes are already wired up — setting the URL is the whole change.
 * ===========================================================================*/

import { site } from '../data/site';

/** Leave empty to keep the WhatsApp hand-off. */
export const LEAD_ENDPOINT = '';

/** Only needed when LEAD_ENDPOINT points at Web3Forms. */
export const WEB3FORMS_ACCESS_KEY = '';

export interface Lead {
  name: string;
  phone: string;
  service: string;
  message: string;
}

export const hasBackend = (): boolean => LEAD_ENDPOINT.trim().length > 0;

/** Human-readable summary reused by the WhatsApp and email fallbacks. */
export function formatLead(lead: Lead): string {
  const lines = [
    `Hi ${site.name}, I'd like to request locksmith service.`,
    '',
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Service needed: ${lead.service}`,
  ];
  if (lead.message.trim()) {
    lines.push(`Details: ${lead.message.trim()}`);
  }
  return lines.join('\n');
}

/**
 * Posts the lead to LEAD_ENDPOINT. Throws when the endpoint rejects it, so the
 * form can surface a real error instead of a false success.
 */
export async function postLead(lead: Lead): Promise<void> {
  const payload: Record<string, unknown> = {
    ...lead,
    source: 'keypointlocksmith.com contact form',
    submittedAt: new Date().toISOString(),
    subject: `New locksmith request — ${lead.name}`,
  };

  if (WEB3FORMS_ACCESS_KEY) {
    payload.access_key = WEB3FORMS_ACCESS_KEY;
  }

  const response = await fetch(LEAD_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Lead endpoint responded ${response.status}`);
  }
}
