import React, { useEffect } from "react";
import "./App.css";
import styles from "./Toast.module.css";

function Toast({
  message,
  onOpenChange,
}: {
  message: string;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const [loadingPercentage, setLoadingPercentage] = React.useState<number>(0);
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
          onClick={() => {
            onOpenChange(false);
          }}
        >
          close
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

function App() {
  const [message, setMessage] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };
  return (
    <main>
      <h1>Toast notifications</h1>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "1rem",
          }}
        >
          <label htmlFor="message">Message</label>
          <textarea
            autoFocus
            id="message"
            name="message"
            onChange={handleTextareaChange}
            value={message}
            rows={5}
          />
        </div>
        <button type="submit">Show toast</button>
      </form>
      {isOpen && <Toast message={message} onOpenChange={setIsOpen} />}
    </main>
  );
}

export default App;
