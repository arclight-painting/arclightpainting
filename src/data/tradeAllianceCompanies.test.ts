import { describe, expect, it } from "vitest";
import { allianceCompanies, companyLinkLabel, directoryLetters, firstCompanyForLetter, hasCompleteCompanyData, visibleAllianceCompanies } from "./tradeAllianceCompanies";

describe("Trade Alliance directory", () => {
  it("loads each existing logo from the published asset host rather than the Cloudflare page origin", () => {
    const logos = allianceCompanies.filter(company => company.logo);
    expect(logos).toHaveLength(15);
    for (const company of logos) {
      const url = new URL(company.logo ?? "");
      expect(url.origin).toBe("https://arclightpainting.lovable.app");
      expect(url.pathname.startsWith("/__l5e/assets-v1/")).toBe(true);
    }
  });
  it("lists 16 current companies", () => {
    expect(allianceCompanies).toHaveLength(16);
  });
  it.each(["riverside-roofing", "ak-electric"])("excludes former partner %s", id => {
    expect(allianceCompanies.some(company => company.id === id)).toBe(false);
  });
  it.each(["mi-painting", "fridenmaker-painting", "amsberrys-painting", "legacy-painting", "queen-anne-painting"])("removes painting partner %s", id => {
    expect(allianceCompanies.some(company => company.id === id)).toBe(false);
  });
  it("keeps the drywall partner despite painting in its company name", () => {
    expect(visibleAllianceCompanies.find(company => company.id === "pnw-drywall")?.trade).toBe("Drywall");
  });
  it("keeps Sound Gutters & Roofing Co as one roofing and gutters partner", () => {
    expect(allianceCompanies.filter(company => company.id === "sound-gutters")).toHaveLength(1);
    expect(allianceCompanies.find(company => company.id === "sound-gutters")?.trade).toBe("Roofing & Gutters");
  });
  it("sorts companies alphabetically", () => {
    expect(allianceCompanies.map(company => company.name)).toEqual(["Asbestos Removal of Puget Sound", "Benjamins Drywall Inc", "Do It Right Roofing", "HB Power Electric", "Hello Electric", "Hero Plumbing LLC", "Perdue Builders", "PNW Drywall Finishing & Painting", "Rock Roofing", "Sound Gutters & Roofing Co", "Squatch Roofing", "Studebaker Installs LLC", "Three Tree Roofing", "Uisce Plumbing", "West Coast Wallcovering", "Zee Construction"]);
  });
  it("provides all 26 letters and selects the first matching company", () => {
    expect(directoryLetters.join("")).toBe("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    expect(firstCompanyForLetter("P")?.name).toBe("Perdue Builders");
    expect(firstCompanyForLetter("S")?.name).toBe("Sound Gutters & Roofing Co");
    expect(firstCompanyForLetter("A")?.name).toBe("Asbestos Removal of Puget Sound");
    expect(firstCompanyForLetter("B")?.name).toBe("Benjamins Drywall Inc");
    expect(firstCompanyForLetter("C")).toBeUndefined();
  });
  it.each(["logo", "description"] as const)("hides a company with missing or blank %s", field => {
    const complete = { id: "example", name: "Example", trade: "Roofing", logo: "/logo.png", description: "Roofing services", website: "https://example.com/" };
    expect(hasCompleteCompanyData(complete)).toBe(true);
    expect(hasCompleteCompanyData({ ...complete, [field]: undefined })).toBe(false);
    expect(hasCompleteCompanyData({ ...complete, [field]: "  " })).toBe(false);
  });
  it("shows a company with logo and description but no website", () => {
    expect(hasCompleteCompanyData({ id: "x", name: "X", trade: "Plumbing", logo: "/l.svg", description: "Plumbing", website: "" })).toBe(true);
    expect(visibleAllianceCompanies.find(company => company.id === "hero-plumbing")?.website).toBe("");
  });
  it("includes Uisce Plumbing with its official website and logo", () => {
    const company = visibleAllianceCompanies.find(company => company.id === "uisce-plumbing");
    expect(company?.name).toBe("Uisce Plumbing");
    expect(company?.trade).toBe("Plumbing");
    expect(company?.website).toBe("https://www.uisceplumbing.com/");
    expect(company?.logo).toContain("/uisce-plumbing.jpg");
    expect(company?.description).toContain("water heater and faucet replacements");
  });
  it("shows all 16 companies", () => {
    expect(visibleAllianceCompanies).toHaveLength(16);
    expect(allianceCompanies.filter(company => !hasCompleteCompanyData(company))).toEqual([]);
  });
});

describe("companyLinkLabel", () => {
  it("labels social profiles by domain and keeps the default otherwise", () => {
    expect(companyLinkLabel("https://www.instagram.com/hbpowerelectric/")).toBe("Visit on Instagram");
    expect(companyLinkLabel("https://www.facebook.com/interiorconstruction99/")).toBe("Visit on Facebook");
    expect(companyLinkLabel("http://www.mandipaintingwa.com/")).toBe("Visit official website");
  });
  it("shows Studebaker Installs LLC without a logo, linking to its L&I license", () => {
    const c = visibleAllianceCompanies.find(company => company.id === "studebaker-installs");
    expect(c?.logo).toBeUndefined();
    expect(c?.website).toBe("https://secure.lni.wa.gov/verify/Detail.aspx?LIC=STUDEIL746KA");
    expect(companyLinkLabel(c?.website ?? "")).toBe("View L&I license");
  });
});
