import { describe, it, expect } from "vitest";
import { buildReferralPayload, referralSchema, submitReferral } from "./realtorReferralForm";

const valid = { realtorFirstName: "Ann", realtorLastName: "Lee", brokerage: "Acme Realty", realtorPhone: "425-555-0100", realtorEmail: "ann@example.com", licenseNumber: "", clientName: "Bo Kim", clientPhone: "(206) 555-0199", clientEmail: "", propertyAddress: "1 Main St", city: "Bothell", zip: "", clientType: "Buyer", projectTypes: ["Interior Painting"], timeline: "", keyDate: "", notes: "", clientConsent: true, includeVoucher: false, website: "" };

describe("realtor referral form", () => {
  it("accepts a complete referral", () => expect(referralSchema.safeParse(valid).success).toBe(true));
  it("requires client consent", () => expect(referralSchema.safeParse({ ...valid, clientConsent: false }).success).toBe(false));
  it("requires at least one project type", () => expect(referralSchema.safeParse({ ...valid, projectTypes: [] }).success).toBe(false));
  it("rejects a bad phone", () => expect(referralSchema.safeParse({ ...valid, realtorPhone: "12345" }).success).toBe(false));
  it("tags the payload as Realtor Referral", () => expect(buildReferralPayload(valid as never).source).toBe("Realtor Referral"));
  it("does not claim success when no delivery endpoint is configured", async () => expect(await submitReferral(valid as never, "")).toEqual({ ok: false, reason: "not-configured" }));
});
