import { useState } from "react";
import "./App.css";

import { TOAST_MESSAGES, VARIANT_OPTIONS } from "./constants";
import { useToast } from "./useToast";
import { PositionType } from "./types";
import ToastProvider from "./components/ToastProvider/ToastProvider";

function getRandomMessage() {
  return TOAST_MESSAGES[Math.floor(Math.random() * TOAST_MESSAGES.length)];
}

function ToastCreator() {
  const { createToast } = useToast();

  return (
    <button
      className="primary-button"
      onClick={() => createToast(getRandomMessage())}
    >
      Render a toast
    </button>
  );
}

function ToastTypes() {
  const { createToast } = useToast();

  return (
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
          flexWrap: "wrap",
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
  );
}

function ToastsPosition({
  onPositionChange,
}: {
  onPositionChange: (position: PositionType) => void;
}) {
  return (
    <div className="toasts-position">
      <h3>Position</h3>
      <p>Swipe direction changes depending on the position.</p>

      <ul
        style={{
          display: "flex",
          gap: "1rem",
          listStyle: "none",
          padding: 0,
          flexWrap: "wrap",
        }}
      >
        {[
          "top-left",
          "top-right",
          "bottom-left",
          "bottom-right",
          "top-center",
          "bottom-center",
        ].map((pos) => (
          <li key={pos}>
            <button onClick={() => onPositionChange(pos as PositionType)}>
              {pos}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [position, setPosition] = useState<PositionType>("top-right");

  return (
    <ToastProvider position={position}>
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
            My opinionated toast component.
          </h2>
          <ToastCreator />
        </div>
        <ToastTypes />
        <ToastsPosition
          onPositionChange={(pos) => {
            setPosition(pos);
          }}
        />
      </main>
    </ToastProvider>
  );
}

export default App;
