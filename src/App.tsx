import React from "react";
import "./App.css";
import ToastsContainer from "./components/ToastsContainer";
import { ToastContext } from "./components/ToastProvider/ToastProvider";

function App() {
  const [message, setMessage] = React.useState("");

  const {createToast} = React.useContext(ToastContext);

  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createToast(message);
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
       <ToastsContainer />
    </main>
  );
}

export default App;
