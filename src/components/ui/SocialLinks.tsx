import { socialItems } from "@/lib/site";
import { socialIcons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/**
 * Social profile links. Defaults to a horizontal row; the hero uses the
 * vertical variant for the right-hand rail seen in the reference design.
 */
export function SocialLinks({
  orientation = "horizontal",
  className,
  linkClassName,
  iconClassName = "text-[1.05rem]",
}: {
  orientation?: "horizontal" | "vertical";
  className?: string;
  linkClassName?: string;
  iconClassName?: string;
}) {
  return (
    <ul
      className={cn(
        "flex items-center",
        orientation === "vertical" ? "flex-col gap-5" : "flex-row gap-4",
        className,
      )}
    >
      {socialItems.map((item) => {
        const Icon = socialIcons[item.key];
        return (
          <li key={item.key}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`O&CO Homes on ${item.label}`}
              className={cn(
                "inline-flex transition-colors duration-200 hover:text-clay",
                linkClassName,
              )}
            >
              <Icon className={iconClassName} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
