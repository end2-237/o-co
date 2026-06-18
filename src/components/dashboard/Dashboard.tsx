"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import {
  IconArrowRight,
  IconBuilding,
  IconGrid,
  IconImageStack,
  IconInbox,
  IconPlay,
  IconSliders,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";

export type DashProperty = {
  slug: string;
  name: string;
  location: string;
  type: string;
  status: string;
  beds: number;
  baths: number;
  surface: string;
  cover: string;
  images: number;
};
export type DashMedia = { src: string; name: string; kind: "image" | "video" };
export type DashSite = {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  tiktok: string;
};

type View = "overview" | "properties" | "media" | "leads" | "settings";

const COPY = {
  fr: {
    console: "Console", overview: "Vue d'ensemble", properties: "Biens", media: "Médias",
    leads: "Demandes", settings: "Réglages", viewSite: "Voir le site",
    preview: "Aperçu — démo, les modifications ne sont pas enregistrées.",
    newProperty: "Nouveau bien", search: "Rechercher…",
    kpiProps: "Biens actifs", kpiViews: "Vues (30 j)", kpiLeads: "Demandes (30 j)", kpiRating: "Note clients",
    activity: "Activité (6 mois)", recent: "Dernières demandes",
    name: "Nom", location: "Localisation", type: "Type", status: "Statut", rooms: "Détails", actions: "Actions",
    edit: "Voir", hide: "Masquer", show: "Afficher", forSale: "À vendre", forRent: "À louer", hidden: "Masqué",
    images: "photos", results: "biens", lead: "Client", contact: "Contact", budget: "Recherche", date: "Date",
    statusNew: "Nouveau", statusContacted: "Contacté", statusVisit: "Visite",
    agencyName: "Nom de l'agence", email: "Email", phone: "Téléphone", save: "Enregistrer",
    all: "Tous", mediaCount: "éléments", image: "Image", video: "Vidéo",
  },
  en: {
    console: "Console", overview: "Overview", properties: "Properties", media: "Media",
    leads: "Leads", settings: "Settings", viewSite: "View site",
    preview: "Preview — demo, changes are not saved.",
    newProperty: "New property", search: "Search…",
    kpiProps: "Active listings", kpiViews: "Views (30d)", kpiLeads: "Leads (30d)", kpiRating: "Client rating",
    activity: "Activity (6 months)", recent: "Recent leads",
    name: "Name", location: "Location", type: "Type", status: "Status", rooms: "Details", actions: "Actions",
    edit: "View", hide: "Hide", show: "Show", forSale: "For sale", forRent: "For rent", hidden: "Hidden",
    images: "photos", results: "properties", lead: "Client", contact: "Contact", budget: "Looking for", date: "Date",
    statusNew: "New", statusContacted: "Contacted", statusVisit: "Viewing",
    agencyName: "Agency name", email: "Email", phone: "Phone", save: "Save",
    all: "All", mediaCount: "items", image: "Image", video: "Video",
  },
} as const;

const BARS = [42, 58, 50, 72, 64, 88];
const LEADS = [
  { name: "Awa Njoya", email: "awa.n@email.cm", intent: "Achat · Bonapriso", date: "12 juin", status: "new" },
  { name: "Jean-Paul Mbella", email: "jp.mbella@email.cm", intent: "Villa · Bastos", date: "11 juin", status: "visit" },
  { name: "Sandrine Kana", email: "s.kana@email.cm", intent: "Location · Akwa", date: "9 juin", status: "contacted" },
  { name: "Olivier Tchakounté", email: "olivier.t@email.cm", intent: "Bord de mer · Kribi", date: "7 juin", status: "contacted" },
  { name: "Fatou Diallo", email: "fatou.d@email.cm", intent: "Penthouse · Limbé", date: "4 juin", status: "new" },
];

export function Dashboard({
  locale,
  properties,
  media,
  site,
}: {
  locale: Locale;
  properties: DashProperty[];
  media: DashMedia[];
  site: DashSite;
}) {
  const t = COPY[locale];
  const [view, setView] = useState<View>("overview");
  const [query, setQuery] = useState("");
  const [hidden, setHidden] = useState<Record<string, boolean>>({});

  const nav: { id: View; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: t.overview, icon: <IconGrid /> },
    { id: "properties", label: t.properties, icon: <IconBuilding /> },
    { id: "media", label: t.media, icon: <IconImageStack /> },
    { id: "leads", label: t.leads, icon: <IconInbox /> },
    { id: "settings", label: t.settings, icon: <IconSliders /> },
  ];

  const filtered = useMemo(
    () =>
      properties.filter((p) =>
        `${p.name} ${p.location} ${p.type}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [properties, query],
  );

  const statusPill = (status: string) => (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em]",
        status === "rent" ? "bg-clay/15 text-clay" : "bg-ink/10 text-ink/70",
      )}
    >
      {status === "rent" ? t.forRent : t.forSale}
    </span>
  );

  const leadStatus = (s: string) =>
    s === "new" ? t.statusNew : s === "visit" ? t.statusVisit : t.statusContacted;

  return (
    <div className="flex min-h-svh flex-col bg-bone lg:flex-row">
      {/* Sidebar */}
      <aside className="flex shrink-0 flex-col border-b border-ink/10 bg-ink text-cream lg:h-svh lg:w-64 lg:border-b-0 lg:border-r lg:border-cream/10">
        <div className="flex items-center justify-between p-5 lg:block">
          <div className="flex items-baseline gap-2">
            <Logo className="text-2xl text-cream" />
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-cream/50">
              {t.console}
            </span>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:mt-2 lg:flex-1 lg:flex-col lg:overflow-visible lg:px-3">
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setView(item.id)}
              aria-current={view === item.id}
              className={cn(
                "inline-flex shrink-0 items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                view === item.id ? "bg-cream/10 text-cream" : "text-cream/60 hover:text-cream",
              )}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="hidden p-4 lg:block">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-sm text-cream/60 transition-colors hover:text-cream"
          >
            ← {t.viewSite}
          </Link>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1">
        <div className="flex items-center justify-between gap-4 border-b border-ink/10 px-6 py-5 sm:px-10">
          <h1 className="font-display text-3xl font-medium text-ink">{nav.find((n) => n.id === view)?.label}</h1>
          {view === "properties" && (
            <button className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-ink-soft">
              {t.newProperty}
              <IconArrowRight className="text-base" />
            </button>
          )}
        </div>

        <div className="px-6 py-8 sm:px-10">
          <p className="mb-8 inline-flex rounded-full bg-clay/10 px-4 py-1.5 text-xs font-medium text-clay">
            {t.preview}
          </p>

          {view === "overview" && (
            <div className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: t.kpiProps, value: String(properties.length) },
                  { label: t.kpiViews, value: "12,4k" },
                  { label: t.kpiLeads, value: String(LEADS.length) },
                  { label: t.kpiRating, value: "4,9★" },
                ].map((kpi) => (
                  <div key={kpi.label} className="rounded-2xl border border-ink/10 bg-cream p-6">
                    <p className="font-display text-4xl font-semibold text-ink">{kpi.value}</p>
                    <p className="mt-2 text-sm text-ink/55">{kpi.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
                <div className="rounded-2xl border border-ink/10 bg-cream p-6">
                  <h2 className="text-xs uppercase tracking-[0.2em] text-ink/45">{t.activity}</h2>
                  <div className="mt-8 flex h-44 items-end gap-3">
                    {BARS.map((h, i) => (
                      <div key={i} className="flex h-full flex-1 flex-col justify-end">
                        <div className="w-full rounded-t-md bg-ink/80" style={{ height: `${h}%` }} />
                        <span className="mt-2 text-center text-[0.65rem] text-ink/40">
                          {["J", "F", "M", "A", "M", "J"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-ink/10 bg-cream p-6">
                  <h2 className="text-xs uppercase tracking-[0.2em] text-ink/45">{t.recent}</h2>
                  <ul className="mt-5 divide-y divide-ink/10">
                    {LEADS.slice(0, 4).map((l) => (
                      <li key={l.email} className="flex items-center justify-between gap-3 py-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-ink">{l.name}</p>
                          <p className="truncate text-xs text-ink/50">{l.intent}</p>
                        </div>
                        <span className="shrink-0 text-xs text-ink/40">{l.date}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {view === "properties" && (
            <div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.search}
                className="mb-6 w-full max-w-sm rounded-lg border border-ink/15 bg-cream px-4 py-2.5 text-sm text-ink outline-none focus:border-ink/40"
              />
              <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-cream">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-ink/10 text-[0.7rem] uppercase tracking-[0.12em] text-ink/45">
                    <tr>
                      <th className="p-4 font-medium">{t.name}</th>
                      <th className="hidden p-4 font-medium sm:table-cell">{t.type}</th>
                      <th className="p-4 font-medium">{t.status}</th>
                      <th className="hidden p-4 font-medium md:table-cell">{t.rooms}</th>
                      <th className="p-4 text-right font-medium">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/5">
                    {filtered.map((p) => (
                      <tr key={p.slug} className={cn("transition-colors hover:bg-bone/60", hidden[p.slug] && "opacity-45")}>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={p.cover} alt="" className="h-12 w-16 shrink-0 rounded-md object-cover" />
                            <div className="min-w-0">
                              <p className="font-medium text-ink">{p.name}</p>
                              <p className="text-xs text-ink/50">{p.location} · {p.images} {t.images}</p>
                            </div>
                          </div>
                        </td>
                        <td className="hidden p-4 text-ink/70 sm:table-cell">{p.type}</td>
                        <td className="p-4">{hidden[p.slug] ? <span className="text-xs text-ink/40">{t.hidden}</span> : statusPill(p.status)}</td>
                        <td className="hidden p-4 text-ink/60 md:table-cell">
                          {p.beds} · {p.baths} · {p.surface}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-3">
                            <Link href={`/${locale}/properties/${p.slug}`} className="text-xs font-semibold text-ink transition-colors hover:text-clay">
                              {t.edit}
                            </Link>
                            <button
                              type="button"
                              onClick={() => setHidden((h) => ({ ...h, [p.slug]: !h[p.slug] }))}
                              className="text-xs font-semibold text-ink/50 transition-colors hover:text-ink"
                            >
                              {hidden[p.slug] ? t.show : t.hide}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {view === "media" && (
            <div>
              <p className="mb-6 text-sm text-ink/55">{media.length} {t.mediaCount}</p>
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {media.map((m, i) => (
                  <li key={i} className="overflow-hidden rounded-xl border border-ink/10 bg-cream">
                    <div className="relative aspect-[4/3] bg-ink">
                      {m.kind === "video" ? (
                        <>
                          <video src={`${m.src}#t=0.1`} className="h-full w-full object-cover" preload="metadata" muted />
                          <span className="absolute inset-0 grid place-items-center text-cream">
                            <IconPlay className="text-2xl" />
                          </span>
                        </>
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.src} alt="" className="h-full w-full object-cover" />
                      )}
                      <span className="absolute left-2 top-2 rounded-full bg-ink/60 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-cream backdrop-blur-sm">
                        {m.kind === "video" ? t.video : t.image}
                      </span>
                    </div>
                    <p className="truncate p-3 text-xs text-ink/60">{m.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {view === "leads" && (
            <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-cream">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-ink/10 text-[0.7rem] uppercase tracking-[0.12em] text-ink/45">
                  <tr>
                    <th className="p-4 font-medium">{t.lead}</th>
                    <th className="hidden p-4 font-medium sm:table-cell">{t.budget}</th>
                    <th className="hidden p-4 font-medium md:table-cell">{t.date}</th>
                    <th className="p-4 font-medium">{t.status}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/5">
                  {LEADS.map((l) => (
                    <tr key={l.email} className="transition-colors hover:bg-bone/60">
                      <td className="p-4">
                        <p className="font-medium text-ink">{l.name}</p>
                        <p className="text-xs text-ink/50">{l.email}</p>
                      </td>
                      <td className="hidden p-4 text-ink/70 sm:table-cell">{l.intent}</td>
                      <td className="hidden p-4 text-ink/50 md:table-cell">{l.date}</td>
                      <td className="p-4">
                        <span className={cn("inline-flex rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em]", l.status === "new" ? "bg-clay/15 text-clay" : "bg-ink/10 text-ink/70")}>
                          {leadStatus(l.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {view === "settings" && (
            <div className="max-w-xl rounded-2xl border border-ink/10 bg-cream p-7">
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  { label: t.agencyName, value: site.name },
                  { label: t.email, value: site.email },
                  { label: t.phone, value: site.phone },
                  { label: "WhatsApp", value: `+${site.whatsapp}` },
                  { label: "TikTok", value: site.tiktok.replace("https://www.tiktok.com/", "") },
                ].map((f) => (
                  <label key={f.label} className="block text-sm">
                    <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-ink/55">
                      {f.label}
                    </span>
                    <input
                      defaultValue={f.value}
                      className="w-full rounded-lg border border-ink/15 bg-bone px-4 py-2.5 text-ink outline-none focus:border-ink/40"
                    />
                  </label>
                ))}
              </div>
              <button className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-ink-soft">
                {t.save}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
