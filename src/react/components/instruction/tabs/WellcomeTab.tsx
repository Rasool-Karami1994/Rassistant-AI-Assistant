import { useState, useEffect, useRef } from "react";
import Button from "@ui/button";
import TextAreaInput from "@components/advertisement/TextAreaInputComponent";
import { CircleHelp } from "lucide-react";
import useAdvertisementStore from "@react/store/useAdvertisementStore";
import { useAddWelcomeMessage } from "@react/api/advertisement/mutations";
import LoadingSpinner from "@ui/loadingSpinner";
import { useToastContext } from "@react/context/ToastContext";
import { convertToPersianDigits } from "@lib/utils";

export const WellcomeTab = () => {
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const [addModeActive, setAddModeActive] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const saveButtonContainerRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToastContext();
  const advertisements = useAdvertisementStore((state) => state.advertisements);
  const addWelcomeMessage = useAddWelcomeMessage();

  useEffect(() => {
    if (advertisements && advertisements?.length > 0) {
      setTextAreaValue(advertisements[0]?.welcome_message);
    }
  }, [advertisements]);

  const handleSaveMessage = async () => {
    if (!advertisements || advertisements.length === 0) return;

    setIsSaving(true);

    try {
      await Promise.all(
        advertisements.map((item) =>
          addWelcomeMessage.mutateAsync({
            token: item.token,
            body: { welcome_message: textAreaValue },
          }),
        ),
      );

      addToast({
        title: "پیغام خوشامدگویی با موفقیت ثبت شد",
        status: "success",
      });

      setAddModeActive(false);
    } catch {
      addToast({
        title: "خطا در ثبت پیغام خوشامدگویی",
        status: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!advertisements) return <LoadingSpinner />;

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-start gap-3 px-4">
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between pt-4">
          <p className="text-base leading-7 font-medium text-[var(--primary-color)]">
            پیغام خوشامدگویی
          </p>
          <span className="text-[var(--placeholder-color)]">
            <CircleHelp size={18} />
          </span>
        </div>

        <TextAreaInput
          placeholder="اینجا بنویسید ..."
          value={textAreaValue}
          onChange={(e) =>
            setTextAreaValue(convertToPersianDigits(e.target.value))
          }
          onFocus={() => setAddModeActive(true)}
          onBlur={(e) => {
            if (
              !e.relatedTarget ||
              !(
                saveButtonContainerRef.current &&
                saveButtonContainerRef.current.contains(e.relatedTarget as Node)
              )
            ) {
              setAddModeActive(false);
            }
          }}
          className="mt-3 w-full"
        />

        {addModeActive && (
          <div className="mt-4 flex w-full" ref={saveButtonContainerRef}>
            <Button
              onClick={handleSaveMessage}
              label={isSaving ? "در حال ذخیره..." : "ذخیره"}
              variant="primary"
              width="w-full"
              disabled={isSaving}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WellcomeTab;
