// import { useState } from "react";
import "./App.css";

import { VARIANT_OPTIONS } from "./constants";
import { ToastType } from "./types";
import { useToast } from "./useToast";

const toastMessages = [
  { variant: "info", message: "Your profile has been updated successfully." },
  { variant: "success", message: "You have successfully logged in!" },
  { variant: "error", message: "An error occurred while saving your changes." },
  {
    variant: "warning",
    message: "Your session is about to expire. Please save your work!",
  },
  {
    variant: "info",
    message: "A new version is available. Refresh to update.",
  },
  {
    variant: "success",
    message: "Your password has been changed successfully.",
  },
  {
    variant: "error",
    message: "Failed to connect to the server. Please try again later.",
  },
  {
    variant: "warning",
    message: "Storage almost full! Consider freeing up some space.",
  },
  { variant: "info", message: "You have new notifications waiting." },
  { variant: "success", message: "Your order has been placed successfully!" },
  {
    variant: "error",
    message: "Payment failed. Please check your payment details.",
  },
  {
    variant: "warning",
    message: "Password strength is weak. Consider using a stronger password.",
  },
  { variant: "info", message: "New messages in your inbox." },
  { variant: "success", message: "File uploaded successfully!" },
  { variant: "error", message: "File upload failed. Please try again." },
  {
    variant: "warning",
    message: "You have unsaved changes. Be sure to save before exiting.",
  },
  { variant: "info", message: "Settings updated successfully." },
  { variant: "success", message: "You’ve been subscribed to our newsletter." },
  {
    variant: "error",
    message: "Login attempt failed. Please check your credentials.",
  },
  { variant: "warning", message: "You are nearing your API request limit." },
] as ToastType[];

function getRandomMessage() {
  return toastMessages[Math.floor(Math.random() * toastMessages.length)];
}

function App() {
  // const [message, setMessage] = useState("");
  // const [variant, setVariant] = useState<Variant>("info");

  // function handleVariantChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   setVariant(event.target.value as Variant);
  // }

  // function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   createToast({
  //     duration: 2000,
  //     message,
  //     variant,
  //   });
  // }

  // const handleTextareaChange = (
  //   event: React.ChangeEvent<HTMLTextAreaElement>
  // ) => {
  //   setMessage(event.target.value);
  // };

  const { createToast } = useToast();

  return (
    <main>
      <div
        style={{
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "1rem",
          }}
        >
          ToastJam
        </h1>
        <h2
          style={{
            marginBottom: "2rem",
          }}
        >
          An opinionated toast component for React.
        </h2>
        <button
          className="primary-button"
          onClick={() => createToast(getRandomMessage())}
        >
          Render a toast
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h3>Types</h3>
        <p>
          You can customize the type of toast you want to render, and pass an
          options object as the second argument.
        </p>

        <ul
          style={{
            display: "flex",
            gap: "1rem",
            listStyle: "none",
            padding: 0,
          }}
        >
          {VARIANT_OPTIONS.map((variant) => (
            <li key={variant}>
              <button
                onClick={() =>
                  createToast({
                    variant,
                    duration: 2000,
                    message: `This is a ${variant} toast`,
                  })
                }
              >
                {variant}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* <form onSubmit={handleSubmit}>
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
      </form> */}
    </main>
  );
}

export default App;
