import type { ReactNode, SVGProps } from "react";
import { cn } from "@/lib/cn";

export type IconName =
    | "search"
    | "heart"
    | "bag"
    | "store"
    | "drop"
    | "truck"
    | "leaf"
    | "shield"
    | "headset"
    | "menu"
    | "close"
    | "plus"
    | "arrow-right"
    | "check"
    | "grid"
    | "box"
    | "receipt"
    | "archive"
    | "wallet"
    | "sparkle"
    | "settings"
    | "sun"
    | "chevron-down"
    | "chevron-right"
    | "user"
    | "star"
    | "pin"
    | "eye"
    | "eye-off"
    | "logout"
    | "arrow-left"
    | "mail"
    | "lock"
    | "calendar"
    | "filter"
    | "package";

const glyphs: Record<IconName, ReactNode> = {
    search: (
        <>
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m16 16 5 5" />
        </>
    ),
    heart: (
        <path d="M20.8 8.8c0 5-8.8 11-8.8 11s-8.8-6-8.8-11A4.8 4.8 0 0 1 12 6a4.8 4.8 0 0 1 8.8 2.8Z" />
    ),
    bag: (
        <>
            <path d="M5 8h14l1 13H4L5 8Z" />
            <path d="M9 9V6a3 3 0 0 1 6 0v3" />
        </>
    ),
    store: (
        <>
            <path d="M3 10h18l-2-6H5l-2 6Z" />
            <path d="M5 10v10h14V10M9 20v-6h6v6" />
        </>
    ),
    drop: <path d="M12 2C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-13Z" />,
    truck: (
        <>
            <path d="M2 6h12v11H2zM14 10h4l4 4v3h-8z" />
            <circle cx="7" cy="19" r="2" />
            <circle cx="18" cy="19" r="2" />
        </>
    ),
    leaf: (
        <>
            <path d="M20 4C9 4 4 9 4 16c0 3 2 4 4 4 7 0 12-5 12-16Z" />
            <path d="M4 20c3-5 7-8 12-11" />
        </>
    ),
    shield: (
        <>
            <path d="M12 2 20 5v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3Z" />
            <path d="m8 12 2.5 2.5L16 9" />
        </>
    ),
    headset: (
        <>
            <path d="M3 13v-2a9 9 0 0 1 18 0v2" />
            <path d="M3 13h4v7H5a2 2 0 0 1-2-2v-5ZM21 13h-4v7h2a2 2 0 0 0 2-2v-5Z" />
        </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    plus: <path d="M12 5v14M5 12h14" />,
    "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
    check: <path d="M5 13l4 4L19 7" />,
    grid: (
        <>
            <rect x="4" y="4" width="7" height="7" rx="1.5" />
            <rect x="13" y="4" width="7" height="7" rx="1.5" />
            <rect x="4" y="13" width="7" height="7" rx="1.5" />
            <rect x="13" y="13" width="7" height="7" rx="1.5" />
        </>
    ),
    box: (
        <>
            <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
            <path d="m3 8 9 5 9-5" />
            <path d="M12 13v8" />
        </>
    ),
    receipt: (
        <>
            <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
            <path d="M9 8h6M9 12h6" />
        </>
    ),
    archive: (
        <>
            <path d="M3 7h18v13H3z" />
            <path d="m3 7 2-4h14l2 4" />
            <path d="M9 11h6" />
        </>
    ),
    wallet: (
        <>
            <rect x="3" y="6" width="18" height="14" rx="2" />
            <path d="M3 10h18" />
            <circle cx="16.5" cy="15.5" r="1.2" />
        </>
    ),
    sparkle: <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />,
    settings: (
        <>
            <path d="M4 7h10M18 7h2" />
            <circle cx="16" cy="7" r="2" />
            <path d="M4 12h6M14 12h6" />
            <circle cx="12" cy="12" r="2" />
            <path d="M4 17h2M10 17h10" />
            <circle cx="8" cy="17" r="2" />
        </>
    ),
    sun: (
        <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </>
    ),
    "chevron-down": <path d="m6 9 6 6 6-6" />,
    "chevron-right": <path d="m9 6 6 6-6 6" />,
    user: (
        <>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
        </>
    ),
    star: (
        <path
            d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z"
            fill="currentColor"
            stroke="none"
        />
    ),
    pin: (
        <>
            <path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" />
            <circle cx="12" cy="9" r="2.4" />
        </>
    ),
    eye: (
        <>
            <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
            <circle cx="12" cy="12" r="3" />
        </>
    ),
    "eye-off": (
        <>
            <path d="M4 4l16 16" />
            <path d="M9.9 5.9A9.8 9.8 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-2.4 3.2M6.2 7.8A17 17 0 0 0 2.5 12S6 18.5 12 18.5c1.4 0 2.7-.4 3.8-1" />
            <path d="M10 10a2.8 2.8 0 0 0 4 4" />
        </>
    ),
    logout: (
        <>
            <path d="M9 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4" />
            <path d="M16 8l4 4-4 4M20 12H9" />
        </>
    ),
    "arrow-left": <path d="M19 12H5M11 6l-6 6 6 6" />,
    mail: (
        <>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
        </>
    ),
    lock: (
        <>
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </>
    ),
    calendar: (
        <>
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M8 3v4M16 3v4M3 10h18" />
        </>
    ),
    filter: <path d="M3 5h18l-7 8v6l-4-2v-4L3 5Z" />,
    package: (
        <>
            <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
            <path d="m3 8 9 5 9-5M12 13v8" />
        </>
    ),
};

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
    name: IconName;
    size?: number;
    label?: string;
}

export function Icon({ name, size = 20, label, className, strokeWidth = 1.8, ...rest }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("oi-icon", className)}
            role={label ? "img" : undefined}
            aria-hidden={label ? undefined : true}
            aria-label={label}
            focusable="false"
            {...rest}
        >
            {glyphs[name]}
        </svg>
    );
}
