"use client";

import { useEffect, useState } from "react";
import type { Page } from "@/lib/data";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/brand/Logo";
import { Button, IconButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SearchField } from "@/components/ui/SearchField";
import { useToast } from "@/components/ui/Toast";

const navigation: Array<{ id: Page; label: string }> = [
    { id: "home", label: "Home" },
    { id: "marketplace", label: "Marketplace" },
    { id: "seller", label: "For Sellers" },
    { id: "about", label: "About" },
];

export interface SiteHeaderProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
    onSearch?: (value: string) => void;
}

export function SiteHeader({ currentPage, onNavigate, onSearch }: SiteHeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const notify = useToast();

    useEffect(() => {
        if (!menuOpen) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") setMenuOpen(false);
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [menuOpen]);

    function navigate(page: Page) {
        setMenuOpen(false);
        onNavigate(page);
    }

    function search(value: string) {
        setMenuOpen(false);
        if (onSearch) {
            onSearch(value);
            return;
        }
        onNavigate("marketplace");
    }

    const searchField = (
        <SearchField
            placeholder="Search oils…"
            label="Search products"
            onSubmit={search}
        />
    );

    const accountActions = (
        <>
            <Button
                variant="outline"
                size="sm"
                onClick={() => notify("Account access is coming soon")}
            >
                Log in
            </Button>
            <Button
                variant="danger"
                size="sm"
                onClick={() => notify("Account access is coming soon")}
            >
                Sign up
            </Button>
        </>
    );

    return (
        <header className="oi-site-header">
            <div className="oi-container oi-site-header__inner">
                <a
                    className="oi-brand"
                    href="#home"
                    aria-label="Oilinga home"
                    onClick={(event) => {
                        event.preventDefault();
                        navigate("home");
                    }}
                >
                    <Logo />
                </a>

                <nav
                    id="primary-navigation"
                    className={cn("oi-nav", menuOpen && "is-open")}
                    aria-label="Primary"
                >
                    {navigation.map((item) => (
                        <a
                            key={item.id}
                            className="oi-nav__link"
                            href={`#${item.id}`}
                            aria-current={currentPage === item.id ? "page" : undefined}
                            onClick={(event) => {
                                event.preventDefault();
                                navigate(item.id);
                            }}
                        >
                            {item.label}
                        </a>
                    ))}

                    <div className="oi-nav__actions">
                        {searchField}
                        <IconButton
                            label="Wishlist"
                            onClick={() => notify("Sign in to save your wishlist")}
                        >
                            <Icon name="heart" size={18} />
                        </IconButton>
                        {accountActions}
                    </div>
                </nav>

                <div className="oi-header-actions">
                    {searchField}
                    <IconButton
                        label="Wishlist"
                        onClick={() => notify("Sign in to save your wishlist")}
                    >
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
