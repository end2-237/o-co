"use client";

import { useActionState } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/actions";
import { IconArrowRight } from "@/components/ui/icons";
import type { Dictionary } from "@/i18n/dictionaries/en";

const initial: EnquiryState = { status: "idle" };

const fieldClass =
  "w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-ink/40";
const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-ink/60";

export function ContactForm({ t }: { t: Dictionary["form"] }) {
  const [state, action, pending] = useActionState(submitEnquiry, initial);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex min-h-[20rem] flex-col items-start justify-center rounded-2xl bg-cream p-8 text-ink sm:p-10"
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-xl text-cream">
          ✓
        </span>
        <p className="mt-5 text-balance font-display text-2xl font-light leading-snug">
          {t.success}
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="rounded-2xl bg-cream p-6 text-ink sm:p-8">
      <h3 className="font-display text-xl font-medium">{t.title}</h3>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            {t.name} *
          </label>
          <input id="cf-name" name="name" required className={fieldClass} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>
            {t.email} *
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            className={fieldClass}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelClass}>
            {t.phone}
          </label>
          <input id="cf-phone" name="phone" type="tel" className={fieldClass} autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="cf-area" className={labelClass}>
            {t.area}
          </label>
          <input
            id="cf-area"
            name="area"
            className={fieldClass}
            placeholder={t.areaPlaceholder}
          />
        </div>
        <div>
          <label htmlFor="cf-type" className={labelClass}>
            {t.type}
          </label>
          <select id="cf-type" name="type" className={fieldClass} defaultValue="">
            <option value="" disabled>
              —
            </option>
            {t.typeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-budget" className={labelClass}>
            {t.budget}
          </label>
          <select id="cf-budget" name="budget" className={fieldClass} defaultValue="">
            <option value="" disabled>
              —
            </option>
            {t.budgetOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className={labelClass}>
            {t.message}
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={3}
            className={fieldClass}
            placeholder={t.messagePlaceholder}
          />
        </div>
      </div>

      {state.status === "error" && (
        <p role="alert" className="mt-4 text-sm text-clay">
          {t.required}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group mt-6 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-ink-soft disabled:opacity-60"
      >
        {pending ? t.sending : t.submit}
        <IconArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      <p className="mt-4 text-xs leading-relaxed text-ink/50">{t.consent}</p>
    </form>
  );
}
