import { Variant } from "./constants";

export type ToastType = {
  duration?: number;
  id: string;
  message: string;
  variant: Variant;
};

export type PositionType =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";
