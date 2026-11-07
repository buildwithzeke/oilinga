import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="oi-site">
            <a className="oi-skip-link" href="#main-content">
                Skip to content
            </a>
            <SiteHeader />
            <main id="main-content" className="oi-main">
                {children}
            </main>
            <SiteFooter />
        </div>
    );
}
