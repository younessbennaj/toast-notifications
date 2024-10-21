import { useState } from "react";
import "./App.css";

import { Variant, VARIANT_OPTIONS } from "./constants";
import { useToast } from "./useToast";

function App() {
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState<Variant>("info");

  function handleVariantChange(event: React.ChangeEvent<HTMLInputElement>) {
    setVariant(event.target.value as Variant);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createToast({
      duration: 2000,
      message,
      variant,
    });
  }

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  const { createToast } = useToast();

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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="variant">Variant</label>
          {VARIANT_OPTIONS.map((option) => (
            <div key={option}>
              <input
                id={option}
                type="radio"
                name="variant"
                value={option}
                onChange={handleVariantChange}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
        <button type="submit">Show toast</button>
      </form>
    </main>
  );
}

export default App;
