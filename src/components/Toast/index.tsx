import { useEffect, useState } from "react";
import styles from "./Toast.module.css";
import { X } from "react-feather";
import { ToastContext } from "../ToastProvider/ToastProvider";
import React from "react";
import {
  COLORS_BY_VARIANT,
  ICONS_BY_VARIANT,
  TOAST_DURATION,
} from "../../constants";
import { Variant } from "../../types";

function Toast({
  duration = TOAST_DURATION,
  id,
  children,
  variant,
}: {
  duration?: number;
  id: string;
  children: React.ReactNode;
  variant: Variant;
}) {
  const Icon = ICONS_BY_VARIANT[variant as keyof typeof ICONS_BY_VARIANT];
  const [loadingPercentage, setLoadingPercentage] = useState<number>(0);

  const { removeToast } = React.useContext(ToastContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingPercentage((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 1;
      });
    }, duration / 100);
    return () => {
      clearInterval(interval);
    };
  }, [duration]);

  return (
    <div className={styles.toast}>
      <Icon color={COLORS_BY_VARIANT[variant].iconColor} />
      <div>
        <p>{children}</p>
        <button
          className={styles.closeButton}
          onClick={() => {
            removeToast(id);
          }}
        >
          <X size={16} />
        </button>
      </div>
      {loadingPercentage < 100 && (
        <div
          className={styles.progressBar}
          style={{
            backgroundColor: COLORS_BY_VARIANT[variant].iconColor,
            width: `${loadingPercentage}%`,
          }}
        />
      )}
    </div>
  );
}

export default Toast;
