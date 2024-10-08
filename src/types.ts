import { Variant } from "./constants";

export type Toast = {
  duration?: number;
  id: string;
  message: string;
  variant: Variant;
};
