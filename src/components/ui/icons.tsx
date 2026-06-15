import type { SVGProps } from "react";

/**
 * Minimal, dependency-free icon set. All icons inherit `currentColor` and a
 * 24x24 viewBox so they can be sized with font-size or width/height utilities.
 */

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconFacebook(props: IconProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M14 8.5h2.2V5.6c-.4-.05-1.7-.16-3.2-.16-3.2 0-5.3 1.95-5.3 5.5V13H5.2v3.2H7.7V24h3.5v-7.8h2.6l.4-3.2h-3V11c0-1.3.4-2.5 2.8-2.5Z"
      />
    </Base>
  );
}

export function IconInstagram(props: IconProps) {
  return (
    <Base {...props}>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </Base>
  );
}

export function IconLinkedin(props: IconProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M4.98 3.5A2.49 2.49 0 0 0 2.5 6a2.49 2.49 0 0 0 2.46 2.5h.03A2.49 2.49 0 0 0 7.5 6a2.49 2.49 0 0 0-2.52-2.5ZM3 9.75h4v11.25H3V9.75Zm6.5 0h3.83v1.54h.05c.53-.96 1.84-1.97 3.78-1.97 4.04 0 4.84 2.6 4.84 5.98V21h-4v-4.92c0-1.17-.02-2.68-1.66-2.68-1.66 0-1.92 1.28-1.92 2.6V21h-4V9.75Z"
      />
    </Base>
  );
}

export function IconPinterest(props: IconProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M12 3.5a8.5 8.5 0 0 0-3.1 16.41c-.07-.7-.13-1.78.03-2.55.14-.66.92-4.2.92-4.2s-.23-.47-.23-1.16c0-1.09.63-1.9 1.42-1.9.67 0 .99.5.99 1.1 0 .68-.43 1.69-.65 2.63-.19.78.39 1.42 1.16 1.42 1.4 0 2.47-1.47 2.47-3.6 0-1.88-1.35-3.2-3.28-3.2-2.23 0-3.54 1.67-3.54 3.4 0 .67.26 1.4.58 1.79.06.07.07.14.05.22l-.21.86c-.03.14-.11.17-.25.1-.94-.44-1.53-1.8-1.53-2.9 0-2.36 1.72-4.53 4.95-4.53 2.6 0 4.62 1.85 4.62 4.33 0 2.58-1.63 4.66-3.89 4.66-.76 0-1.47-.4-1.71-.86l-.47 1.78c-.17.65-.62 1.46-.93 1.96A8.5 8.5 0 1 0 12 3.5Z"
      />
    </Base>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <Base {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        d="M4 7h16M4 12h16M4 17h16"
      />
    </Base>
  );
}

export function IconClose(props: IconProps) {
  return (
    <Base {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        d="m6 6 12 12M18 6 6 18"
      />
    </Base>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <Base {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 12h15m0 0-6-6m6 6-6 6"
      />
    </Base>
  );
}

export function IconArrowDown(props: IconProps) {
  return (
    <Base {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4v15m0 0 6-6m-6 6-6-6"
      />
    </Base>
  );
}

export const socialIcons = {
  facebook: IconFacebook,
  instagram: IconInstagram,
  linkedin: IconLinkedin,
  pinterest: IconPinterest,
} as const;
