import React from "react";
import "./App.css";
import ToastsContainer from "./components/ToastsContainer";

function App() {
  const [message, setMessage] = React.useState("");
  const [toasts, setToasts] = React.useState<{
    id: string;
    message: string;
}[]>([]);

  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setToasts([...toasts, {
      id: crypto.randomUUID(),
      message,
  }])
  };

  function handleRemoveToast (id: string) {
    const newToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(newToasts);
  }

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
       <ToastsContainer toasts={toasts} onRemoveToast={handleRemoveToast} />
    </main>
  );
}

export default App;
