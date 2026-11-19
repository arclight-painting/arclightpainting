import { z } from "zod";
import { clientTypes, projectTypes, timelines, REFERRAL_SOURCE_TAG } from "@/data/realtorReferral";

const phone = z.string().trim().min(1, "Phone is required").refine(v => v.replace(/\D/g, "").length >= 10 && v.replace(/\D/g, "").length <= 15 && /^[\d\s()+.-]+$/.test(v), "Enter a valid phone number");
const req = (label: string, max = 100) => z.string().trim().min(1, `${label} is required`).max(max, `${label} is too long`);
const opt = (max = 100) => z.string().trim().max(max, "Too long").optional().or(z.literal(""));

export const referralSchema = z.object({
  realtorFirstName: req("First name"),
  realtorLastName: req("Last name"),
  brokerage: req("Brokerage / Company", 150),
  realtorPhone: phone,
  realtorEmail: z.string().trim().min(1, "Email is required").email("Enter a valid email").max(255),
  licenseNumber: opt(50),
  clientName: req("Client full name", 150),
  clientPhone: phone,
  clientEmail: z.string().trim().email("Enter a valid email").max(255).optional().or(z.literal("")),
  propertyAddress: req("Property address", 200),
  city: req("City"),
  zip: z.string().trim().regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP").optional().or(z.literal("")),
  clientType: z.enum(clientTypes, { errorMap: () => ({ message: "Select a client type" }) }),
  projectTypes: z.array(z.enum(projectTypes)).min(1, "Select at least one project type"),
  timeline: z.enum(timelines).optional().or(z.literal("")),
  keyDate: opt(20),
  notes: opt(2000),
  clientConsent: z.literal(true, { errorMap: () => ({ message: "Please confirm your client agreed to be contacted" }) }),
  includeVoucher: z.boolean(),
  website: z.string().max(0).optional(), // honeypot
});

export type ReferralValues = z.infer<typeof referralSchema>;

/**
 * Delivery endpoint for referrals. The site's other forms are GoHighLevel embeds with
 * no custom submission backend, so this stays empty until an inbound webhook URL is supplied.
 */
export const REALTOR_REFERRAL_WEBHOOK_URL = "";

export const buildReferralPayload = (values: ReferralValues) => {
  const { website: _honeypot, ...fields } = values;
  return { ...fields, projectTypes: fields.projectTypes.join(", "), source: REFERRAL_SOURCE_TAG, tags: [REFERRAL_SOURCE_TAG] };
};

export type SubmitResult = { ok: true } | { ok: false; reason: "not-configured" | "failed" };

export async function submitReferral(values: ReferralValues, url = REALTOR_REFERRAL_WEBHOOK_URL): Promise<SubmitResult> {
  if (values.website) return { ok: true }; // silently drop bots
  if (!url) return { ok: false, reason: "not-configured" };
  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(buildReferralPayload(values)) });
    return res.ok ? { ok: true } : { ok: false, reason: "failed" };
  } catch {
    return { ok: false, reason: "failed" };
  }
}
