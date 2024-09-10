import { useEffect, useState } from "react";
import styles from "./Toast.module.css";
import { X } from "react-feather";

function Toast({
    children,
  onOpenChange,
}: {
    children: React.ReactNode;
  onOpenChange?: (isOpen: boolean) => void;
}) {
  const [loadingPercentage, setLoadingPercentage] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
        onOpenChange ? onOpenChange(false) : null;
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
        <p>{children}</p>
        <button
          className={styles.closeButton}
          onClick={() => {
            onOpenChange ? onOpenChange(false) : null;
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

export default Toast;