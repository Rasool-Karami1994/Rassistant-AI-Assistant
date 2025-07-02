import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@lib/utils";
import Button from "./button";
import { ConfirmationDialogProps } from "@lib/types";

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onOpenChange,
  description,
  onDelete,
}) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "bg-var(--primary-bg) fixed inset-0 z-50 backdrop-blur-xs",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed top-[50%] left-[50%] z-50 flex h-[146px] w-[328px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-10 rounded-2xl bg-[var(--dropdown-bg)] p-6 shadow-lg",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "sm:rounded-lg",
          )}
        >
          <p className="text-center text-sm text-white">{description}</p>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                onDelete();
                onOpenChange(false);
              }}
              label="حذف"
              variant="danger"
              width="w-[118px]"
            />
            <Button
              onClick={() => onOpenChange(false)}
              label="انصراف"
              variant="secondary"
              width="w-[90px]"
            />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

ConfirmationDialog.displayName = "ConfirmationDialog";
