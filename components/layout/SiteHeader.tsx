"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/brand/Logo";
import { useAuth } from "@/components/auth/AuthProvider";
import { IconButton } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import { RouteSearch } from "@/components/marketplace/RouteSearch";

const navigation = [
    { href: "/", label: "Home" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/shops", label: "Shops" },
    { href: "/seller", label: "For Sellers" },
    { href: "/about", label: "About" },
];

export function SiteHeader() {
    const pathname = usePathname();
    const { user, ready } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const notify = useToast();

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!menuOpen) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") setMenuOpen(false);
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [menuOpen]);

    function isActive(href: string) {
        if (href === "/") return pathname === "/";
        return pathname === href || pathname.startsWith(`${href}/`);
    }

    function wishlist() {
        notify(
            user
                ? "Saved products are coming soon"
                : "Sign in to save your wishlist",
        );
    }

    const searchField = (
        <RouteSearch
            basePath="/marketplace"
            placeholder="Search oils…"
            label="Search products"
        />
    );

    const accountActions = !ready ? null : user ? (
        <Link
            href="/account"
            className="oi-header-account"
            aria-label={`Your account, ${user.name}`}
        >
            <span className="oi-header-account__avatar" aria-hidden="true">
                {user.initials}
            </span>
            <span className="oi-header-account__name">
                {user.name.split(/\s+/)[0]}
            </span>
        </Link>
    ) : (
        <>
            <ButtonLink href="/auth/login" variant="outline" size="sm">
                Log in
            </ButtonLink>
            <ButtonLink href="/auth/signup" variant="danger" size="sm">
                Sign up
            </ButtonLink>
        </>
    );

    return (
        <header className="oi-site-header">
            <div className="oi-container oi-site-header__inner">
                <Link className="oi-brand" href="/" aria-label="Oilinga home">
                    <Logo />
                </Link>

                <nav
                    id="primary-navigation"
                    className={cn("oi-nav", menuOpen && "is-open")}
                    aria-label="Primary"
                >
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            className="oi-nav__link"
                            href={item.href}
                            aria-current={isActive(item.href) ? "page" : undefined}
                            onClick={() => setMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}

                    <div className="oi-nav__actions">
                        {searchField}
                        <IconButton label="Wishlist" onClick={wishlist}>
                            <Icon name="heart" size={18} />
                        </IconButton>
                        {accountActions}
                    </div>
                </nav>

                <div className="oi-header-actions">
                    {searchField}
                    <IconButton label="Wishlist" onClick={wishlist}>
                        <Icon name="heart" size={18} />
                    </IconButton>
                    {accountActions}
                </div>

                <button
                    type="button"
                    className="oi-menu-toggle"
                    aria-expanded={menuOpen}
                    aria-controls="primary-navigation"
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    <Icon name={menuOpen ? "close" : "menu"} size={22} />
                    <span className="oi-sr-only">
                        {menuOpen ? "Close navigation" : "Open navigation"}
                    </span>
                </button>
            </div>
        </header>
    );
}
