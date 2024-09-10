import React from "react";
import "./App.css";
import Toast from "./components/Toast";
import ToastsContainer from "./components/ToastsContainer";

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
      {/* {isOpen && <Toast message={message} onOpenChange={setIsOpen} />}
       */}
       <ToastsContainer />
    </main>
  );
}

export default App;
