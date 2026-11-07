import { cn } from "@/lib/cn";

export type LogoVariant = "default" | "light";
export type LogoSize = "sm" | "md" | "lg";

export interface LogoProps {
    variant?: LogoVariant;
    size?: LogoSize;
    className?: string;
    alt?: string;
}

export function Logo({
    variant = "default",
    size = "md",
    className,
    alt = "Oilinga — Buy, Sell and Grow",
}: LogoProps) {
    return (
        <span
            className={cn(
                "oi-logo",
                `oi-logo--${size}`,
                variant === "light" && "oi-logo--light",
                className,
            )}
        >
            <img
                src="/assets/brand/oilinga-logo-transparent.png"
                alt={alt}
                width={2172}
                height={724}
                draggable={false}
            />
        </span>
    );
}
