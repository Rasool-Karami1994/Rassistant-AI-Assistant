import { useState } from "react";
import Button from "@ui/button";
import { SimpleHeaderWIthBack } from "./SimpleHeaderWIthBack";
import TextAreaInput from "./TextAreaInputComponent";
import {
  EditAdvrtisementInstructionPayload,
  InstructionFormComponentProps,
} from "@lib/types";

import { useRouter } from "@tanstack/react-router";
import { useToastContext } from "@react/context/ToastContext";
import { convertToPersianDigits } from "@lib/utils";
import {
  useAddAdvertisementInstruction,
  useAdvertisementInstructionEdit,
} from "@react/api/advertisement/mutations";

export const InstructionFormComponent: React.FC<
  InstructionFormComponentProps
> = ({ question, assistantAnswer, post, id }) => {
  const [questionState, setQuestionState] = useState(question || "");
  const [assistantAnswerState, setAssistantAnswerState] = useState(
    assistantAnswer || "",
  );
  const [errors, setErrors] = useState({
    question: false,
    assistantAnswer: false,
  });
  const router = useRouter();

  const { mutate: patchInstruction, error: patchError } =
    useAdvertisementInstructionEdit();
  const { mutate: createInstruction, error: createError } =
    useAddAdvertisementInstruction();
  const { addToast } = useToastContext();

  const handleSave = () => {
    const newErrors = { question: false, assistantAnswer: false };

    if (questionState.trim() === "") {
      newErrors.question = true;
    }
    if (assistantAnswerState.trim() === "") {
      newErrors.assistantAnswer = true;
    }
    setErrors(newErrors);

    if (newErrors.question || newErrors.assistantAnswer) {
      return;
    }

    const payload: EditAdvrtisementInstructionPayload = {
      post: post ?? "",
      question: questionState,
      answer: assistantAnswerState,
    };

    if (id || (id && patchError)) {
      patchInstruction(
        { token: `${id}`, body: payload },
        {
          onSuccess: () => {
            addToast({
              title: "با موفقیت ویرایش شد",
              status: "success",
            });
            router.history.back();
          },
        },
      );
      if (createError) {
        addToast({
          title: "خطا در ثبت آیتم جدید",
          status: "error",
        });
      }
    } else {
      createInstruction(
        { body: payload },
        {
          onSuccess: () => {
            addToast({
              title: "با موفقیت ثبت شد",
              status: "success",
            });
            router.history.back();
          },
        },
      );
    }

    if (patchError) {
      addToast({
        title: "خطا در ویرایش آیتم موردنظر",
        status: "error",
      });
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-start bg-[var(--primary-bg)] px-4">
      <SimpleHeaderWIthBack title="دستورالعمل" />
      <div className="mt-8 flex w-full flex-col gap-4">
        <div className="w-full">
          <p className="mb-[10px] block w-full text-right text-[13px] text-[var(--primary-color)]">
            سوال
          </p>
          <TextAreaInput
            value={questionState}
            hasError={errors.question}
            onChange={(e) => {
              const value = convertToPersianDigits(e.target.value);
              setQuestionState(value);
              if (value.trim() === "") {
                setErrors((prev) => ({ ...prev, question: true }));
              } else {
                setErrors((prev) => ({ ...prev, question: false }));
              }
            }}
          />
          {errors.question && (
            <p className="mt-[10px] text-xs text-[#FF1A40]">
              لطفا این قسمت را کامل کنید
            </p>
          )}
        </div>
        <div className="w-full">
          <p className="mb-[10px] block w-full text-right text-[13px] text-[var(--primary-color)]">
            پاسخ دستیار
          </p>
          <TextAreaInput
            value={assistantAnswerState}
            hasError={errors.assistantAnswer}
            onChange={(e) => {
              const value = convertToPersianDigits(e.target.value);
              setAssistantAnswerState(value);
              if (value.trim() === "") {
                setErrors((prev) => ({ ...prev, assistantAnswer: true }));
              } else {
                setErrors((prev) => ({ ...prev, assistantAnswer: false }));
              }
            }}
          />
          {errors.assistantAnswer && (
            <p className="mt-[10px] text-xs text-[#FF1A40]">
              لطفا این قسمت را کامل کنید
            </p>
          )}
        </div>
      </div>
      <Button
        label={
          patchError || createError ? "تلاش مجدد" : id ? "ویرایش" : "ذخیره"
        }
        variant="primary"
        onClick={handleSave}
        width="w-[calc(100%-32px)]"
        className="absolute bottom-6"
      />
    </div>
  );
};

export default InstructionFormComponent;
