import { useEffect } from "react";
import { ArrowRight, Building2, Gift, Home, KeyRound, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead, { faqPageSchema } from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import heroPhoto from "@/assets/interior-painting-entryway-staircase-bothell.webp";
import { accreditedRealtors, highlightBand, realtorReferralFAQ, realtorReferralHero, realtorReferralSeo, referralSteps, supportCards } from "@/data/realtorReferral";

const cardIcons = [KeyRound, Building2, Home];
const scrollToForm = () => document.getElementById("refer")?.scrollIntoView({ behavior: "smooth", block: "start" });

function ReferralForm() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.arclightpainting.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { script.remove(); };
  }, []);

  return <iframe
    src="https://link.arclightpainting.com/widget/form/eRHYAtaJQDaKnqWtz9qB"
    className="block h-[2041px] w-full rounded-lg border-0"
    id="inline-eRHYAtaJQDaKnqWtz9qB"
    data-layout="{'id':'INLINE'}"
    data-trigger-type="alwaysShow"
    data-trigger-value=""
    data-activation-type="alwaysActivated"
    data-activation-value=""
    data-deactivation-type="neverDeactivate"
    data-deactivation-value=""
    data-form-name="Realtor Referral"
    data-height="2041"
    data-layout-iframe-id="inline-eRHYAtaJQDaKnqWtz9qB"
    data-form-id="eRHYAtaJQDaKnqWtz9qB"
    data-cookie-consent="true"
    data-cookie-consent-provider="auto"
    title="Realtor Referral"
  />;
}

export default function RealtorReferral() {
  return <div className="min-h-screen bg-background text-foreground">
    <SEOHead title={realtorReferralSeo.title} description={realtorReferralSeo.description} canonical={realtorReferralSeo.canonical} jsonLd={faqPageSchema(realtorReferralFAQ)} />
    <Header />
    <main>
      <section className="relative isolate overflow-hidden">
        <img src={heroPhoto} alt="A freshly painted entryway and staircase in a Bothell-area home" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/95 to-secondary/20" />
        <div className="container relative mx-auto px-4 py-14 md:py-20">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase text-accent">{realtorReferralHero.eyebrow}</p>
            <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[1.08]">Partner With <span className="text-accent">Arclight Painting</span></h1>
            <p className="max-w-2xl text-lg md:text-xl leading-relaxed">{realtorReferralHero.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90" onClick={scrollToForm}>Refer a Client <ArrowRight className="h-4 w-4" /></Button>
              <Button size="lg" variant="outline" className="gap-2 bg-background/90" asChild><a href="tel:14257571199"><Phone className="h-4 w-4" /> Call 425-757-1199</a></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-3xl md:text-4xl font-bold">How We Support <span className="text-accent">Your Success</span></h2>
          <div className="grid gap-5 md:grid-cols-3">
            {supportCards.map(({ title, text }, i) => { const Icon = cardIcons[i]; return <article key={title} className="rounded-lg border border-border bg-card p-6"><Icon className="mb-5 h-9 w-9 text-accent" /><h3 className="mb-3 text-xl font-bold">{title}</h3><p className="text-sm leading-relaxed text-muted-foreground">{text}</p></article>; })}
          </div>
        </div>
      </section>

      <section className="border-y border-accent/25 bg-accent/5 py-8">
        <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 text-center md:flex-row md:text-left">
          <Gift className="h-10 w-10 shrink-0 text-accent" />
          <p className="text-lg md:text-xl"><span className="font-bold text-accent">{highlightBand.heading}</span> — <span className="font-bold">{highlightBand.value}</span> {highlightBand.text}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="mb-12 text-center text-3xl md:text-4xl font-bold">How It <span className="text-accent">Works</span></h2>
          <ol className="grid gap-10 md:grid-cols-3">
            {referralSteps.map((step, i) => <li key={step} className="text-center"><div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-xl font-bold text-accent-foreground">{i + 1}</div><p className="leading-relaxed text-muted-foreground">{step}</p></li>)}
          </ol>
        </div>
      </section>

      <section id="refer" className="scroll-mt-32 bg-secondary py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center text-3xl md:text-4xl font-bold">Refer a <span className="text-accent">Client</span></h2>
          <ReferralForm />
        </div>
      </section>

      <section aria-labelledby="accredited-realtors-heading" className="py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 id="accredited-realtors-heading" className="mb-12 text-center text-3xl md:text-4xl font-bold">Accredited <span className="text-accent">Realtors</span></h2>
          <div className="grid gap-10 sm:grid-cols-2">
            {accreditedRealtors.map(realtor => <article key={realtor.website} className="min-w-0 text-center">
              <div className="mb-6 flex h-40 items-center justify-center">
                <img src={realtor.logo} alt={`${realtor.name} logo`} loading="lazy" className="max-h-full w-auto max-w-full object-contain" />
              </div>
              <a href={realtor.website} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{realtor.name}<span className="sr-only"> (opens in a new tab)</span></a>
            </article>)}
          </div>
        </div>
      </section>

      <FAQSection faqs={realtorReferralFAQ} heading="Realtor Referral Program FAQ" />

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-6 text-2xl md:text-3xl font-bold">Questions about the program? Call us at <a href="tel:14257571199" className="text-accent hover:underline">425-757-1199</a></p>
          <Button size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90" onClick={scrollToForm}>Refer a Client <ArrowRight className="h-4 w-4" /></Button>
        </div>
      </section>
    </main>
    <Footer />
  </div>;
}
