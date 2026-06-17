import { IconWhatsapp } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/**
 * WhatsApp click-to-chat button. On large screens it's a compact icon that
 * deploys the label on hover/focus; on small screens the label is always shown.
 */
export function WhatsAppButton({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "group inline-flex items-center rounded-full bg-[#25D366] text-white shadow-sm transition-colors hover:bg-[#1FB855]",
        className,
      )}
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center text-xl">
        <IconWhatsapp aria-hidden />
      </span>
      <span className="max-w-[16rem] overflow-hidden whitespace-nowrap pr-5 text-sm font-semibold uppercase tracking-[0.14em] opacity-100 transition-all duration-300 lg:max-w-0 lg:pr-0 lg:opacity-0 lg:group-hover:max-w-[16rem] lg:group-hover:pr-5 lg:group-hover:opacity-100 lg:group-focus-visible:max-w-[16rem] lg:group-focus-visible:pr-5 lg:group-focus-visible:opacity-100">
        {label}
      </span>
    </a>
  );
}
