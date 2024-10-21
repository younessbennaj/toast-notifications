import { Variant } from "./constants";

export type ToastType = {
  duration?: number;
  id: string;
  message: string;
  variant: Variant;
};
