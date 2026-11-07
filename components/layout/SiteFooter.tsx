import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

const links = [
    { href: "/marketplace", label: "Marketplace" },
    { href: "/shops", label: "Shops" },
    { href: "/seller", label: "Seller portal" },
    { href: "/about", label: "About" },
    { href: "/account", label: "Account" },
    { href: "/design-system", label: "Design system" },
];

export function SiteFooter() {
    return (
        <footer className="oi-site-footer">
            <div className="oi-container oi-footer__main">
                <div className="oi-footer__brand">
                    <Logo variant="light" alt="Oilinga" />
                </div>
                <p className="oi-footer__tagline">
                    Building a thriving agricultural marketplace in Africa.
                </p>
                <div className="oi-footer__socials">
                    <a className="oi-footer__social" href="https://facebook.com" aria-label="Oilinga on Facebook">
                        f
                    </a>
                    <a className="oi-footer__social" href="https://instagram.com" aria-label="Oilinga on Instagram">
                        ◎
                    </a>
                    <a className="oi-footer__social" href="https://linkedin.com" aria-label="Oilinga on LinkedIn">
                        in
                    </a>
                </div>
            </div>

            <div className="oi-container oi-footer__bottom">
                <span>© 2026 Oilinga. Buy · Sell · Grow.</span>
                <nav className="oi-footer__links" aria-label="Footer">
                    {links.map((link) => (
                        <Link key={link.href} href={link.href}>
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </footer>
    );
}
