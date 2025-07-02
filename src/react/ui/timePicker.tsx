import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn, convertToPersianDigits } from "@lib/utils";
import { TimePickerModalProps } from "@lib/types";

const hoursList = Array.from({ length: 24 }, (_, i) =>
  String(i).padStart(2, "0"),
);
const minutesList = Array.from({ length: 61 }, (_, i) =>
  String(i).padStart(2, "0"),
);

export const TimePickerModal: React.FC<TimePickerModalProps> = ({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
}) => {
  const [selectedHourIndex, setSelectedHourIndex] = React.useState(13);
  const [selectedMinuteIndex, setSelectedMinuteIndex] = React.useState(30);

  const hourContainerRef = React.useRef<HTMLDivElement>(null);
  const minuteContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = hourContainerRef.current;
    if (!container) return;
    const handleWheelHour = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        setSelectedHourIndex((prev) =>
          Math.min(hoursList.length - 1, prev + 1),
        );
      } else if (e.deltaY < 0) {
        setSelectedHourIndex((prev) => Math.max(0, prev - 1));
      }
    };
    container.addEventListener("wheel", handleWheelHour, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheelHour);
    };
  }, []);

  React.useEffect(() => {
    const container = minuteContainerRef.current;
    if (!container) return;
    const handleWheelMinute = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        setSelectedMinuteIndex((prev) =>
          Math.min(minutesList.length - 1, prev + 1),
        );
      } else if (e.deltaY < 0) {
        setSelectedMinuteIndex((prev) => Math.max(0, prev - 1));
      }
    };
    container.addEventListener("wheel", handleWheelMinute, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheelMinute);
    };
  }, []);

  const hourTouchStartRef = React.useRef<number | null>(null);
  const handleHourTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    hourTouchStartRef.current = e.touches[0].clientY;
  };
  const handleHourTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (hourTouchStartRef.current === null) return;
    const diff = hourTouchStartRef.current - e.touches[0].clientY;
    if (Math.abs(diff) > 20) {
      if (diff > 0) {
        setSelectedHourIndex((prev) =>
          Math.min(hoursList.length - 1, prev + 1),
        );
      } else {
        setSelectedHourIndex((prev) => Math.max(0, prev - 1));
      }
      hourTouchStartRef.current = e.touches[0].clientY;
    }
  };

  const minuteTouchStartRef = React.useRef<number | null>(null);
  const handleMinuteTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    minuteTouchStartRef.current = e.touches[0].clientY;
  };
  const handleMinuteTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (minuteTouchStartRef.current === null) return;
    const diff = minuteTouchStartRef.current - e.touches[0].clientY;
    if (Math.abs(diff) > 20) {
      if (diff > 0) {
        setSelectedMinuteIndex((prev) =>
          Math.min(minutesList.length - 1, prev + 1),
        );
      } else {
        setSelectedMinuteIndex((prev) => Math.max(0, prev - 1));
      }
      minuteTouchStartRef.current = e.touches[0].clientY;
    }
  };

  const confirmHandler = () => {
    const selectedTime = convertToPersianDigits(
      `${minutesList[selectedMinuteIndex]} : ${hoursList[selectedHourIndex]}`,
    );
    onConfirm(selectedTime);
    onOpenChange(false);
  };

  const cancelHandler = () => {
    onCancel();
    onOpenChange(false);
  };

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
            "fixed top-[50%] left-[50%] z-50 flex w-[328px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl bg-[var(--dropdown-bg)] shadow-lg",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "overflow-hidden",
          )}
        >
          <DialogPrimitive.Title className="sr-only">
            انتخاب زمان
          </DialogPrimitive.Title>
          <div className="flex" dir="ltr">
            <div
              ref={minuteContainerRef}
              className="relative h-[168px] flex-1 overflow-hidden"
              onTouchStart={handleMinuteTouchStart}
              onTouchMove={handleMinuteTouchMove}
            >
              <div className="flex flex-col items-center">
                <div className="flex h-[56px] w-full items-center justify-center text-[#626266]">
                  {selectedMinuteIndex > 0
                    ? convertToPersianDigits(
                        minutesList[selectedMinuteIndex - 1],
                      )
                    : ""}
                </div>
                <div className="flex h-[56px] w-full items-center justify-center text-lg font-bold text-[var(--primary-color)]">
                  {convertToPersianDigits(minutesList[selectedMinuteIndex])}
                </div>
                <div className="flex h-[56px] w-full items-center justify-center text-[#626266]">
                  {selectedMinuteIndex < minutesList.length - 1
                    ? convertToPersianDigits(
                        minutesList[selectedMinuteIndex + 1],
                      )
                    : ""}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center px-2 text-lg font-bold text-[var(--primary-color)]">
              :
            </div>
            <div
              ref={hourContainerRef}
              className="relative h-[168px] flex-1 overflow-hidden"
              onTouchStart={handleHourTouchStart}
              onTouchMove={handleHourTouchMove}
            >
              <div className="flex flex-col items-center">
                <div className="flex h-[56px] w-full items-center justify-center text-[#626266]">
                  {selectedHourIndex > 0
                    ? convertToPersianDigits(hoursList[selectedHourIndex - 1])
                    : ""}
                </div>
                <div className="flex h-[56px] w-full items-center justify-center text-lg font-bold text-[var(--primary-color)]">
                  {convertToPersianDigits(hoursList[selectedHourIndex])}
                </div>
                <div className="flex h-[56px] w-full items-center justify-center text-[#626266]">
                  {selectedHourIndex < hoursList.length - 1
                    ? convertToPersianDigits(hoursList[selectedHourIndex + 1])
                    : ""}
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-[56px] w-full border-t border-[var(--border-bg)]">
            <button
              type="button"
              onClick={confirmHandler}
              className="flex-1 border-0 text-center text-sm font-medium text-[var(--light-green-bg)]"
            >
              تایید
            </button>
            <button
              type="button"
              onClick={cancelHandler}
              className="flex-1 border-0 text-center text-sm font-medium text-[var(--secondary-color)]"
            >
              انصراف
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

TimePickerModal.displayName = "TimePickerModal";

export default TimePickerModal;
