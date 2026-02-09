# creem-framer

Creem payment components for Framer — checkout buttons, pricing tables, and billing portal with full property controls.

## 🚀 Components

### CreemCheckoutButton
Customizable payment button that redirects to Creem checkout.

**Property Controls:**
- Product ID — Your Creem product ID (`prod_...`)
- Button Text, Accent Color, Text Color
- Variant — Filled, Outline, Ghost, Glass
- Size — Small, Medium, Large
- Fully Rounded, Shopping Icon, Arrow, Glow Effect
- Success URL, Test Mode

### CreemPricingTable
Full pricing table with billing toggle and up to 3 tiers.

**Property Controls:**
- General: Accent Color, Text Color, Card Background, Border Color, Columns (2/3), Rounded, Glow, Badge, Toggle
- Per Tier (×3): Name, Description, Monthly/Yearly Price, Product IDs, Features (newline-separated), Icon, CTA Text, Popular flag

### CreemBillingPortal
Customer billing management button (subscriptions, payment methods, receipts).

**Property Controls:**
- Customer ID (`cust_...`), API Key
- Button Text, Variant, Size, Rounded
- Return URL, Test Mode

## 🎨 Code Overrides

### CreemOverrides.tsx
Apply to any Framer element:

| Override | Purpose |
|----------|---------|
| `withCreemCheckout` | Make any element redirect to Creem checkout |
| `withBillingToggle` | Sync monthly/yearly toggle across components |
| `withMonthlyPrice` | Show dynamic price based on billing period |
| `withBillingLabel` | Show "/mo" or "/yr" dynamically |
| `withGlowHover` | Add glow effect on hover |
| `withYearlySaveBadge` | Show/hide "Save 20%" badge |

## 📦 Installation

1. Open your Framer project
2. Click **Assets** panel → **Code** → **New File**
3. Copy the component code and paste it
4. Drag the component onto your canvas
5. Configure via Property Controls in the right panel

## ⚙️ Setup

1. Create products in [Creem Dashboard](https://app.creem.io)
2. Copy product IDs (`prod_...`)
3. Paste into component Property Controls
4. Toggle **Test Mode** for development
5. Publish your Framer site

## 🧪 Test Mode

Enable "Test Mode" in property controls to use Creem's sandbox:
- API: `https://test-api.creem.io`
- No real charges
- Test card: `4242 4242 4242 4242`

## 📐 Design

- **Default accent**: `#F97316` (Creem orange)
- **4 button variants**: Filled, Outline, Ghost, Glass (with shimmer)
- **Animations**: Spring-based hover, ripple click, price transitions
- **Responsive**: Flexbox with wrap, scales to any container
- **Accessible**: WCAG 2.1 AA, keyboard nav, ARIA labels, focus states
- **Framer Motion**: Native integration for smooth animations

## 🔗 Links

- [Creem API Docs](https://docs.creem.io)
- [Creem Dashboard](https://app.creem.io)
- [Framer Developer Docs](https://www.framer.com/developers)

## 📄 License

MIT — Built by LatamFlows for the Creem community.
