import { AlertOctagon, AlertTriangle, CheckCircle, Info } from "react-feather";

export const TOAST_DURATION = 10000;

export const ICONS_BY_VARIANT = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
} as const;

export const COLORS_BY_VARIANT = {
  info: {
    background: "#bfdbfe",
    iconColor: "#2563eb",
  },
  warning: {
    background: "#fed7aa",
    iconColor: "#ea580c",
  },
  success: {
    background: "#bbf7d0",
    iconColor: "#16a34a",
  },
  error: {
    background: "#fecaca",
    iconColor: "#dc2626",
  },
} as const;

// any key of COLORS_BY_VARIANT
export const VARIANT_OPTIONS = Object.keys(COLORS_BY_VARIANT) as Array<Variant>;

export type Variant = keyof typeof COLORS_BY_VARIANT;
