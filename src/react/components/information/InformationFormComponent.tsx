import React from "react";
import {
  useForm,
  SubmitHandler,
  Controller,
  useWatch,
  Control,
  RegisterOptions,
} from "react-hook-form";

import TextAreaInput from "@components/advertisement/TextAreaInputComponent";
import { FieldDefinition, InformationFormValues } from "@lib/types";
import Button from "@ui/button";
import FormInput from "@ui/formInput";
import FormLabel from "@ui/formLabel";
import { convertToPersianDigits, convertToEnglishDigits } from "@lib/utils";

interface InformationFormProps {
  onSubmit: SubmitHandler<InformationFormValues>;
  defaultValues?: Partial<InformationFormValues>;
  fields: FieldDefinition[];
  isSubmitting: boolean;
  isError: boolean;
}

interface FormSwitchProps {
  name: keyof InformationFormValues;
  control: Control<InformationFormValues>;
  setValue: (name: keyof InformationFormValues, value: boolean) => void;
}

const FormSwitch: React.FC<FormSwitchProps> = ({ name, control, setValue }) => {
  const isSelected = useWatch({ control, name }) ?? false;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={!!isSelected}
      onClick={() => setValue(name, !isSelected)}
      className={`relative inline-flex h-6 w-12 cursor-pointer items-center rounded-full transition-colors duration-300 focus:outline-none ${
        isSelected ? "bg-[var(--light-green-bg)]" : "bg-[var(--switch-bg)]"
      }`}
    >
      <span
        className={`absolute left-0 h-5 w-5 rounded-full bg-white transition-transform duration-300 ${
          isSelected ? "translate-x-[26px]" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export const InformationFormComponent: React.FC<InformationFormProps> = ({
  onSubmit,
  defaultValues,
  fields,
  isSubmitting,
  isError,
}) => {
  const initialDefaultValues = React.useMemo<
    Partial<InformationFormValues>
  >(() => {
    const values: Partial<InformationFormValues> = {};
    fields.forEach((field) => {
      const key = field.name;
      if (defaultValues && key in defaultValues) {
        values[key] = defaultValues[key] as never;
      } else {
        values[key] = (field.component === "switch" ? false : "") as never;
      }
    });
    return values;
  }, [fields, defaultValues]);
  const workHourRegex = `/^(?:(?:(?:[0\u06F0]|[1\u06F1])?[0-9\u06F0-\u06F9]|(?:[2\u06F2][0-3\u06F0-\u06F3])):(?:[0-5\u06F0-\u06F5][0-9\u06F0-\u06F9])$/`;

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<InformationFormValues>({
    defaultValues: initialDefaultValues,
  });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative w-full space-y-6 p-4"
    >
      {fields.map((field, index) => {
        if (field.component === "switch") {
          return (
            <div
              key={index}
              className="flex w-full items-center justify-between"
            >
              <FormLabel label={field.label} />
              <FormSwitch
                name={field.name}
                control={control}
                setValue={setValue}
              />
            </div>
          );
        }

        const validationRules = {
          required: "فیلد مورد نظر الزامی است",
          ...(field.name === "mobile_number" && {
            pattern: {
              value: /^([0\u06F0][9\u06F9])([\d\u06F0-\u06F9]){9}$/,
              message: "شماره موبایل معتبر نیست (مثال: 09xxxxxxxxx)",
            },
          }),
          ...(field.name === "work_time" && {
            pattern: {
              value: workHourRegex,
              message: "فرمت زمان صحیح نیست (مثال: 14:30)",
            },
          }),
        } as RegisterOptions<InformationFormValues, typeof field.name>;

        return (
          <div key={index} className="mb-4">
            <FormLabel label={field.label} />
            <Controller
              name={field.name}
              control={control}
              rules={validationRules}
              render={({ field: { onChange, onBlur, value, ref } }) => {
                const rawValue = typeof value === "string" ? value : "";
                const displayedValue = convertToPersianDigits(rawValue);
                if (field.component === "textarea") {
                  return (
                    <>
                      <TextAreaInput
                        placeholder={field.placeholder ?? "اینجا بنویسید ..."}
                        value={displayedValue}
                        onChange={(e) =>
                          onChange(convertToEnglishDigits(e.target.value))
                        }
                        onBlur={onBlur}
                        ref={ref}
                        hasError={!!errors[field.name]}
                        className="mt-3 w-full"
                      />
                      {errors[field.name] && (
                        <p className="mt-1 text-xs text-[var(--danger-color)]">
                          {errors[field.name]?.message}
                        </p>
                      )}
                    </>
                  );
                }
                return (
                  <>
                    <FormInput
                      placeholder={field.placeholder ?? "اینجا بنویسید ..."}
                      type={field.type || "text"}
                      value={displayedValue}
                      onChange={(e) =>
                        onChange(convertToEnglishDigits(e.target.value))
                      }
                      onBlur={onBlur}
                      ref={ref}
                      hasError={!!errors[field.name]}
                      className="mt-3 w-full"
                    />
                    {errors[field.name] && (
                      <p className="mt-1 text-xs text-[var(--danger-color)]">
                        {errors[field.name]?.message}
                      </p>
                    )}
                  </>
                );
              }}
            />
          </div>
        );
      })}

      <Button
        type="submit"
        label={isError ? "تلاش مجدد" : defaultValues ? "ویرایش" : "ارسال"}
        variant={isError ? "danger" : "primary"}
        width="w-full"
        className="my-16"
        disabled={isSubmitting}
      />
    </form>
  );
};

export default InformationFormComponent;
