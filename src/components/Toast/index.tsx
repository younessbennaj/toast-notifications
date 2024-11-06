import styles from "./Toast.module.css";
import { X } from "react-feather";

import React, { useEffect } from "react";
import { COLORS_BY_VARIANT, ICONS_BY_VARIANT, Variant } from "../../constants";

function Toast({
  id,
  children,
  variant,
  onRemove,
}: {
  duration?: number;
  id: string;
  children: React.ReactNode;
  variant: Variant;
  onRemove?: (id: string) => void;
}) {
  const Icon = ICONS_BY_VARIANT[variant];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onRemove) {
        onRemove(id);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [onRemove, id]);

  return (
    <div className={styles.toast}>
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          padding: "16px 0px 16px 16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon color={COLORS_BY_VARIANT[variant].iconColor} size={16} />
        </div>
        <span>{children}</span>
      </div>
      <button
        className={styles.closeButton}
        onClick={() => {
          if (onRemove) {
            onRemove(id);
          }
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default Toast;
