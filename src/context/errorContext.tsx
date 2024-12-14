import { createContext, useContext, useState } from "react";
import { ErrorContext as ErrorType } from "@/lib/types";

const ErrorContext = createContext<ErrorType | null>(null);

function useErrorContext() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("Must be placed inside the provider");
  }
  return context;
}

function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState("");
  return (
    <ErrorContext.Provider
      value={{
        error,
        setError,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
}

export { ErrorProvider, useErrorContext };
