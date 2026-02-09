// CreemPricingTable.tsx — Framer Code Component
// Drop this into Framer's code editor. Configure via Property Controls.
// Docs: https://docs.creem.io | Framer: https://framer.com/developers

import { addPropertyControls, ControlType } from "framer"
import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Tier {
    name: string
    description: string
    monthlyPrice: number
    yearlyPrice: number
    productIdMonthly: string
    productIdYearly: string
    features: string
    popular: boolean
    icon: string
    ctaText: string
}

interface Props {
    accentColor: string
    textColor: string
    cardBackground: string
    borderColor: string
    columns: "2" | "3"
    rounded: boolean
    glowEffect: boolean
    showBadge: boolean
    showToggle: boolean
    badgeText: string
    testMode: boolean
    // Tier 1
    tier1Name: string
    tier1Description: string
    tier1MonthlyPrice: number
    tier1YearlyPrice: number
    tier1ProductIdMonthly: string
    tier1ProductIdYearly: string
    tier1Features: string
    tier1Icon: string
    tier1Cta: string
    // Tier 2
    tier2Name: string
    tier2Description: string
    tier2MonthlyPrice: number
    tier2YearlyPrice: number
    tier2ProductIdMonthly: string
    tier2ProductIdYearly: string
    tier2Features: string
    tier2Popular: boolean
    tier2Icon: string
    tier2Cta: string
    // Tier 3
    tier3Name: string
    tier3Description: string
    tier3MonthlyPrice: number
    tier3YearlyPrice: number
    tier3ProductIdMonthly: string
    tier3ProductIdYearly: string
    tier3Features: string
    tier3Icon: string
    tier3Cta: string
    style?: React.CSSProperties
}

const CheckIcon = ({ color }: { color: string }) => (
    <div style={{
        width: 18, height: 18, borderRadius: 99, flexShrink: 0,
        background: `${color}15`,
        display: "flex", alignItems: "center", justifyContent: "center",
    }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
            <path d="M20 6L9 17l-5-5" />
        </svg>
    </div>
)

/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 800
 * @framerIntrinsicHeight 600
 */
export default function CreemPricingTable(props: Props) {
    const {
        accentColor = "#F97316",
        textColor = "#FFFFFF",
        cardBackground = "#111111",
        borderColor = "#1a1a1a",
        columns = "3",
        rounded = true,
        glowEffect = true,
        showBadge = true,
        showToggle = true,
        badgeText = "MOST POPULAR",
        testMode = false,
        style,
        ...tierProps
    } = props

    const [billing, setBilling] = useState<"monthly" | "yearly">("monthly")
    const [hoveredTier, setHoveredTier] = useState<number | null>(null)

    const br = rounded ? 20 : 10

    const tiers: Tier[] = [
        {
            name: tierProps.tier1Name || "Starter",
            description: tierProps.tier1Description || "For individuals",
            monthlyPrice: tierProps.tier1MonthlyPrice ?? 9,
            yearlyPrice: tierProps.tier1YearlyPrice ?? 7,
            productIdMonthly: tierProps.tier1ProductIdMonthly || "",
            productIdYearly: tierProps.tier1ProductIdYearly || "",
            features: tierProps.tier1Features || "1 project\nBasic analytics\nEmail support\n1GB storage",
            popular: false,
            icon: tierProps.tier1Icon || "⚡",
            ctaText: tierProps.tier1Cta || "Get Started",
        },
        {
            name: tierProps.tier2Name || "Pro",
            description: tierProps.tier2Description || "For growing teams",
            monthlyPrice: tierProps.tier2MonthlyPrice ?? 29,
            yearlyPrice: tierProps.tier2YearlyPrice ?? 24,
            productIdMonthly: tierProps.tier2ProductIdMonthly || "",
            productIdYearly: tierProps.tier2ProductIdYearly || "",
            features: tierProps.tier2Features || "10 projects\nAdvanced analytics\nPriority support\n25GB storage\nAPI access",
            popular: tierProps.tier2Popular ?? true,
            icon: tierProps.tier2Icon || "🚀",
            ctaText: tierProps.tier2Cta || "Get Started",
        },
        {
            name: tierProps.tier3Name || "Enterprise",
            description: tierProps.tier3Description || "For organizations",
            monthlyPrice: tierProps.tier3MonthlyPrice ?? 99,
            yearlyPrice: tierProps.tier3YearlyPrice ?? 79,
            productIdMonthly: tierProps.tier3ProductIdMonthly || "",
            productIdYearly: tierProps.tier3ProductIdYearly || "",
            features: tierProps.tier3Features || "Unlimited projects\nCustom analytics\n24/7 dedicated support\nUnlimited storage\nAPI access\nSSO & SAML",
            popular: false,
            icon: tierProps.tier3Icon || "🏢",
            ctaText: tierProps.tier3Cta || "Contact Sales",
        },
    ]

    const displayTiers = columns === "2" ? tiers.slice(0, 2) : tiers

    const handleCheckout = (tier: Tier) => {
        const productId = billing === "monthly" ? tier.productIdMonthly : tier.productIdYearly
        if (!productId) return
        window.open(`https://www.creem.io/payment/${productId}`, "_self")
    }

    return (
        <div style={{
            ...style,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
            width: "100%",
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        }}>
            {/* Billing Toggle */}
            {showToggle && (
                <div style={{
                    display: "inline-flex",
                    background: cardBackground,
                    borderRadius: 999, padding: 3,
                    border: `1px solid ${borderColor}`,
                }}>
                    {(["monthly", "yearly"] as const).map(b => (
                        <motion.button
                            key={b}
                            onClick={() => setBilling(b)}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                padding: "9px 22px", borderRadius: 999, border: "none",
                                background: billing === b ? accentColor : "transparent",
                                color: billing === b ? "#fff" : "#666",
                                fontSize: 13, fontWeight: 500, cursor: "pointer",
                                fontFamily: "inherit",
                                boxShadow: billing === b ? `0 4px 16px ${accentColor}40` : "none",
                                transition: "background 0.3s, color 0.3s, box-shadow 0.3s",
                            }}
                        >
                            {b === "monthly" ? "Monthly" : "Yearly"}
                            {b === "yearly" && (
                                <span style={{
                                    fontSize: 10, marginLeft: 6, fontWeight: 600,
                                    padding: "2px 6px", borderRadius: 99,
                                    background: billing === b ? "rgba(255,255,255,0.2)" : "transparent",
                                }}>
                                    SAVE 20%
                                </span>
                            )}
                        </motion.button>
                    ))}
                </div>
            )}

            {/* Tiers Grid */}
            <div style={{
                display: "flex", gap: 16, width: "100%",
                justifyContent: "center", flexWrap: "wrap",
            }}>
                {displayTiers.map((tier, i) => {
                    const isHovered = hoveredTier === i
                    const isPopular = tier.popular && showBadge
                    const features = tier.features.split("\n").filter(Boolean)
                    const price = billing === "monthly" ? tier.monthlyPrice : tier.yearlyPrice

                    return (
                        <motion.div
                            key={tier.name}
                            onMouseEnter={() => setHoveredTier(i)}
                            onMouseLeave={() => setHoveredTier(null)}
                            animate={{ y: isHovered ? -6 : 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            style={{
                                flex: `0 1 ${columns === "2" ? "320px" : "260px"}`,
                                background: isPopular
                                    ? `linear-gradient(170deg, ${accentColor}10 0%, ${cardBackground} 40%, ${accentColor}05 100%)`
                                    : `linear-gradient(170deg, ${cardBackground} 0%, #0a0a0a 100%)`,
                                border: isPopular
                                    ? `1.5px solid ${accentColor}40`
                                    : `1px solid ${isHovered ? "#333" : borderColor}`,
                                borderRadius: br, padding: 28,
                                display: "flex", flexDirection: "column", gap: 20,
                                boxShadow: isHovered
                                    ? (glowEffect && isPopular
                                        ? `0 20px 60px ${accentColor}20, 0 0 0 1px ${accentColor}30`
                                        : "0 20px 60px rgba(0,0,0,0.4)")
                                    : "0 2px 8px rgba(0,0,0,0.2)",
                                position: "relative",
                                transition: "border-color 0.3s, box-shadow 0.3s",
                            }}
                        >
                            {/* Popular Badge */}
                            {isPopular && (
                                <div style={{
                                    position: "absolute", top: -11, left: "50%",
                                    transform: "translateX(-50%)",
                                    background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                                    color: "#fff", fontSize: 10, fontWeight: 700,
                                    padding: "4px 14px", borderRadius: 999,
                                    letterSpacing: "0.08em",
                                    boxShadow: `0 4px 12px ${accentColor}40`,
                                    fontFamily: "inherit",
                                }}>
                                    {badgeText}
                                </div>
                            )}

                            {/* Header */}
                            <div>
                                <div style={{ fontSize: 20, marginBottom: 4 }}>{tier.icon}</div>
                                <div style={{
                                    color: textColor, fontSize: 18, fontWeight: 700,
                                    letterSpacing: "-0.02em",
                                }}>
                                    {tier.name}
                                </div>
                                <div style={{ color: "#555", fontSize: 12, marginTop: 2 }}>
                                    {tier.description}
                                </div>
                            </div>

                            {/* Price */}
                            <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                                <span style={{ color: "#555", fontSize: 18, fontWeight: 500 }}>$</span>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={price}
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -10, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            color: textColor, fontSize: 42, fontWeight: 800,
                                            letterSpacing: "-0.03em", lineHeight: 1,
                                        }}
                                    >
                                        {price}
                                    </motion.span>
                                </AnimatePresence>
                                <span style={{ color: "#444", fontSize: 13, marginLeft: 2 }}>/mo</span>
                            </div>

                            {/* Divider */}
                            <div style={{
                                width: "100%", height: 1,
                                background: "linear-gradient(90deg, transparent, #222, transparent)",
                            }} />

                            {/* Features */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                                {features.map(f => (
                                    <div key={f} style={{
                                        display: "flex", alignItems: "center", gap: 10,
                                        color: "#999", fontSize: 13,
                                    }}>
                                        <CheckIcon color={accentColor} />
                                        {f}
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={() => handleCheckout(tier)}
                                style={{
                                    width: "100%", padding: "13px 0",
                                    borderRadius: rounded ? 999 : 10,
                                    border: isPopular ? "none" : `1.5px solid ${isHovered ? accentColor : accentColor + "30"}`,
                                    background: isPopular
                                        ? `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`
                                        : (isHovered ? `${accentColor}10` : "transparent"),
                                    color: isPopular ? "#fff" : accentColor,
                                    fontSize: 14, fontWeight: 600, cursor: "pointer",
                                    fontFamily: "inherit",
                                    boxShadow: isPopular && isHovered ? `0 8px 24px ${accentColor}40` : "none",
                                    letterSpacing: "-0.01em",
                                    transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
                                }}
                            >
                                {tier.ctaText} →
                            </motion.button>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}

CreemPricingTable.defaultProps = {
    accentColor: "#F97316",
    textColor: "#FFFFFF",
    cardBackground: "#111111",
    borderColor: "#1a1a1a",
    columns: "3",
    rounded: true,
    glowEffect: true,
    showBadge: true,
    showToggle: true,
    badgeText: "MOST POPULAR",
    testMode: false,
    tier1Name: "Starter",
    tier1Description: "For individuals",
    tier1MonthlyPrice: 9,
    tier1YearlyPrice: 7,
    tier1ProductIdMonthly: "",
    tier1ProductIdYearly: "",
    tier1Features: "1 project\nBasic analytics\nEmail support\n1GB storage",
    tier1Icon: "⚡",
    tier1Cta: "Get Started",
    tier2Name: "Pro",
    tier2Description: "For growing teams",
    tier2MonthlyPrice: 29,
    tier2YearlyPrice: 24,
    tier2ProductIdMonthly: "",
    tier2ProductIdYearly: "",
    tier2Features: "10 projects\nAdvanced analytics\nPriority support\n25GB storage\nAPI access",
    tier2Popular: true,
    tier2Icon: "🚀",
    tier2Cta: "Get Started",
    tier3Name: "Enterprise",
    tier3Description: "For organizations",
    tier3MonthlyPrice: 99,
    tier3YearlyPrice: 79,
    tier3ProductIdMonthly: "",
    tier3ProductIdYearly: "",
    tier3Features: "Unlimited projects\nCustom analytics\n24/7 dedicated support\nUnlimited storage\nAPI access\nSSO & SAML",
    tier3Icon: "🏢",
    tier3Cta: "Contact Sales",
}

addPropertyControls(CreemPricingTable, {
    // === GENERAL ===
    accentColor: { type: ControlType.Color, title: "Accent Color", defaultValue: "#F97316" },
    textColor: { type: ControlType.Color, title: "Text Color", defaultValue: "#FFFFFF" },
    cardBackground: { type: ControlType.Color, title: "Card Background", defaultValue: "#111111" },
    borderColor: { type: ControlType.Color, title: "Border Color", defaultValue: "#1a1a1a" },
    columns: {
        type: ControlType.Enum, title: "Columns",
        options: ["2", "3"], optionTitles: ["2 Tiers", "3 Tiers"], defaultValue: "3",
    },
    rounded: { type: ControlType.Boolean, title: "Rounded", defaultValue: true },
    glowEffect: { type: ControlType.Boolean, title: "Glow Effect", defaultValue: true },
    showBadge: { type: ControlType.Boolean, title: "Popular Badge", defaultValue: true },
    showToggle: { type: ControlType.Boolean, title: "Billing Toggle", defaultValue: true },
    badgeText: { type: ControlType.String, title: "Badge Text", defaultValue: "MOST POPULAR" },
    testMode: { type: ControlType.Boolean, title: "Test Mode", defaultValue: false },

    // === TIER 1 ===
    tier1Name: { type: ControlType.String, title: "① Name", defaultValue: "Starter" },
    tier1Description: { type: ControlType.String, title: "① Description", defaultValue: "For individuals" },
    tier1MonthlyPrice: { type: ControlType.Number, title: "① Monthly $", defaultValue: 9, min: 0, step: 1 },
    tier1YearlyPrice: { type: ControlType.Number, title: "① Yearly $", defaultValue: 7, min: 0, step: 1 },
    tier1ProductIdMonthly: { type: ControlType.String, title: "① Product ID (Monthly)", placeholder: "prod_..." },
    tier1ProductIdYearly: { type: ControlType.String, title: "① Product ID (Yearly)", placeholder: "prod_..." },
    tier1Features: { type: ControlType.String, title: "① Features (\\n separated)", defaultValue: "1 project\nBasic analytics\nEmail support\n1GB storage" },
    tier1Icon: { type: ControlType.String, title: "① Icon", defaultValue: "⚡" },
    tier1Cta: { type: ControlType.String, title: "① CTA Text", defaultValue: "Get Started" },

    // === TIER 2 ===
    tier2Name: { type: ControlType.String, title: "② Name", defaultValue: "Pro" },
    tier2Description: { type: ControlType.String, title: "② Description", defaultValue: "For growing teams" },
    tier2MonthlyPrice: { type: ControlType.Number, title: "② Monthly $", defaultValue: 29, min: 0, step: 1 },
    tier2YearlyPrice: { type: ControlType.Number, title: "② Yearly $", defaultValue: 24, min: 0, step: 1 },
    tier2ProductIdMonthly: { type: ControlType.String, title: "② Product ID (Monthly)", placeholder: "prod_..." },
    tier2ProductIdYearly: { type: ControlType.String, title: "② Product ID (Yearly)", placeholder: "prod_..." },
    tier2Features: { type: ControlType.String, title: "② Features (\\n separated)", defaultValue: "10 projects\nAdvanced analytics\nPriority support\n25GB storage\nAPI access" },
    tier2Popular: { type: ControlType.Boolean, title: "② Popular", defaultValue: true },
    tier2Icon: { type: ControlType.String, title: "② Icon", defaultValue: "🚀" },
    tier2Cta: { type: ControlType.String, title: "② CTA Text", defaultValue: "Get Started" },

    // === TIER 3 ===
    tier3Name: { type: ControlType.String, title: "③ Name", defaultValue: "Enterprise" },
    tier3Description: { type: ControlType.String, title: "③ Description", defaultValue: "For organizations" },
    tier3MonthlyPrice: { type: ControlType.Number, title: "③ Monthly $", defaultValue: 99, min: 0, step: 1 },
    tier3YearlyPrice: { type: ControlType.Number, title: "③ Yearly $", defaultValue: 79, min: 0, step: 1 },
    tier3ProductIdMonthly: { type: ControlType.String, title: "③ Product ID (Monthly)", placeholder: "prod_..." },
    tier3ProductIdYearly: { type: ControlType.String, title: "③ Product ID (Yearly)", placeholder: "prod_..." },
    tier3Features: { type: ControlType.String, title: "③ Features (\\n separated)", defaultValue: "Unlimited projects\nCustom analytics\n24/7 dedicated support\nUnlimited storage\nAPI access\nSSO & SAML" },
    tier3Icon: { type: ControlType.String, title: "③ Icon", defaultValue: "🏢" },
    tier3Cta: { type: ControlType.String, title: "③ CTA Text", defaultValue: "Contact Sales" },
})
