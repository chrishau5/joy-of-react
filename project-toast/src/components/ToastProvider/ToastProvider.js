import React from "react";
import useKeydown from "../../hooks/use-keydown";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  function createToast(message, variant) {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ];
    setToasts(nextToasts);
  }

  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });
    setToasts(nextToasts);
  }

  // Whenever the toasts change, it re-renders the ToastProvider component, which means that the useEscapeKey custom hook is re-rendered, which means that the callback function is regenerated, which means that the callback function is a new reference, which means that the useEffect Hook in the useEscapeKey custom hook is triggered, which means that the event listener is removed, and then it's going to re-run the code to add a new event listener. This is a problem because we're adding and removing the same event listener over and over again.

  // To prevent our callback function below, setToasts([]), from regenerating on every render, we can use the useCallback Hook to memoize the function – remember this function and don't re-render it.

  // By passing the empty array as the dependency,the useCallback Hook will only run once onMount, and then it will return the same reference to the same function every time the component re-renders.

  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeydown("Escape", handleEscape);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        createToast,
        dismissToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
