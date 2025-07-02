import React, { createContext, useContext } from "react";
import { useToastManager, ToastData } from "@react/hooks/use-hooks";

interface ToastContextType {
  toasts: ToastData[];
  addToast: (data: Omit<ToastData, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const toastManager = useToastManager();

  return (
    <ToastContext.Provider value={toastManager}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      "useToastContext must be used within a ToastProviderWrapper",
    );
  }
  return context;
};
