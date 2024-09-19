import { VARIANT_OPTIONS } from "./constants";

export type Toast = {
  duration?: number;
  id: string;
  message: string;
  variant: Variant;
};

export type Variant = (typeof VARIANT_OPTIONS)[number];
