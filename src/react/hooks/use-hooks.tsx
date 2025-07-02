import { useState, useCallback } from "react";

export interface ToastData {
  id: string;
  title: string;
  status?: "error" | "warning" | "success" | "default";
}

export function useToastManager() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((data: Omit<ToastData, "id">) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, ...data }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}
