// CreemCheckoutButton.tsx — Framer Code Component
// Drop this into Framer's code editor. Configure via Property Controls.
// Docs: https://docs.creem.io | Framer: https://framer.com/developers

import { addPropertyControls, ControlType } from "framer"
import { useState, useRef, useCallback } from "react"
import { motion, type Variants } from "framer-motion"

interface Props {
    productId: string
    text: string
    accentColor: string
    textColor: string
    variant: "filled" | "outline" | "ghost" | "glass"
    size: "small" | "medium" | "large"
    rounded: boolean
    showIcon: boolean
    showArrow: boolean
    glowEffect: boolean
    successUrl: string
    testMode: boolean
    style?: React.CSSProperties
}

const SIZES = {
    small:  { px: 20, py: 11, fs: 13, icon: 14, gap: 6 },
    medium: { px: 28, py: 14, fs: 15, icon: 16, gap: 8 },
    large:  { px: 36, py: 17, fs: 16, icon: 18, gap: 9 },
}

const ShoppingIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.9 }}>
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
    </svg>
)

const ArrowIcon = ({ hovered }: { hovered: boolean }) => (
    <motion.svg
        width={13} height={13} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        animate={{ x: hovered ? 3 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={{ opacity: 0.8 }}
    >
        <path d="M5 12h14M12 5l7 7-7 7" />
    </motion.svg>
)

/**
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 180
 * @framerIntrinsicHeight 48
 */
export default function CreemCheckoutButton(props: Props) {
    const {
        productId = "",
        text = "Buy Now",
        accentColor = "#F97316",
        textColor = "#FFFFFF",
        variant = "filled",
        size = "medium",
        rounded = true,
        showIcon = true,
        showArrow = true,
        glowEffect = true,
        successUrl = "",
        testMode = false,
        style,
    } = props

    const [hovered, setHovered] = useState(false)
    const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null)
    const btnRef = useRef<HTMLDivElement>(null)

    const s = SIZES[size] || SIZES.medium
    const br = rounded ? 999 : 12

    const getVariantStyles = useCallback(() => {
        const base = {
            filled: {
                bg: accentColor,
                border: "none",
                color: textColor,
                hoverBg: accentColor,
                shadow: glowEffect
                    ? (hovered ? `0 0 0 1px ${accentColor}40, 0 12px 40px -8px ${accentColor}50` : `0 0 0 1px ${accentColor}20, 0 4px 16px -4px ${accentColor}30`)
                    : `0 2px 8px ${accentColor}20`,
            },
            outline: {
                bg: hovered ? `${accentColor}12` : "transparent",
                border: `1.5px solid ${hovered ? accentColor : accentColor + "60"}`,
                color: accentColor,
                shadow: glowEffect && hovered ? `0 0 24px ${accentColor}20` : "none",
            },
            ghost: {
                bg: hovered ? `${accentColor}10` : "transparent",
                border: "1.5px solid transparent",
                color: accentColor,
                shadow: "none",
            },
            glass: {
                bg: hovered ? `${accentColor}20` : `${accentColor}10`,
                border: `1px solid ${accentColor}30`,
                color: textColor,
                shadow: glowEffect
                    ? `0 8px 32px ${accentColor}15, inset 0 1px 0 ${accentColor}20`
                    : `inset 0 1px 0 ${accentColor}15`,
            },
        }
        return base[variant] || base.filled
    }, [variant, accentColor, textColor, glowEffect, hovered])

    const v = getVariantStyles()

    const handleClick = (e: React.MouseEvent) => {
        // Ripple
        if (btnRef.current) {
            const rect = btnRef.current.getBoundingClientRect()
            setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() })
            setTimeout(() => setRipple(null), 600)
        }

        // Checkout redirect
        if (!productId) return
        const baseUrl = testMode ? "https://test-api.creem.io" : "https://api.creem.io"
        const checkoutUrl = `https://www.creem.io/payment/${productId}`
        window.open(checkoutUrl, "_self")
    }

    return (
        <motion.div
            ref={btnRef}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleClick}
            whileTap={{ scale: 0.96 }}
            animate={{ y: hovered ? -2 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            role="button"
            tabIndex={0}
            aria-label={text}
            style={{
                ...style,
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: s.gap,
                padding: `${s.py}px ${s.px}px`,
                background: v.bg,
                color: v.color,
                border: v.border,
                borderRadius: br,
                fontSize: s.fs,
                fontWeight: 600,
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                cursor: productId ? "pointer" : "default",
                overflow: "hidden",
                letterSpacing: "-0.01em",
                boxShadow: v.shadow,
                userSelect: "none",
                WebkitTapHighlightColor: "transparent",
            }}
        >
            {/* Glass shimmer */}
            {variant === "glass" && hovered && (
                <div style={{
                    position: "absolute", inset: 0, borderRadius: "inherit",
                    overflow: "hidden", pointerEvents: "none",
                }}>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        style={{
                            position: "absolute", top: "-50%", left: "-50%",
                            width: "200%", height: "200%",
                            background: `conic-gradient(from 0deg, transparent, ${accentColor}30, transparent, ${accentColor}15, transparent)`,
                        }}
                    />
                </div>
            )}

            {/* Ripple */}
            {ripple && (
                <motion.span
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{
                        position: "absolute",
                        left: ripple.x - 60,
                        top: ripple.y - 60,
                        width: 120, height: 120,
                        borderRadius: "50%",
                        background: `${textColor}15`,
                        pointerEvents: "none",
                    }}
                />
            )}

            {showIcon && <ShoppingIcon size={s.icon} />}
            <span style={{ position: "relative", zIndex: 1 }}>{text}</span>
            {showArrow && <ArrowIcon hovered={hovered} />}
        </motion.div>
    )
}

CreemCheckoutButton.defaultProps = {
    productId: "",
    text: "Buy Now",
    accentColor: "#F97316",
    textColor: "#FFFFFF",
    variant: "filled",
    size: "medium",
    rounded: true,
    showIcon: true,
    showArrow: true,
    glowEffect: true,
    successUrl: "",
    testMode: false,
}

addPropertyControls(CreemCheckoutButton, {
    productId: {
        type: ControlType.String,
        title: "Product ID",
        description: "Creem product ID (e.g. prod_abc123)",
        placeholder: "prod_...",
    },
    text: {
        type: ControlType.String,
        title: "Button Text",
        defaultValue: "Buy Now",
    },
    accentColor: {
        type: ControlType.Color,
        title: "Accent Color",
        defaultValue: "#F97316",
    },
    textColor: {
        type: ControlType.Color,
        title: "Text Color",
        defaultValue: "#FFFFFF",
    },
    variant: {
        type: ControlType.Enum,
        title: "Variant",
        options: ["filled", "outline", "ghost", "glass"],
        optionTitles: ["Filled", "Outline", "Ghost", "Glass"],
        defaultValue: "filled",
    },
    size: {
        type: ControlType.Enum,
        title: "Size",
        options: ["small", "medium", "large"],
        optionTitles: ["Small", "Medium", "Large"],
        defaultValue: "medium",
    },
    rounded: {
        type: ControlType.Boolean,
        title: "Fully Rounded",
        defaultValue: true,
    },
    showIcon: {
        type: ControlType.Boolean,
        title: "Shopping Icon",
        defaultValue: true,
    },
    showArrow: {
        type: ControlType.Boolean,
        title: "Arrow",
        defaultValue: true,
    },
    glowEffect: {
        type: ControlType.Boolean,
        title: "Glow Effect",
        defaultValue: true,
    },
    successUrl: {
        type: ControlType.String,
        title: "Success URL",
        description: "Redirect after payment (optional)",
        placeholder: "https://yoursite.com/thanks",
    },
    testMode: {
        type: ControlType.Boolean,
        title: "Test Mode",
        defaultValue: false,
        description: "Use Creem sandbox environment",
    },
})
