import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Building2, CheckCircle2, Gift, Home, KeyRound, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead, { faqPageSchema } from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import heroPhoto from "@/assets/interior-painting-entryway-staircase-bothell.webp";
import { clientTypes, highlightBand, projectTypes, realtorReferralFAQ, realtorReferralHero, realtorReferralSeo, referralSteps, referralThankYou, supportCards, timelines } from "@/data/realtorReferral";
import { referralSchema, submitReferral, type ReferralValues } from "@/lib/realtorReferralForm";

const cardIcons = [KeyRound, Building2, Home];
const scrollToForm = () => document.getElementById("refer")?.scrollIntoView({ behavior: "smooth", block: "start" });

const defaults: Partial<ReferralValues> = { realtorFirstName: "", realtorLastName: "", brokerage: "", realtorPhone: "", realtorEmail: "", licenseNumber: "", clientName: "", clientPhone: "", clientEmail: "", propertyAddress: "", city: "", zip: "", projectTypes: [], timeline: "", keyDate: "", notes: "", includeVoucher: false, website: "" };

function ReferralForm() {
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<ReferralValues>({ resolver: zodResolver(referralSchema), defaultValues: defaults as ReferralValues, shouldFocusError: true });
  const [status, setStatus] = useState<"idle" | "done" | "not-configured" | "failed">("idle");
  const onSubmit = async (values: ReferralValues) => {
    const result = await submitReferral(values);
    setStatus("reason" in result ? result.reason : "done");
  };

  if (status === "done") return <div role="status" className="py-8 text-center"><CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-accent" /><p className="text-xl font-semibold">{referralThankYou}</p></div>;

  const err = (name: keyof ReferralValues) => errors[name]?.message ? <p id={`rr-${name}-error`} role="alert" className="mt-1 text-sm text-destructive">{String(errors[name]?.message)}</p> : null;
  const aria = (name: keyof ReferralValues) => ({ "aria-invalid": !!errors[name], "aria-describedby": errors[name] ? `rr-${name}-error` : undefined });
  const text = (name: keyof ReferralValues, label: string, opts: { required?: boolean; type?: string; autoComplete?: string; wide?: boolean } = {}) => <div className={opts.wide ? "sm:col-span-2" : undefined}>
    <Label htmlFor={`rr-${name}`}>{label} {opts.required ? <span className="text-accent">*</span> : <span className="font-normal text-muted-foreground">(optional)</span>}</Label>
    <Input id={`rr-${name}`} type={opts.type ?? "text"} autoComplete={opts.autoComplete} className="mt-2" {...aria(name)} {...register(name)} />
    {err(name)}
  </div>;

  return <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-10">
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label htmlFor="rr-website">Website</label><input id="rr-website" tabIndex={-1} autoComplete="off" {...register("website")} /></div>

    <fieldset>
      <legend className="mb-5 text-2xl font-bold">Your Details <span className="text-accent">(Realtor)</span></legend>
      <div className="grid gap-5 sm:grid-cols-2">
        {text("realtorFirstName", "First name", { required: true, autoComplete: "given-name" })}
        {text("realtorLastName", "Last name", { required: true, autoComplete: "family-name" })}
        {text("brokerage", "Brokerage / Company", { required: true, autoComplete: "organization", wide: true })}
        {text("realtorPhone", "Phone", { required: true, type: "tel", autoComplete: "tel" })}
        {text("realtorEmail", "Email", { required: true, type: "email", autoComplete: "email" })}
        {text("licenseNumber", "License #")}
      </div>
    </fieldset>

    <fieldset>
      <legend className="mb-5 text-2xl font-bold">Client &amp; <span className="text-accent">Project Details</span></legend>
      <div className="grid gap-5 sm:grid-cols-2">
        {text("clientName", "Client full name", { required: true, wide: true })}
        {text("clientPhone", "Client phone", { required: true, type: "tel" })}
        {text("clientEmail", "Client email", { type: "email" })}
        {text("propertyAddress", "Property address", { required: true, wide: true })}
        {text("city", "City", { required: true })}
        {text("zip", "ZIP", { type: "text" })}
        <div className="sm:col-span-2">
          <Label htmlFor="rr-clientType">Client type <span className="text-accent">*</span></Label>
          <Controller control={control} name="clientType" render={({ field }) => <Select value={field.value ?? ""} onValueChange={field.onChange}><SelectTrigger id="rr-clientType" className="mt-2" {...aria("clientType")}><SelectValue placeholder="Select client type" /></SelectTrigger><SelectContent>{clientTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select>} />
          {err("clientType")}
        </div>
        <fieldset className="sm:col-span-2" {...aria("projectTypes")}>
          <legend className="text-sm font-medium">Project type <span className="text-accent">*</span></legend>
          <Controller control={control} name="projectTypes" render={({ field }) => <div className="mt-3 grid gap-3 sm:grid-cols-2">{projectTypes.map(t => {
            const checked = field.value?.includes(t) ?? false;
            return <div key={t} className="flex items-center gap-3"><Checkbox id={`rr-pt-${t}`} checked={checked} onCheckedChange={v => field.onChange(v === true ? [...(field.value ?? []), t] : (field.value ?? []).filter(x => x !== t))} /><Label htmlFor={`rr-pt-${t}`} className="font-normal">{t}</Label></div>;
          })}</div>} />
          {err("projectTypes")}
        </fieldset>
        <div>
          <Label htmlFor="rr-timeline">Desired timeline <span className="font-normal text-muted-foreground">(optional)</span></Label>
          <Controller control={control} name="timeline" render={({ field }) => <Select value={field.value || ""} onValueChange={field.onChange}><SelectTrigger id="rr-timeline" className="mt-2"><SelectValue placeholder="Select a timeline" /></SelectTrigger><SelectContent>{timelines.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select>} />
        </div>
        {text("keyDate", "Closing or listing date", { type: "date" })}
        <div className="sm:col-span-2">
          <Label htmlFor="rr-notes">Project notes <span className="font-normal text-muted-foreground">(optional)</span></Label>
          <Textarea id="rr-notes" rows={4} maxLength={2000} className="mt-2" {...register("notes")} />
        </div>
      </div>
    </fieldset>

    <div className="space-y-4">
      <Controller control={control} name="clientConsent" render={({ field }) => <div className="flex items-start gap-3"><Checkbox id="rr-clientConsent" checked={field.value === true} onCheckedChange={v => field.onChange(v === true)} {...aria("clientConsent")} /><Label htmlFor="rr-clientConsent" className="-mt-0.5 leading-relaxed">My client has agreed to be contacted by Arclight Painting about this project. <span className="text-accent">*</span></Label></div>} />
      {err("clientConsent")}
      <Controller control={control} name="includeVoucher" render={({ field }) => <div className="flex items-start gap-3"><Checkbox id="rr-includeVoucher" checked={field.value} onCheckedChange={v => field.onChange(v === true)} /><Label htmlFor="rr-includeVoucher" className="-mt-0.5 font-normal leading-relaxed">Include a FREE Painter-For-A-Day voucher for this client.</Label></div>} />
    </div>

    {status === "not-configured" && <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm">Online referrals aren't connected yet, so this referral was not sent. Please call us at <a href="tel:14257571199" className="font-semibold text-accent underline">425-757-1199</a>.</p>}
    {status === "failed" && <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm">Something went wrong sending your referral. Please try again or call <a href="tel:14257571199" className="font-semibold text-accent underline">425-757-1199</a>.</p>}

    <Button type="submit" size="lg" disabled={isSubmitting} className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90">{isSubmitting ? "Submitting…" : "Submit Referral"} <ArrowRight className="h-4 w-4" /></Button>
  </form>;
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
          <div className="relative rounded-lg border border-border bg-card p-6 md:p-10"><ReferralForm /></div>
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
