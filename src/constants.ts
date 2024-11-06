import { AlertOctagon, AlertTriangle, CheckCircle, Info } from "react-feather";
import { ToastType } from "./types";

export const DEFAULT_TOAST_DURATION = 10000;

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

export const TOAST_MESSAGES = [
  { variant: "info", message: "Your profile has been updated successfully." },
  { variant: "success", message: "You have successfully logged in!" },
  { variant: "error", message: "An error occurred while saving your changes." },
  {
    variant: "warning",
    message: "Your session is about to expire. Please save your work!",
  },
  {
    variant: "info",
    message: "A new version is available. Refresh to update.",
  },
  {
    variant: "success",
    message: "Your password has been changed successfully.",
  },
  {
    variant: "error",
    message: "Failed to connect to the server. Please try again later.",
  },
  {
    variant: "warning",
    message: "Storage almost full! Consider freeing up some space.",
  },
  { variant: "info", message: "You have new notifications waiting." },
  { variant: "success", message: "Your order has been placed successfully!" },
  {
    variant: "error",
    message: "Payment failed. Please check your payment details.",
  },
  {
    variant: "warning",
    message: "Password strength is weak. Consider using a stronger password.",
  },
  { variant: "info", message: "New messages in your inbox." },
  { variant: "success", message: "File uploaded successfully!" },
  { variant: "error", message: "File upload failed. Please try again." },
  {
    variant: "warning",
    message: "You have unsaved changes. Be sure to save before exiting.",
  },
  { variant: "info", message: "Settings updated successfully." },
  { variant: "success", message: "You’ve been subscribed to our newsletter." },
  {
    variant: "error",
    message: "Login attempt failed. Please check your credentials.",
  },
  { variant: "warning", message: "You are nearing your API request limit." },
] as ToastType[];

// any key of COLORS_BY_VARIANT
export const VARIANT_OPTIONS = Object.keys(COLORS_BY_VARIANT) as Array<Variant>;

export type Variant = keyof typeof COLORS_BY_VARIANT;
