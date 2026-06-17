import { cn } from "@/lib/utils";

/**
 * O&CO wordmark. Renders as text for crispness at any size and inherits
 * `currentColor`, so the header can flip it between cream and ink. The clay
 * full-stop is a small nod to the stacked logo mark.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display text-2xl font-semibold leading-none tracking-[0.01em]",
        className,
      )}
    >
      O<span className="text-clay">&amp;</span>CO
      <span className="text-clay">.</span>
    </span>
  );
}
