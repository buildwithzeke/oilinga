import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import type { ButtonSize, ButtonVariant } from "./Button";

export interface ButtonLinkProps extends ComponentProps<typeof Link> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    block?: boolean;
}

export function ButtonLink({
    variant = "primary",
    size = "md",
    block = false,
    className,
    children,
    ...rest
}: ButtonLinkProps) {
    return (
        <Link
            className={cn(
                "oi-btn",
                `oi-btn--${variant}`,
                size !== "md" && `oi-btn--${size}`,
                block && "oi-btn--block",
                className,
            )}
            {...rest}
        >
            {children}
        </Link>
    );
}
