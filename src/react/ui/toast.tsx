import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { CircleAlert, AlertTriangle, CheckCircle } from "lucide-react";

export const ToastProvider = ToastPrimitive.Provider;

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={clsx(
      "fixed bottom-4 left-2tuhgshcd z-[2000] flex flex-col gap-2 p-4",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

const toastVariants = cva(
  "relative rounded-lg p-4 text-white flex items-center gap-2 backdrop-blur-sm h-12 transition-all duration-[2000ms] ease-in-out",
  {
    variants: {
      status: {
        success:
          "bg-[linear-gradient(270deg,_#0C0C0F_39.72%,_#00482E_141.8%)] shadow-[0_0_0.5px_0_#074030,0_0_1px_0_#074030,0_0_2px_0_#074030,0_0_4px_0_#074030,0_0_7px_0_#074030,0_0_12px_0_#074030]",
        error:
          "bg-[linear-gradient(270deg,_#0C0C0F_39.72%,_#53000E_141.8%)] shadow-[0_0_0.5px_0_#601524,0_0_1px_0_#601524,0_0_2px_0_#601524,0_0_4px_0_#601524,0_0_7px_0_#601524,0_0_12px_0_#601524]",
        warning:
          "bg-[linear-gradient(270deg,_#0C0C0F_39.72%,_#533E00_141.8%)] shadow-[0_0_0.5px_0_#4B4126,0_0_1px_0_#4B4126,0_0_2px_0_#4B4126,0_0_4px_0_#4B4126,0_0_7px_0_#4B4126,0_0_12px_0_#4B4126]",
        default: "bg-gray-800 shadow-lg",
      },
    },
    defaultVariants: { status: "default" },
  },
);

type ToastProps = React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> &
  VariantProps<typeof toastVariants> & {
    status?: "error" | "warning" | "success" | "default";
  };

export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ status = "default", className, children, ...props }, ref) => {
  let IconComponent: React.ElementType | null = null;
  let iconColor = "";
  switch (status) {
    case "error":
      IconComponent = AlertTriangle;
      iconColor = "#FE002A";

      break;
    case "warning":
      IconComponent = CircleAlert;
      iconColor = "#FFB800";

      break;
    case "success":
      IconComponent = CheckCircle;
      iconColor = "#00EE97";

      break;

    default:
      IconComponent = null;
  }

  return (
    <ToastPrimitive.Root
      ref={ref}
      className={clsx(toastVariants({ status }), className)}
      {...props}
    >
      {IconComponent && (
        <IconComponent
          size={16}
          style={{ color: iconColor }}
          className="flex-shrink-0"
        />
      )}
      <div className="flex-1">{children}</div>
    </ToastPrimitive.Root>
  );
});
Toast.displayName = ToastPrimitive.Root.displayName;

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={clsx("text-hex-ebebeb text-sm font-normal", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitive.Title.displayName;
