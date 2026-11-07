import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface SectionProps {
    eyebrow?: ReactNode;
    title?: ReactNode;
    action?: ReactNode;
    children: ReactNode;
    className?: string;
}

export function Section({ eyebrow, title, action, children, className }: SectionProps) {
    const hasHead = eyebrow || title || action;

    return (
        <section className={cn("oi-section", className)}>
            {hasHead && (
                <div className="oi-section__head">
                    <div>
                        {eyebrow && <span className="oi-eyebrow oi-eyebrow--green">{eyebrow}</span>}
                        {title && <h2 className="oi-section__title">{title}</h2>}
                    </div>
                    {action}
                </div>
            )}
            {children}
        </section>
    );
}
