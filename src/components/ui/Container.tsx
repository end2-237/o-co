import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Centered content column with consistent responsive gutters. Accepts an `as`
 * prop so it can render semantic landmarks (section, header, footer, …).
 */
export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12", className)}>
      {children}
    </Tag>
  );
}
