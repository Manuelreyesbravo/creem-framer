// CreemOverrides.tsx — Framer Code Overrides
// Apply to any Framer element to add Creem checkout behavior
// Usage: Select element → Code Overrides → Select this file → Choose override

import { type ComponentType } from "react"
import { createStore } from "https://framer.com/m/framer/store.js@^1.0.0"

// === SHARED STATE ===
const useStore = createStore({
    billing: "monthly" as "monthly" | "yearly",
})

// === CHECKOUT REDIRECT ===
// Apply to any button/element to make it redirect to Creem checkout
// Set the productId via a variable or hardcode it
export function withCreemCheckout(Component: ComponentType): ComponentType {
    return (props: any) => {
        const productId = props["data-product-id"] || props.productId || ""

        return (
            <Component
                {...props}
                onClick={() => {
                    if (productId) {
                        window.open(`https://www.creem.io/payment/${productId}`, "_self")
                    }
                }}
                style={{ ...props.style, cursor: productId ? "pointer" : "default" }}
            />
        )
    }
}

// === BILLING TOGGLE SYNC ===
// Apply to a toggle/button to sync billing state across pricing cards
export function withBillingToggle(Component: ComponentType): ComponentType {
    return (props: any) => {
        const [store, setStore] = useStore()

        return (
            <Component
                {...props}
                variant={store.billing === "yearly" ? "Yearly" : "Monthly"}
                onClick={() => {
                    setStore({
                        billing: store.billing === "monthly" ? "yearly" : "monthly",
                    })
                }}
            />
        )
    }
}

// === MONTHLY PRICE DISPLAY ===
// Apply to a text element to show the monthly price
export function withMonthlyPrice(Component: ComponentType): ComponentType {
    return (props: any) => {
        const [store] = useStore()
        const monthlyPrice = props["data-monthly"] || "29"
        const yearlyPrice = props["data-yearly"] || "24"

        return (
            <Component
                {...props}
                text={`$${store.billing === "monthly" ? monthlyPrice : yearlyPrice}`}
            />
        )
    }
}

// === BILLING PERIOD LABEL ===
// Apply to a text element to show "/mo" or "/yr"
export function withBillingLabel(Component: ComponentType): ComponentType {
    return (props: any) => {
        const [store] = useStore()
        return (
            <Component
                {...props}
                text={store.billing === "monthly" ? "/mo" : "/yr"}
            />
        )
    }
}

// === HOVER GLOW ===
// Apply to any card to add a subtle glow effect on hover
export function withGlowHover(Component: ComponentType): ComponentType {
    return (props: any) => {
        const color = props["data-glow-color"] || "#F97316"

        return (
            <Component
                {...props}
                whileHover={{
                    y: -4,
                    boxShadow: `0 20px 60px ${color}20`,
                    borderColor: `${color}40`,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
        )
    }
}

// === SAVE BADGE VISIBILITY ===
// Apply to "Save 20%" badge — shows only when yearly is selected
export function withYearlySaveBadge(Component: ComponentType): ComponentType {
    return (props: any) => {
        const [store] = useStore()

        return (
            <Component
                {...props}
                animate={{
                    opacity: store.billing === "yearly" ? 1 : 0,
                    scale: store.billing === "yearly" ? 1 : 0.8,
                }}
                transition={{ duration: 0.2 }}
                style={{
                    ...props.style,
                    pointerEvents: store.billing === "yearly" ? "auto" : "none",
                }}
            />
        )
    }
}
