import styles from "./Toast.module.css";
import { X } from "react-feather";

import React from "react";
import { COLORS_BY_VARIANT, ICONS_BY_VARIANT, Variant } from "../../constants";

function Toast({
  children,
  variant,
  onRemove,
}: {
  duration?: number;
  id: string;
  children: React.ReactNode;
  variant: Variant;
  onRemove?: () => void;
}) {
  const Icon = ICONS_BY_VARIANT[variant];

  return (
    <div className={styles.toast}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon color={COLORS_BY_VARIANT[variant].iconColor} size={16} />
      </div>

      <div>
        <span>{children}</span>
        <button
          className={styles.closeButton}
          onClick={() => {
            if (onRemove) {
              onRemove();
            }
          }}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

export default Toast;
