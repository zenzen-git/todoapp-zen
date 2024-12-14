import { createContext, useContext, useState } from "react";
import { SucessContext as SuccessType } from "@/lib/types";

const SuccessContext = createContext<SuccessType | null>(null);

function useSuccessContext() {
  const context = useContext(SuccessContext);
  if (!context) {
    throw new Error("Must be placed inside the provider");
  }
  return context;
}

function SuccessProvider({ children }: { children: React.ReactNode }) {
  const [success, setSuccess] = useState("");
  return (
    <SuccessContext.Provider
      value={{
        success,
        setSuccess,
      }}
    >
      {children}
    </SuccessContext.Provider>
  );
}

export { SuccessProvider, useSuccessContext };
