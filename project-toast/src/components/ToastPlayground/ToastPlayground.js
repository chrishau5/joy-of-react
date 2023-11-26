import React, { useState } from "react";

import Button from "../Button";
import ToastShelf from "../ToastShelf";

import styles from "./ToastPlayground.module.css";

import { ToastContext } from "../ToastProvider";

const VARIANT_OPTIONS = [
  "notice",
  "warning",
  "success",
  "error",
];

function ToastPlayground() {
  const { createToast } = React.useContext(ToastContext);

  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState(VARIANT_OPTIONS[0]);

  function handleCreateToast(event) {
    event.preventDefault();

    createToast(message, variant);

    setMessage("");
    setVariant(VARIANT_OPTIONS[0]);
  }

  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className={styles.wrapper}>
      <header>
        <img
          alt="Cute toast mascot"
          src="/toast.png"
        />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

      <form onSubmit={handleCreateToast}>
        <div className={styles.controlsWrapper}>
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: "baseline" }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea
                id="message"
                ref={inputRef}
                className={styles.messageInput}
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div
              className={`${styles.inputWrapper} ${styles.radioWrapper}`}
              key={variant}
            >
              {/*
    ------------------  MAP OVER VARIANT_OPTIONS HERE  ------------------
    Create a radio button option for each variant element in VARIANT_OPTIONS Array object
    */}
              {VARIANT_OPTIONS.map((variantOption) => {
                const id = `variant-${variantOption}`;

                return (
                  <label
                    key={id}
                    htmlFor={id}
                  >
                    <input
                      id={id}
                      type="radio"
                      name={variantOption}
                      value={variantOption}
                      checked={variantOption === variant}
                      onChange={(event) => {
                        setVariant(event.target.value);
                      }}
                    />
                    {variantOption}
                  </label>
                );
              })}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              <Button type="submit">Pop Toast!</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
