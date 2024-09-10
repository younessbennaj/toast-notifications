import React from "react";
import Toast from "../Toast";
import styles from "./ToastsContainer.module.css";

function ToastsContainer() {
    const [toasts, setToasts] = React.useState<{
        id: string;
        message: string;
    }[]>([
        {
            id: crypto.randomUUID(),
            message: 'test 1'
        },
        {
            id: crypto.randomUUID(),
            message: 'test 2'
        }
    ]);
    return (
        <ol className={styles.wrapper}>
            {toasts.map((toast) => (
                <li className={styles.toastWrapper} key={toast.id}>
                    <Toast>
                        {toast.message}
                    </Toast>
                </li>
            )
            )}
        </ol>
    )
}

export default ToastsContainer;