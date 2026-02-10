// CreemBillingPortal.tsx — Framer Code Component
// Button to open Creem customer billing portal
// Docs: https://docs.creem.io

import { addPropertyControls, ControlType } from "framer"
import { useState } from "react"
import { motion } from "framer-motion"

interface Props {
    customerId: string
    text: string
    accentColor: string
    textColor: string
    variant: "filled" | "outline" | "ghost"
    size: "small" | "medium" | "large"
    rounded: boolean
    returnUrl: string
    testMode: boolean
    apiKey: string
    style?: React.CSSProperties
}

const SIZES = {
    small: { px: 16, py: 9, fs: 12, icon: 13 },
    medium: { px: 22, py: 12, fs: 14, icon: 15 },
    large: { px: 30, py: 15, fs: 15, icon: 16 },
}

const SettingsIcon = ({ size }: { size: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
)

/**
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 200
 * @framerIntrinsicHeight 44
 */
export default function CreemBillingPortal(props: Props) {
    const {
        customerId = "",
        text = "Manage Subscription",
        accentColor = "#F97316",
        textColor = "#FFFFFF",
        variant = "outline",
        size = "medium",
        rounded = true,
        returnUrl = "",
        testMode = false,
        apiKey = "",
        style,
    } = props

    const [hovered, setHovered] = useState(false)
    const [loading, setLoading] = useState(false)

    const s = SIZES[size] || SIZES.medium
    const br = rounded ? 999 : 10

    const variants = {
        filled: {
            bg: accentColor,
            border: "none",
            color: textColor,
        },
        outline: {
            bg: hovered ? `${accentColor}10` : "transparent",
            border: `1.5px solid ${hovered ? accentColor : accentColor + "50"}`,
            color: accentColor,
        },
        ghost: {
            bg: hovered ? `${accentColor}08` : "transparent",
            border: "1.5px solid transparent",
            color: accentColor,
        },
    }

    const v = variants[variant] || variants.outline

    const handleClick = async () => {
        if (!customerId || !apiKey) return
        setLoading(true)

        try {
            const baseUrl = testMode
                ? "https://test-api.creem.io"
                : "https://api.creem.io"
            const res = await fetch(`${baseUrl}/v1/customers/billing`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": apiKey,
                },
                body: JSON.stringify({
                    customer_id: customerId,
                    ...(returnUrl ? { return_url: returnUrl } : {}),
                }),
            })
            const data = await res.json()
            if (data.portal_url) {
                window.open(data.portal_url, "_self")
            }
        } catch (err) {
            console.error("Creem billing portal error:", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleClick}
            whileTap={{ scale: 0.97 }}
            role="button"
            tabIndex={0}
            aria-label={text}
            style={{
                ...style,
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: `${s.py}px ${s.px}px`,
                background: v.bg,
                color: v.color,
                border: v.border,
                borderRadius: br,
                fontSize: s.fs,
                fontWeight: 500,
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                cursor: customerId && apiKey ? "pointer" : "default",
                opacity: loading ? 0.7 : 1,
                letterSpacing: "-0.01em",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                userSelect: "none",
            }}
        >
            {loading ? (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        width: s.icon,
                        height: s.icon,
                        border: `2px solid ${v.color}30`,
                        borderTopColor: v.color,
                        borderRadius: "50%",
                    }}
                />
            ) : (
                <SettingsIcon size={s.icon} />
            )}
            {text}
        </motion.div>
    )
}

CreemBillingPortal.defaultProps = {
    customerId: "",
    text: "Manage Subscription",
    accentColor: "#F97316",
    textColor: "#FFFFFF",
    variant: "outline" as const,
    size: "medium" as const,
    rounded: true,
    returnUrl: "",
    testMode: false,
    apiKey: "",
}

addPropertyControls(CreemBillingPortal, {
    customerId: {
        type: ControlType.String,
        title: "Customer ID",
        description: "Creem customer ID (cust_...)",
        placeholder: "cust_...",
    },
    text: {
        type: ControlType.String,
        title: "Button Text",
        defaultValue: "Manage Subscription",
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
        options: ["filled", "outline", "ghost"],
        optionTitles: ["Filled", "Outline", "Ghost"],
        defaultValue: "outline",
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
        title: "Rounded",
        defaultValue: true,
    },
    returnUrl: {
        type: ControlType.String,
        title: "Return URL",
        description: "Where to redirect after managing billing",
        placeholder: "https://yoursite.com/dashboard",
    },
    testMode: {
        type: ControlType.Boolean,
        title: "Test Mode",
        defaultValue: false,
    },
    apiKey: {
        type: ControlType.String,
        title: "API Key",
        description: "⚠️ Client-side only. Use server-side for production.",
        placeholder: "creem_...",
    },
})
