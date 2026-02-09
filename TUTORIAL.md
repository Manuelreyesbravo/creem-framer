# Creem Framer Plugin — Setup Tutorial

## Step 1: Create Your Creem Products

1. Go to [app.creem.io](https://app.creem.io)
2. Navigate to **Products** → **Create Product**
3. Set name, price, billing type (one-time or subscription)
4. Copy the **Product ID** (starts with `prod_`)

> 💡 For pricing tables with monthly/yearly toggle, create TWO products per tier — one monthly, one yearly.

## Step 2: Add Components to Framer

### Option A: Code Component (Recommended)

1. Open your Framer project
2. In the left panel, click **Assets** → **+** → **Code File**
3. Name it `CreemCheckoutButton.tsx`
4. Delete the default code
5. Copy the entire contents of `components/CreemCheckoutButton.tsx` and paste
6. The component now appears in your Assets panel — drag it onto the canvas!

Repeat for `CreemPricingTable.tsx` and `CreemBillingPortal.tsx`.

### Option B: Code Overrides (For custom designs)

1. Create a new Code Override file: **Assets** → **+** → **Code Override**
2. Name it `CreemOverrides.tsx`
3. Paste the contents of `overrides/CreemOverrides.tsx`
4. Select any element on canvas → Properties panel → **Code Override** → Select your override

## Step 3: Configure the Checkout Button

1. Drag `CreemCheckoutButton` onto your canvas
2. In the right panel, you'll see Property Controls:
   - **Product ID**: Paste your `prod_...` ID
   - **Button Text**: "Buy Now", "Subscribe", "Get Started", etc.
   - **Accent Color**: Pick your brand color (default: Creem orange)
   - **Variant**: Choose Filled, Outline, Ghost, or Glass
   - **Size**: Small, Medium, or Large
   - **Glow Effect**: Toggle the hover glow
3. Enable **Test Mode** while developing

## Step 4: Configure the Pricing Table

1. Drag `CreemPricingTable` onto your canvas
2. Configure general settings:
   - **Columns**: 2 or 3 tiers
   - **Rounded**, **Glow Effect**, **Popular Badge**
3. Configure each tier:
   - **Name** & **Description**
   - **Monthly Price** & **Yearly Price**
   - **Product ID (Monthly)** & **Product ID (Yearly)**
   - **Features**: One per line (use `\n` to separate)
   - **Icon**: Any emoji
   - **CTA Text**: Button text for that tier
4. The billing toggle syncs automatically!

## Step 5: Test Your Integration

1. Enable **Test Mode** on all components
2. **Preview** your Framer site (eye icon or ⌘P)
3. Click a checkout button — it should redirect to Creem's test checkout
4. Use test card: `4242 4242 4242 4242`, any future expiry, any CVC
5. Verify the payment appears in your Creem dashboard (Test Mode)

## Step 6: Go Live

1. Disable **Test Mode** on all components
2. Verify your real Product IDs are set
3. **Publish** your Framer site
4. Test with a real small payment ($1)
5. Verify webhook delivery in Creem dashboard

## 🎨 Design Customization Guide

### Colors
Every component accepts `Accent Color` — this drives:
- Button backgrounds and borders
- Pricing card highlights
- Check icons
- Glow effects
- Popular badge

### Typography
Components use `Inter` → `system-ui` → `-apple-system` fallback chain. This matches most Framer sites perfectly. To override, modify the `fontFamily` in the component code.

### Animations
All animations use Framer Motion (built into Framer):
- **Hover lift**: `translateY(-2px)` with spring physics
- **Click ripple**: Radial expansion from click point
- **Glass shimmer**: Rotating conic gradient
- **Price transition**: AnimatePresence for number changes
- **Card hover**: Lift + glow with stiffness: 400, damping: 30

### Responsive
Components use flexbox with `flex-wrap`. In narrow containers:
- Pricing cards stack vertically
- Buttons adapt to container width
- Toggle stays centered

### Accessibility (WCAG 2.1 AA)
- All interactive elements have `role="button"` and `tabIndex={0}`
- ARIA labels on buttons
- Focus visible states
- Color contrast ratios maintained
- Keyboard navigation supported
- Motion respects `prefers-reduced-motion` (via Framer Motion defaults)

## Using Overrides with Custom Designs

If you want to design your own pricing cards but still use Creem checkout:

```tsx
// Apply withCreemCheckout to any button
// Set data-product-id as a variable on the element
// The override reads it and redirects on click
```

1. Design your card in Framer (no code)
2. Add `data-product-id` attribute via Override or Component property
3. Apply `withCreemCheckout` override to the CTA button
4. Apply `withBillingToggle` to your toggle component
5. Apply `withMonthlyPrice` to price text elements

This gives you 100% design freedom with Creem checkout behavior.

---

Built with ❤️ by [LatamFlows](https://latamflows.com) for the Creem community.
