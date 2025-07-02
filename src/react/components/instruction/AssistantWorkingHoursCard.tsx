import { useState, useEffect } from "react";
import WithToolTipButton from "@components/WithTooltipButton";
import TimePickerModal from "@ui/timePicker";
import { Trash } from "lucide-react";
import { AssistantWorkingHoursCardProps } from "@lib/types";
import { convertToPersianDigits } from "@lib/utils";

const reverseTime = (time: string): string => {
  const parts = time.split(":").map((s) => s.trim());
  if (parts.length !== 2) return time;
  return `${parts[1]}:${parts[0]}`;
};

const AssistantWorkingHoursCard = ({
  onDelete,
  cardData,
  onConfirm,
  onEdit,
}: AssistantWorkingHoursCardProps) => {
  const initialStart = cardData?.start_time?.slice(0, 5) || "13:30";
  const initialEnd = cardData?.end_time?.slice(0, 5) || "13:30";

  const [isEditing, setIsEditing] = useState<boolean>(!!cardData?.draft);
  const [selectedDays, setSelectedDays] = useState<string[]>(
    cardData?.days_of_week ?? [],
  );
  const [selectedStartTime, setSelectedStartTime] = useState<string>(
    convertToPersianDigits(initialStart),
  );
  const [selectedEndTime, setSelectedEndTime] = useState<string>(
    convertToPersianDigits(initialEnd),
  );
  const initialActive = cardData ? cardData.is_active === true : false;
  const [localIsActive, setLocalIsActive] = useState<boolean>(initialActive);
  const [editingField, setEditingField] = useState<"start" | "end" | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (cardData && !isEditing) {
      setSelectedDays(cardData.days_of_week ?? []);
      setSelectedStartTime(
        convertToPersianDigits(cardData.start_time?.slice(0, 5) || "13:30"),
      );
      setSelectedEndTime(
        convertToPersianDigits(cardData.end_time?.slice(0, 5) || "13:30"),
      );
      setLocalIsActive(cardData.is_active === true);
    }
  }, [cardData, isEditing]);

  const days = [
    { label: "ش", value: "saturday" },
    { label: "ی", value: "sunday" },
    { label: "د", value: "monday" },
    { label: "س", value: "tuesday" },
    { label: "چ", value: "wednesday" },
    { label: "پ", value: "thursday" },
    { label: "ج", value: "friday" },
  ];

  const toggleDaySelection = (dayValue: string) => {
    setSelectedDays((prev) => {
      const newDays = prev.includes(dayValue)
        ? prev.filter((d) => d !== dayValue)
        : [...prev, dayValue];
      setIsEditing(true);
      return newDays;
    });
  };

  const handleConfirmTime = (time: string) => {
    if (editingField === "start") {
      setSelectedStartTime(time);
    } else if (editingField === "end") {
      setSelectedEndTime(time);
    }
    setIsModalOpen(false);
    setEditingField(null);
    setIsEditing(true);
  };

  const handleCancelTime = () => {
    if (cardData && !cardData.draft) {
      setSelectedDays(cardData.days_of_week ?? []);
      setSelectedStartTime(cardData.start_time || "13:30");
      setSelectedEndTime(cardData.end_time || "13:30");
      setLocalIsActive(cardData.is_active === true);
      setIsEditing(false);
    } else {
      onDelete();
    }
    setIsModalOpen(false);
    setEditingField(null);
  };

  const formatTimeForSubmission = (
    current: string,
    initial: string,
  ): string => {
    if (
      cardData &&
      !cardData.draft &&
      current === convertToPersianDigits(initial)
    ) {
      return convertToPersianDigits(reverseTime(initial));
    }
    return current;
  };

  const handleSwitchToggle = () => {
    setLocalIsActive((prev) => !prev);
    setIsEditing(true);
  };

  const handleSave = () => {
    const dayValue =
      selectedDays.length > 0
        ? selectedDays
        : cardData?.days_of_week || ["saturday"];
    const submittedStartTime = formatTimeForSubmission(
      selectedStartTime,
      initialStart,
    );
    const submittedEndTime = formatTimeForSubmission(
      selectedEndTime,
      initialEnd,
    );

    const updatedData = {
      days_of_week: dayValue,
      start_time: submittedStartTime,
      end_time: submittedEndTime,
      is_active: localIsActive,
    };

    if (cardData?.draft) {
      if (onConfirm) {
        onConfirm(updatedData);
      }
    } else {
      if (onEdit) {
        onEdit(updatedData);
      }
    }
    setIsEditing(false);
  };

  return (
    <div className="my-6 min-h-[233px] w-full rounded-xl bg-[var(--cards-bg)] px-4 pt-2">
      <div className="mb-4 flex h-10 w-full items-center justify-between">
        <button
          role="switch"
          aria-checked={localIsActive}
          onClick={handleSwitchToggle}
          className={`relative inline-flex h-6 w-12 cursor-pointer items-center rounded-full transition-colors duration-300 focus:outline-none ${
            localIsActive
              ? "bg-[var(--light-green-bg)]"
              : "bg-[var(--switch-bg)]"
          }`}
        >
          <span
            className={`absolute left-0 h-5 w-5 rounded-full bg-white transition-transform duration-300 ${
              localIsActive ? "translate-x-[26px]" : "translate-x-0"
            }`}
          />
        </button>
        <WithToolTipButton label="حذف ساعت کاردستیار">
          <button
            className="flex h-10 w-10 cursor-pointer items-center justify-center text-[var(--placeholder-color)]"
            onClick={onDelete}
          >
            <Trash size={16} />
          </button>
        </WithToolTipButton>
      </div>
      <div className="mb-3 flex h-11 w-full items-center justify-between">
        <p className="text-sm leading-[22px]">شروع</p>
        <button
          className="flex h-11 w-[70px] items-center justify-center rounded-[100px] bg-[var(--dropdown-bg)]"
          onClick={() => {
            setEditingField("start");
            setIsModalOpen(true);
            setIsEditing(true);
          }}
        >
          {selectedStartTime}
        </button>
      </div>
      <div className="mb-4 flex h-11 w-full items-center justify-between">
        <p className="text-sm leading-[22px]">پایان</p>
        <button
          className="flex h-11 w-[70px] items-center justify-center rounded-[100px] bg-[var(--dropdown-bg)]"
          onClick={() => {
            setEditingField("end");
            setIsModalOpen(true);
            setIsEditing(true);
          }}
        >
          {selectedEndTime}
        </button>
      </div>
      <div className="flex h-9 w-full items-center justify-between">
        {days.map((item) => {
          const isSelected = selectedDays.includes(item.value);
          return (
            <button
              key={item.value}
              onClick={() => toggleDaySelection(item.value)}
              className={`h-[36.5px] w-[36.5px] rounded-full border text-center transition-colors ${
                isSelected
                  ? "border-[var(--light-green-bg)] text-[var(--light-green-bg)]"
                  : "border-[var(--secondary-border-color)] text-[var(--secondary-color)]"
              }`}
              role="checkbox"
              aria-checked={isSelected}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <TimePickerModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onConfirm={handleConfirmTime}
        onCancel={handleCancelTime}
      />
      {isEditing && (
        <div className="mt-4 flex h-14 w-full items-center border-t border-[var(--border-bg)]">
          <button
            onClick={handleSave}
            className="h-full flex-1 rounded px-4 py-2 text-center text-[var(--light-green-bg)]"
          >
            {cardData?.draft ? "تایید" : "ویرایش"}
          </button>
          <button
            onClick={handleCancelTime}
            className="h-full flex-1 rounded px-4 py-2 text-center text-white"
          >
            لغو
          </button>
        </div>
      )}
    </div>
  );
};

export default AssistantWorkingHoursCard;
