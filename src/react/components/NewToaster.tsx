import { useToastContext } from "@react/context/ToastContext";
import { ToastProvider, ToastViewport, Toast, ToastTitle } from "@ui/toast";

export const Toaster = () => {
  const { toasts, removeToast } = useToastContext();

  return (
    <ToastProvider swipeDirection="right">
      <ToastViewport>
        {toasts.map((t) => (
          <Toast
            key={t.id}
            open={true}
            status={t.status || "default"}
            onOpenChange={(open) => {
              if (!open) {
                removeToast(t.id);
              }
            }}
          >
            <ToastTitle>{t.title}</ToastTitle>
          </Toast>
        ))}
      </ToastViewport>
    </ToastProvider>
  );
};
