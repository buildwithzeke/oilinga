"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

type Listing = { name: string; price: string; size: string; stock: string };
type ShopSetup = {
    shop: string;
    owner: string;
    location: string;
    tagline: string;
    products: Listing[];
    published: boolean;
};
type Stage = "landing" | "register" | "products" | "dashboard";

const STORAGE_KEY = "oilinga-seller-shop-v1";
const blankProduct: Listing = { name: "", price: "", size: "", stock: "" };
const steps = [
    { number: "01", title: "Register your shop", copy: "Add your business name, owner details and location." },
    { number: "02", title: "List your products", copy: "Set product names, pack sizes, prices and available stock." },
    { number: "03", title: "Publish and grow", copy: "Publish your products and manage your shop from one place." },
];

export function SellerSetup() {
    const [setup, setSetup] = useState<ShopSetup | null>(null);
    const [stage, setStage] = useState<Stage>("landing");
    const [loaded, setLoaded] = useState(false);
    const [shop, setShop] = useState("");
    const [owner, setOwner] = useState("");
    const [location, setLocation] = useState("");
    const [tagline, setTagline] = useState("");
    const [product, setProduct] = useState(blankProduct);
    const [error, setError] = useState("");

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const existing = JSON.parse(saved) as ShopSetup;
                setSetup(existing);
                setStage(existing.published ? "dashboard" : "products");
            }
        } catch {
            // Start at the landing page if saved browser data is unreadable.
        }
        setLoaded(true);
    }, []);

    function save(value: ShopSetup) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
        setSetup(value);
    }

    function register(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!shop.trim() || !owner.trim() || !location.trim()) return;
        save({
            shop: shop.trim(),
            owner: owner.trim(),
            location: location.trim(),
            tagline: tagline.trim(),
            products: [],
            published: false,
        });
        setError("");
        setStage("products");
    }

    function addProduct(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (
            !setup ||
            !product.name.trim() ||
            Number(product.price) <= 0 ||
            !product.size.trim() ||
            Number(product.stock) < 0
        ) {
            setError("Enter a product name, size, positive price and stock quantity.");
            return;
        }
        save({ ...setup, products: [...setup.products, { ...product, name: product.name.trim() }] });
        setProduct(blankProduct);
        setError("");
    }

    function publishShop() {
        if (!setup?.products.length) return;
        save({ ...setup, published: true });
        setStage("dashboard");
    }

    if (!loaded) {
        return <section className="oi-view oi-container"><p>Loading your shop…</p></section>;
    }

    if (stage === "landing") {
        return (
            <section className="oi-view oi-container oi-seller-landing">
                <div className="oi-hero oi-seller-landing__hero">
                    <div className="oi-hero__copy oi-seller-landing__copy">
                        <span className="oi-eyebrow">SELL ON OILINGA</span>
                        <h1 className="oi-hero__title">Your harvest deserves a <em>bigger market.</em></h1>
                        <p className="oi-hero__lede">
                            Open a shop, list your oils and reach buyers looking for trusted local producers.
                        </p>
                        <div className="oi-hero__actions">
                            <button className="oi-btn oi-btn--gold" type="button" onClick={() => setStage("register")}>
                                Create your shop <Icon name="arrow-right" size={16} />
                            </button>
                            <a className="oi-btn oi-btn--glass" href="#seller-how-it-works">How it works</a>
                        </div>
                        <div className="oi-hero__proof">
                            <span>✦ Free to get started</span>
                            <span>✦ Set up in a few steps</span>
                        </div>
                    </div>
                    <div className="oi-hero__photo oi-seller-landing__photo" aria-hidden="true">
                        <img src="/assets/brand/oilinga-brand-visual-reference.png" alt="" />
                    </div>
                </div>

                <div id="seller-how-it-works" className="oi-seller-landing__how">
                    <div className="oi-section__head">
                        <div>
                            <span className="oi-eyebrow oi-eyebrow--green">A SIMPLE WAY TO START</span>
                            <h2 className="oi-section__title">From producer to storefront</h2>
                        </div>
                    </div>
                    <div className="oi-seller-landing__steps">
                        {steps.map((item) => (
                            <article className="oi-seller-landing__step" key={item.number}>
                                <span className="oi-seller-landing__number">{item.number}</span>
                                <h3>{item.title}</h3>
                                <p>{item.copy}</p>
                            </article>
                        ))}
                    </div>
                </div>

                <section className="oi-seller-landing__callout">
                    <div>
                        <span className="oi-eyebrow">READY WHEN YOU ARE</span>
                        <h2>Let’s get your shop started.</h2>
                        <p>Register your business first. You can add products and publish once your shop details are in.</p>
                    </div>
                    <button className="oi-btn oi-btn--gold" type="button" onClick={() => setStage("register")}>
                        Create your shop <Icon name="arrow-right" size={16} />
                    </button>
                </section>
            </section>
        );
    }

    if (stage === "register") {
        return (
            <section className="oi-view oi-container oi-seller-setup">
                <div className="oi-seller-setup__card">
                    <button className="oi-seller-setup__back" type="button" onClick={() => setStage("landing")}>
                        <Icon name="arrow-left" size={15} /> Back to seller overview
                    </button>
                    <span className="oi-eyebrow oi-eyebrow--green">STEP 1 OF 3 · SHOP DETAILS</span>
                    <h1 className="oi-seller-setup__title">Register your shop</h1>
                    <p className="oi-seller-setup__lede">Tell buyers about your business. You can add products after registration.</p>
                    <form onSubmit={register}>
                        <label className="oi-seller-setup__field">Shop or business name<input required value={shop} onChange={e => setShop(e.target.value)} placeholder="e.g. Sunrise Palm Oils" /></label>
                        <label className="oi-seller-setup__field">Your name<input required value={owner} onChange={e => setOwner(e.target.value)} placeholder="Business owner" /></label>
                        <label className="oi-seller-setup__field">Business location<input required value={location} onChange={e => setLocation(e.target.value)} placeholder="City, State / Region" /></label>
                        <label className="oi-seller-setup__field">Short shop introduction<input value={tagline} onChange={e => setTagline(e.target.value)} placeholder="What do you make or sell?" /></label>
                        <button className="oi-btn oi-btn--primary" type="submit">Register and continue <Icon name="arrow-right" size={16} /></button>
                    </form>
                </div>
            </section>
        );
    }

    if (stage === "products" && setup) {
        return (
            <section className="oi-view oi-container oi-seller-setup">
                <div className="oi-seller-setup__card">
                    <span className="oi-eyebrow oi-eyebrow--green">STEP 2 OF 3 · PRODUCT LISTING</span>
                    <h1 className="oi-seller-setup__title">Add products to {setup.shop}</h1>
                    <p className="oi-seller-setup__lede">Your shop is registered. Add at least one product before publishing your storefront.</p>
                    <div className="oi-seller-setup__steps"><b>Shop registered</b><span>→ Add products → Publish</span></div>
                    <form onSubmit={addProduct}>
                        <label className="oi-seller-setup__field">Product name<input required value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })} placeholder="Cold-pressed palm oil" /></label>
                        <div className="oi-seller-setup__product-fields">
                            <label className="oi-seller-setup__field">Price (₦)<input required type="number" min="1" value={product.price} onChange={e => setProduct({ ...product, price: e.target.value })} /></label>
                            <label className="oi-seller-setup__field">Pack size<input required value={product.size} onChange={e => setProduct({ ...product, size: e.target.value })} placeholder="5 litres" /></label>
                            <label className="oi-seller-setup__field">Stock quantity<input required type="number" min="0" value={product.stock} onChange={e => setProduct({ ...product, stock: e.target.value })} /></label>
                        </div>
                        {error && <p role="alert" className="oi-seller-setup__error">{error}</p>}
                        <button className="oi-btn oi-btn--outline" type="submit">Add product</button>
                    </form>
                    <h2 className="oi-seller-setup__products-title">Products ({setup.products.length})</h2>
                    {setup.products.length === 0 ? (
                        <p className="oi-seller-setup__empty">No products listed yet.</p>
                    ) : (
                        <ul className="oi-seller-setup__products">
                            {setup.products.map((item, index) => (
                                <li key={`${item.name}-${index}`}>
                                    <b>{item.name}</b><span>₦{Number(item.price).toLocaleString()} · {item.size} · {item.stock} in stock</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    <button className="oi-btn oi-btn--primary" type="button" disabled={!setup.products.length} onClick={publishShop}>
                        Publish shop and products <Icon name="arrow-right" size={16} />
                    </button>
                </div>
            </section>
        );
    }

    if (stage === "dashboard" && setup?.published) {
        return (
            <section className="oi-view oi-container oi-seller-dashboard">
                <div className="oi-seller-dashboard__heading">
                    <div>
                        <span className="oi-eyebrow oi-eyebrow--green">SELLER DASHBOARD</span>
                        <h1>{setup.shop}</h1>
                        <p>{setup.location}{setup.tagline ? ` · ${setup.tagline}` : ""}</p>
                    </div>
                    <span className="oi-seller-dashboard__live"><span /> Published</span>
                </div>
                <div className="oi-seller-dashboard__metrics">
                    <article><span>Shop status</span><strong>Live</strong><small>Your storefront is published</small></article>
                    <article><span>Products listed</span><strong>{setup.products.length}</strong><small>Available in your shop</small></article>
                    <article><span>Business location</span><strong>{setup.location}</strong><small>Seller profile detail</small></article>
                </div>
                <div className="oi-seller-dashboard__products-head">
                    <div><span className="oi-eyebrow oi-eyebrow--green">YOUR CATALOGUE</span><h2>Published products</h2></div>
                </div>
                <div className="oi-seller-dashboard__product-list">
                    {setup.products.map((item, index) => (
                        <article className="oi-seller-dashboard__product" key={`${item.name}-${index}`}>
                            <span className="oi-seller-dashboard__product-icon"><Icon name="package" size={19} /></span>
                            <div><h3>{item.name}</h3><p>{item.size} · {item.stock} in stock</p></div>
                            <strong>₦{Number(item.price).toLocaleString()}</strong>
                            <span className="oi-seller-dashboard__live"><span /> Live</span>
                        </article>
                    ))}
                </div>
                <div className="oi-seller-dashboard__footer">
                    <p>Your shop has been published and is ready for buyers.</p>
                    <Link className="oi-btn oi-btn--outline" href="/marketplace">Go to marketplace <Icon name="arrow-right" size={16} /></Link>
                </div>
            </section>
        );
    }

    return <section className="oi-view oi-container"><p>Shop setup could not be loaded. Return to the <Link className="oi-link" href="/seller">seller overview</Link> and try again.</p></section>;
}
