import type { FAQItem } from "@/data/faqData";
import madricLogo from "@/assets/realtors/madric-real-estate.webp.asset.json";
import realogicsLogo from "@/assets/realtors/realogics-sothebys.webp.asset.json";

export const accreditedRealtors = [
  { name: "MADRIC Real Estate", website: "https://www.madricre.com/", logo: new URL(madricLogo.url, "https://arclightpainting.lovable.app").href },
  { name: "Realogics Sotheby's Int'l Rlty", website: "https://www.rsir.com/", logo: new URL(realogicsLogo.url, "https://arclightpainting.lovable.app").href },
];

export const realtorReferralSeo = {
  title: "Realtor Referral Program | Arclight Painting",
  description: "Real estate agents: refer your buyers, sellers and landlords to Arclight Painting and give them a FREE Painter-For-A-Day. Submit a referral in under 2 minutes.",
  canonical: "/realtor-referral",
};

export const realtorReferralHero = {
  eyebrow: "Realtor Referral Program",
  heading: "Partner With Arclight Painting",
  sub: "You deliver above-and-beyond service to your clients. So do we. Refer a client below and we'll take great care of them — and make you look good doing it.",
};

export const supportCards = [
  { title: "Helping You With Buyers", text: "Help clients see the potential in a home that doesn't feel \"perfect\" yet, and leave them with a gift they'll remember. We provide complimentary FREE Painter-For-A-Day vouchers you can present to your clients after closing — a full day of professional painting, no strings attached. We handle the printing and details." },
  { title: "Helping You With Sellers", text: "A great home in a desirable neighborhood can sit on the market because of dated or unappealing colors. Our program helps your sellers take the first step toward a market-ready property — exterior touch-ups, interior refreshes, pressure washing and more." },
  { title: "Your Own Home or Office", text: "Have a project of your own? The FREE Painter-For-A-Day program is available to you too, so you can experience our service firsthand before you refer." },
];

export const highlightBand = {
  heading: "FREE Painter-For-A-Day",
  value: "$698 worth of painting service.",
  text: "No strings attached. No minimums. No catch. We provide the labor; the client provides the paint.",
};

export const referralSteps = [
  "Submit the referral form below with your details and your client's project.",
  "We reach out to your client promptly, mention you by name, and schedule a visit.",
  "We keep you posted on progress, so your client's experience reflects well on you.",
];

export const clientTypes = ["Buyer", "Seller", "Landlord / Commercial Lease", "My own home or office"] as const;
export const projectTypes = ["Interior Painting", "Exterior Painting", "Cabinet Refinishing", "Deck / Fence Staining", "Pressure Washing", "Drywall Repair", "Commercial", "Other"] as const;
export const timelines = ["ASAP", "Within 2 weeks", "Within 1 month", "1–3 months", "Flexible / Not sure"] as const;

export const REFERRAL_SOURCE_TAG = "Realtor Referral";
export const referralThankYou = "Thank you! We've received your referral and will reach out to your client shortly. We'll keep you updated.";

export const realtorReferralFAQ: FAQItem[] = [
  { question: "What does a Painter-For-A-Day include?", answer: "Eight hours of professional service on projects of the client's choice: touch-ups, painting an office or bedroom, accent walls, entry doors, faded exterior trim touch-ups, pressure washing, and more — just ask." },
  { question: "What if the project needs more than a day?", answer: "We credit the 8 hours of labor value toward the cost of the larger project, giving your client a head start." },
  { question: "What about the paint?", answer: "Paint isn't included. Most homeowners have enough on hand for small projects; if not, we can provide it for an additional cost." },
  { question: "What's in it for Arclight?", answer: "We want a lasting relationship with you, and the chance to earn your clients' trust and future business through our craftsmanship." },
  { question: "Is scheduling guaranteed?", answer: "Work must be scheduled in advance and is subject to availability." },
];
