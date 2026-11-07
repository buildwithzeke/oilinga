import Link from "next/link";
import { Icon } from "./Icon";

export interface Crumb {
    label: string;
    href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
    return (
        <nav className="oi-breadcrumbs" aria-label="Breadcrumb">
            <ol>
                {items.map((item, index) => {
                    const last = index === items.length - 1;
                    return (
                        <li key={`${item.label}-${index}`}>
                            {item.href && !last ? (
                                <Link href={item.href}>{item.label}</Link>
                            ) : (
                                <span aria-current={last ? "page" : undefined}>{item.label}</span>
                            )}
                            {!last && <Icon name="chevron-right" size={13} />}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
