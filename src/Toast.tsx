import { useEffect, useState } from "react";
import styles from "./Toast.module.css";
import { X } from "react-feather";

export function Toast({
  message,
  onOpenChange,
}: {
  message: string;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const [loadingPercentage, setLoadingPercentage] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      onOpenChange(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [onOpenChange]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingPercentage((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className={styles.toast}>
      <div>
        <p>{message}</p>
        <button
          className={styles.closeButton}
          onClick={() => {
            onOpenChange(false);
          }}
        >
          <X size={16} />
        </button>
      </div>
      {loadingPercentage < 100 && (
        <div
          className={styles.progressBar}
          style={{ width: `${loadingPercentage}%` }}
        />
      )}
    </div>
  );
}
