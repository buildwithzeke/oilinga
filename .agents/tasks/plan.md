# Oilinga Phase 2 — Implementation Plan

## Exploration findings

The workspace is far more complete than the task brief implied. Every Phase 2 page and component already exists and `yarn build` passes cleanly (30 static/dynamic routes generated, zero TypeScript errors). What is **missing** is:

1. `lib/cart-context.tsx` — CartContext + useCart hook (referenced by task spec; AddToCart currently just calls useToast).
2. `lib/types.ts` — a types barrel (all types live inline in `lib/data.ts`; a types re-export file is expected).
3. `components/layout/Header.tsx` and `Footer.tsx` — task spec names these; real files are `SiteHeader.tsx` / `SiteFooter.tsx`. Shims needed.
4. `components/ui/SearchBar.tsx` — task spec names this; real file is `SearchField.tsx`. Shim needed.
5. `components/sections/` directory with `Hero.tsx`, `TrustRow.tsx`, `CategoryGrid.tsx`, `SellerBanner.tsx` — task spec names these; actual components live in `components/marketplace/` and `components/views/`. Shims needed.
6. `app/auth/login/page.tsx` and `app/auth/signup/page.tsx` — task spec gives these paths; real auth pages are at `app/(site)/login/page.tsx` and `app/(site)/signup/page.tsx`. New canonical `/auth/*` routes needed.
7. The hero `<img>` in `HomeView.tsx` is a bare HTML `<img>` — should be Next.js `<Image>` for proper optimisation; this likely causes the "images not showing" issue from the original CSS error report.

**Everything else in the task spec already exists.**  Design decisions below apply only to the missing pieces.

---

## Design decisions

**CartContext storage:** Mirror the `AuthProvider` pattern — `useState` on the server boundary, `useEffect` to hydrate from `localStorage`, write back on every change. Key: `oilinga.cart`. Value: `CartItem[]` (serialisable). This is consistent with the codebase and avoids introducing new dependencies.

**AddToCart prop change:** The component currently accepts `productName: string`. To wire up CartContext it needs the full `Product`. Change the prop to `product: Product`; derive `product.name` internally. Update the single call-site in `app/(site)/products/[slug]/page.tsx`.

**CartProvider placement:** Wrap inside `ToastProvider` and alongside `AuthProvider` in `app/layout.tsx`. Order: `ToastProvider → CartProvider → AuthProvider`. This gives every page access to toast, cart and auth.

**Auth route aliases:** Rather than deleting the existing `(site)/login` and `(site)/signup` pages (which would risk regression), add _new_ pages at `app/auth/login/page.tsx` and `app/auth/signup/page.tsx` as additive aliases. Create `app/auth/layout.tsx` that provides the same SiteHeader + SiteFooter shell the `(site)` group provides.

**Header/Footer/SearchBar shims:** Thin re-export files that `export { SiteHeader as Header }` etc. No implementation duplication.

**`components/sections/` shims:** Each file is a one-line re-export from the real location. `Hero.tsx` re-exports `HomeView` (the hero is not a standalone component; this is the closest match).

---

## Plan

- [ ] 1. Create `lib/types.ts` — re-export barrel for all interfaces and types from `lib/data.ts`, plus a new `CartItem` interface.
      Export: all existing exported types (`Product`, `Shop`, `Category`, `TrustSignal`, `ProductArt`, `ProductCategory`, `SellerNavItem`, `Metric`, `Order`) plus `CartItem { product: Product; quantity: number }`.
      Files: `lib/types.ts`
      Verify: `yarn build` — exits 0, no TypeScript errors.

- [ ] 2. Create `lib/cart-context.tsx` — CartContext with `CartProvider` and `useCart` hook.
      - `"use client"` directive (uses `useState`, `useEffect`).
      - `CartItem` interface re-imported from `./types`.
      - State: `items: CartItem[]`, hydrated from `localStorage` key `oilinga.cart` on mount.
      - Exposed: `addItem(product: Product)` (increments qty if already in cart), `removeItem(slug: string)`, `clearCart()`, `items`, `totalCount` (sum of quantities).
      - `useCart()` throws if called outside `CartProvider`.
      Files: `lib/cart-context.tsx`
      Verify: `yarn build` — exits 0.

- [ ] 3. Update `app/layout.tsx` to wrap children with `CartProvider`.
      Import `CartProvider` from `@/lib/cart-context`. Wrap children so the render order is `ToastProvider → CartProvider → AuthProvider → children`.
      Files: `app/layout.tsx`
      Verify: `yarn build` — exits 0.

- [ ] 4. Update `components/marketplace/AddToCart.tsx` to accept `product: Product` and call `useCart().addItem`.
      - Change prop from `productName: string` to `product: Product` (import `Product` from `@/lib/data`).
      - Call `addItem(product)` from `useCart()` in addition to the existing `notify(...)` call.
      - Derive `product.name` internally for the toast message.
      Files: `components/marketplace/AddToCart.tsx`
      Verify: TypeScript — no errors on this file.

- [ ] 5. Update `app/(site)/products/[slug]/page.tsx` to pass `product={product}` to `<AddToCart>` instead of `productName={product.name}`.
      This is the only call-site of `AddToCart`.
      Files: `app/(site)/products/[slug]/page.tsx`
      Verify: `yarn build` — exits 0, all 12 product pages generated.

- [ ] 6. Fix the hero image in `components/views/HomeView.tsx`.
      - Import `Image` from `next/image`.
      - Replace the `<img src="/assets/brand/oilinga-brand-visual-reference.png" ... />` with `<Image src="/assets/brand/oilinga-brand-visual-reference.png" alt="Oilinga marketplace brand vision" fill style={{ objectFit: 'cover', objectPosition: '42% 55%' }} priority />`.
      - The `.oi-hero__photo` container is `position: absolute` with defined inset — `fill` works correctly in this context.
      - Remove the `filter: saturate(0.94)` attribute from the element (it is already applied by `.oi-hero__photo img` in `app.css`).
      Files: `components/views/HomeView.tsx`
      Verify: `yarn build` — exits 0; no `<img>` tag remaining in HomeView.tsx.

- [ ] 7. Create component shim files: `Header.tsx`, `Footer.tsx`, `SearchBar.tsx`.
      - `components/layout/Header.tsx`: `export { SiteHeader as Header } from './SiteHeader'; export type { } from './SiteHeader';`
      - `components/layout/Footer.tsx`: `export { SiteFooter as Footer } from './SiteFooter';`
      - `components/ui/SearchBar.tsx`: `export { SearchField as SearchBar } from './SearchField'; export type { SearchFieldProps as SearchBarProps } from './SearchField';`
      Files: `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/ui/SearchBar.tsx`
      Verify: `yarn build` — exits 0.

- [ ] 8. Create `components/sections/` directory with four shim files.
      - `components/sections/Hero.tsx`: `export { HomeView as Hero } from '@/components/views/HomeView';`
      - `components/sections/TrustRow.tsx`: `export { TrustRow } from '@/components/marketplace/TrustRow';`
      - `components/sections/CategoryGrid.tsx`: `export { CategoryGrid } from '@/components/marketplace/CategoryGrid';`
      - `components/sections/SellerBanner.tsx`: `export { SellerBanner } from '@/components/marketplace/SellerBanner';`
      Files: `components/sections/Hero.tsx`, `components/sections/TrustRow.tsx`, `components/sections/CategoryGrid.tsx`, `components/sections/SellerBanner.tsx`
      Verify: `yarn build` — exits 0.

- [ ] 9. Create `app/auth/layout.tsx` — site shell wrapper for the `/auth/*` route segment.
      Mirrors `app/(site)/layout.tsx` exactly: imports `SiteHeader` and `SiteFooter`, renders the `.oi-site` shell with skip link, `<SiteHeader />`, `<main id="main-content" className="oi-main">{children}</main>`, and `<SiteFooter />`.
      Files: `app/auth/layout.tsx`
      Verify: `yarn build` — exits 0.

- [ ] 10. Create `app/auth/login/page.tsx` — login page at the `/auth/login` URL.
       Copy the pattern from `app/(site)/login/page.tsx`: read `next` from `searchParams`, render `<AuthForm mode="login" next={next} />`. Add `title: 'Log in'` metadata.
       Files: `app/auth/login/page.tsx`
       Verify: Build output route table includes `/auth/login` (ƒ dynamic).

- [ ] 11. Create `app/auth/signup/page.tsx` — signup page at the `/auth/signup` URL.
       Copy the pattern from `app/(site)/signup/page.tsx`: read `next` from `searchParams`, render `<AuthForm mode="signup" next={next} />`. Add `title: 'Create your account'` metadata.
       Files: `app/auth/signup/page.tsx`
       Verify: Build output route table includes `/auth/signup` (ƒ dynamic).

- [ ] 12. Update `components/layout/SiteHeader.tsx` and `components/auth/AuthForm.tsx` to use the canonical `/auth/*` routes.
       - In `SiteHeader.tsx`: change `href="/login"` → `href="/auth/login"` and `href="/signup"` → `href="/auth/signup"` on the Log in / Sign up `ButtonLink` elements.
       - In `AuthForm.tsx`: change `pathname: "/login"` → `pathname: "/auth/login"` and `pathname: "/signup"` → `pathname: "/auth/signup"` in the `switchHref` object so the toggle links point to the new canonical routes.
       - Do NOT modify or delete `app/(site)/login/page.tsx` or `app/(site)/signup/page.tsx`.
       Files: `components/layout/SiteHeader.tsx`, `components/auth/AuthForm.tsx`
       Verify: `yarn build` — exits 0; route table still includes `/login` and `/signup` from the (site) group alongside the new `/auth/login` and `/auth/signup`.

- [ ] 13. Final build verification.
       Run `yarn build` from `/Users/mac/Desktop/oilinga`. Confirm: exit code 0, TypeScript clean, route table includes all 30+ pages including `/auth/login` and `/auth/signup`, no compilation warnings about missing modules.
       Files: none
       Verify: `cd /Users/mac/Desktop/oilinga && yarn build` — exit 0.

---

## CSS classes reference (for each component)

| Component | CSS classes used |
|---|---|
| `HomeView` hero | `.oi-hero`, `.oi-hero__copy`, `.oi-hero__title`, `.oi-hero__lede`, `.oi-hero__search`, `.oi-hero__actions`, `.oi-hero__proof`, `.oi-hero__photo`, `.oi-popular`, `.oi-popular__label`, `.oi-popular__chip` |
| `TrustRow` | `.oi-trust`, `.oi-trust__item`, `.oi-trust__icon`, `.oi-trust__text`, `.oi-trust__title`, `.oi-trust__caption` |
| `CategoryGrid` | `.oi-category-grid`, `.oi-category-card`, `.oi-category-card__icon`, `.oi-category-card__name`, `.oi-category-card__caption` |
| `SellerBanner` | `.oi-seller-banner`, `.oi-seller-banner__title`, `.oi-seller-banner__lede`, `.oi-seller-banner__mark` |
| `ProductCard` | `.oi-product-card`, `.oi-product-card__art`, `.oi-product-card__art--{palm/refined/kernel/groundnut}`, `.oi-product-card__body`, `.oi-product-card__seller`, `.oi-product-card__name`, `.oi-product-card__meta`, `.oi-product-card__footer`, `.oi-product-card__price`, `.oi-add-btn` |
| `ShopCard` | `.oi-shop-card`, `.oi-shop-card__head`, `.oi-shop-card__mark`, `.oi-shop-card__mark--{palm/refined/kernel/groundnut}`, `.oi-shop-card__title`, `.oi-shop-card__tagline`, `.oi-shop-card__meta`, `.oi-shop-card__footer`, `.oi-shop-card__count` |
| `SiteHeader` | `.oi-site-header`, `.oi-site-header__inner`, `.oi-brand`, `.oi-nav`, `.oi-nav__link`, `.oi-nav__actions`, `.oi-header-actions`, `.oi-menu-toggle`, `.oi-header-account`, `.oi-header-account__avatar` |
| `SiteFooter` | `.oi-site-footer`, `.oi-footer__main`, `.oi-footer__brand`, `.oi-footer__tagline`, `.oi-footer__socials`, `.oi-footer__social`, `.oi-footer__bottom`, `.oi-footer__links` |
| `AuthForm` | `.oi-auth`, `.oi-auth__grid`, `.oi-auth__aside`, `.oi-auth__panel`, `.oi-auth__head`, `.oi-auth__form`, `.oi-auth__error`, `.oi-auth__switch`, `.oi-auth__demo`, `.oi-auth__demo-btn`, `.oi-auth__list`, `.oi-auth__quote`, `.oi-field`, `.oi-field__label`, `.oi-field__error`, `.oi-input`, `.oi-input-wrap`, `.oi-input-action`, `.oi-check` |
| Marketplace page | `.oi-market-layout`, `.oi-filters`, `.oi-filters__group`, `.oi-filters__legend`, `.oi-filters__link`, `.oi-filters__count`, `.oi-filters__divider`, `.oi-price-range`, `.oi-result-bar` |
| Shop storefront | `.oi-storefront`, `.oi-storefront__mark`, `.oi-storefront__intro`, `.oi-storefront__flags`, `.oi-storefront__title`, `.oi-storefront__tagline`, `.oi-storefront__meta`, `.oi-storefront__description`, `.oi-storefront__actions`, `.oi-storefront__stats`, `.oi-storefront__section` |
| Product detail | `.oi-pdp`, `.oi-pdp__media`, `.oi-pdp__media--{art}`, `.oi-pdp__glyph`, `.oi-pdp__tag`, `.oi-pdp__size-badge`, `.oi-pdp__info`, `.oi-pdp__title`, `.oi-pdp__rating`, `.oi-pdp__price-row`, `.oi-pdp__price`, `.oi-pdp__description`, `.oi-pdp__facts`, `.oi-pdp__actions`, `.oi-pdp__assurances`, `.oi-pdp__shop`, `.oi-pdp__back` |
| Seller dashboard | `.oi-dashboard`, `.oi-sidebar`, `.oi-sidebar__link`, `.oi-sidebar__profile`, `.oi-metrics`, `.oi-metric`, `.oi-dash-grid`, `.oi-dash-card`, `.oi-chart`, `.oi-trial-note` |

## TypeScript interfaces (all in `lib/data.ts`, re-exported from `lib/types.ts`)

```typescript
export interface CartItem { product: Product; quantity: number }
export interface AuthUser { name: string; email: string; initials: string; joined: string }
// (AuthUser lives in components/auth/AuthProvider.tsx — not moved, just noted)
```

## Notes on what NOT to do

- Do not add Tailwind utility classes anywhere — the design system is CSS-class only.
- Do not create a new `next.config.js/ts` — none exists and Next.js 16 doesn't require one.
- Do not remove `app/(site)/login` or `app/(site)/signup` — they must remain for backward compatibility.
- Do not change `lib/data.ts` types — only add the `CartItem` interface to `lib/types.ts`.
