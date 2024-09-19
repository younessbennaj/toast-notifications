import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Icon,
  Info,
} from "react-feather";

export const TOAST_DURATION = 2000;

export const ICONS_BY_VARIANT: {
  notice: Icon;
  warning: Icon;
  success: Icon;
  error: Icon;
} = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

export const COLORS_BY_VARIANT: {
  [key: string]: {
    background: string;
    iconColor: string;
  };
} = {
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
};

export const VARIANT_OPTIONS = ["info", "success", "warning", "error"];
