"use client";

import { useEffect, useRef, useState } from "react";
import {
  Globe, Lock, ShieldCheck, ScreenShare, Settings2, Copy, Check, X, Mail,
} from "lucide-react";

export interface DnsRecord {
  type: "A" | "CNAME";
  host: string;
  value: string;
}

interface CustomDomainCardProps {
  /** Free address the site already has, e.g. "pawsome-pet.nexpetcare.com" */
  freeAddress: string;
  /** Set in the database once a domain is connected (dbData.customDomain) */
  customDomain?: string | null;
  isDeployed: boolean;
  /** The DNS records a client adds at their registrar */
  records: DnsRecord[];
  /** Where "Request my 5-minute setup" goes (mailto: or a booking link) */
  helpHref: string;
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const OPTIONS = [
  {
    id: "assisted",
    title: "We do it with you",
    blurb: "A 5-minute screen share. No passwords shared.",
    badge: "Recommended",
    Icon: ScreenShare,
  },
  {
    id: "self",
    title: "Set it up yourself",
    blurb: "Copy two DNS records into your registrar.",
    badge: null,
    Icon: Settings2,
  },
] as const;

const ASSISTED_STEPS = [
  "Tell us the domain you own, or the one you want to buy.",
  "Hop on a 5-minute screen share. You stay in control of your own registrar screen and never share a password.",
  "We check that your website loads on your domain.",
];

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked: the value is still selectable on screen.
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <p className="truncate select-all font-mono text-sm text-gray-900">{value}</p>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label.toLowerCase()}: ${value}`}
        className={`flex shrink-0 items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-100 ${focusRing}`}
      >
        {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
        {copied ? "Copied" : "Copy"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
}

export default function CustomDomainCard({
  freeAddress,
  customDomain,
  isDeployed,
  records,
  helpHref,
}: CustomDomainCardProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mode, setMode] = useState<"assisted" | "self">("assisted");
  const connected = Boolean(customDomain);

  // Never leave the page locked if the card unmounts while the modal is open.
  useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    []
  );

  const open = () => {
    document.body.style.overflow = "hidden";
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  return (
    <section
      aria-labelledby="custom-domain-title"
      className="w-full max-w-7xl mx-auto mt-6 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
          <Globe className="w-7 h-7 text-blue-600" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 id="custom-domain-title" className="text-xl font-bold text-gray-900">
              Custom Domain
            </h2>
            {connected ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                <Lock size={12} /> Connected
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                Included · $0/mo
              </span>
            )}
          </div>

          <p
            className={`mt-3 inline-flex max-w-full items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-sm ${
              connected
                ? "border border-green-200 bg-green-50 text-green-800"
                : "border border-dashed border-gray-300 bg-gray-50 text-gray-400"
            }`}
          >
            <Globe size={14} className="shrink-0" />
            <span className="truncate">{connected ? customDomain : "www.yourbusiness.com"}</span>
          </p>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600">
            You keep 100% ownership in your own registrar (GoDaddy, Namecheap, etc.). We connect it
            with simple DNS records, so your business email stays untouched.
          </p>
          <p className="mt-1.5 text-xs text-gray-500">
            {connected
              ? `Also available at ${freeAddress}.`
              : `Connecting is $0. You only pay your registrar's yearly domain fee. Until then your site uses ${freeAddress}.`}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className={`shrink-0 self-start rounded-xl px-8 py-3 text-sm font-semibold shadow-md transition-all lg:self-center ${focusRing} ${
          connected
            ? "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
            : "bg-black text-white hover:bg-gray-800"
        }`}
      >
        {connected ? "Change Domain" : "Connect Domain"}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="connect-domain-title"
        onClose={() => {
          document.body.style.overflow = "";
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-auto w-[min(94vw,40rem)] rounded-2xl border border-gray-200 bg-white p-0 text-gray-900 shadow-xl backdrop:bg-black/50"
      >
        <div className="flex max-h-[88vh] flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-gray-200 p-5 md:p-6">
            <div>
              <h3 id="connect-domain-title" className="text-lg font-bold">
                Connect your domain
              </h3>
              <p className="mt-1 flex items-start gap-2 text-sm text-gray-600">
                <ShieldCheck size={16} className="mt-0.5 shrink-0 text-green-600" />
                <span>Your domain stays at your registrar. We never need your registrar login.</span>
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className={`flex size-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 ${focusRing}`}
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-5 overflow-y-auto p-5 md:p-6">
            {!isDeployed && (
              <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
                Your site isn&apos;t live yet. Deploy it first, then connect your domain, or request
                the setup call and we&apos;ll sort the order out with you.
              </p>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              {OPTIONS.map(({ id, title, blurb, badge, Icon }) => {
                const active = mode === id;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setMode(id)}
                    className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors ${focusRing} ${
                      active
                        ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <span className="flex w-full items-center justify-between gap-2">
                      <Icon size={20} className={active ? "text-blue-600" : "text-gray-500"} />
                      {badge && (
                        <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[11px] font-semibold text-white">
                          {badge}
                        </span>
                      )}
                    </span>
                    <span className="text-sm font-bold text-gray-900">{title}</span>
                    <span className="text-xs leading-relaxed text-gray-600">{blurb}</span>
                  </button>
                );
              })}
            </div>

            {mode === "assisted" ? (
              <div className="space-y-4">
                <ol className="space-y-3">
                  {ASSISTED_STEPS.map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-sm leading-relaxed text-gray-700">
                      <span
                        aria-hidden="true"
                        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white"
                      >
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
                <a
                  href={helpHref}
                  className={`inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-gray-800 ${focusRing}`}
                >
                  <Mail size={16} /> Request my 5-minute setup
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-700">
                  Log in to your registrar, open your domain&apos;s DNS settings, and add these two records.
                </p>

                {records.map((record) => (
                  <div key={`${record.type}-${record.host}`} className="space-y-2 rounded-xl border border-gray-200 p-4">
                    <p className="text-sm font-bold text-gray-900">{record.type} record</p>
                    <CopyField label="Name / Host" value={record.host} />
                    <CopyField label="Value / Points to" value={record.value} />
                  </div>
                ))}

                <ul className="list-disc space-y-1.5 pl-5 text-xs leading-relaxed text-gray-600">
                  <li>These records don&apos;t touch your email (MX) records, so your business email keeps working.</li>
                  <li>If your domain already has an A or CNAME record for this name, replace it instead of adding a second one.</li>
                  <li>Changes can take anywhere from a few minutes to a few hours to show up.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </section>
  );
}