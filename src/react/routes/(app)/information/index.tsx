import { useEffect, useMemo, useState } from "react";
import InformationFormComponent from "@components/information/InformationFormComponent";

import { useToastContext } from "@react/context/ToastContext";
import { useGetInformationFormData } from "@react/api/advertisement";
import { createFileRoute } from "@tanstack/react-router";
import LoadingSpinner from "@ui/loadingSpinner";
import { FieldDefinition, InformationFormValues } from "@lib/types";
import { convertToPersianDigits } from "@lib/utils";
import {
  useAddInforamtionFormData,
  useInforamtionFormDataEdit,
} from "@react/api/advertisement/mutations";

export const Route = createFileRoute("/(app)/information/")({
  component: RouteComponent,
});

const fields: FieldDefinition[] = [
  { name: "work_name", label: "نام فروشگاه", component: "input" },
  { name: "address", label: "آدرس", component: "textarea" },
  { name: "mobile_number", label: "شماره تلفن", component: "input" },
  { name: "work_time", label: "ساعت کاری", component: "input" },
  { name: "instagram_page", label: "اینستاگرام", component: "input" },
  { name: "telegram_page", label: "تلگرام", component: "input" },
  {
    name: "use_info_by_chatbot",
    label: "استفاده دستیار از این اطلاعات برای پاسخ",
    component: "switch",
  },
];

function RouteComponent() {
  const {
    mutate: postUserInformation,
    isPending: isFetchingAdd,
    isError: isFetchErrorAdd,
  } = useAddInforamtionFormData();

  const {
    mutate: patchUserInformation,
    isPending: isSubmitting,
    isError: isPatchError,
  } = useInforamtionFormDataEdit();

  const { addToast } = useToastContext();
  const [userData, setUserData] = useState<InformationFormValues[] | null>(
    null,
  );
  const {
    data,
    isLoading: isFetching,
    isError: isFetchError,
  } = useGetInformationFormData();
  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);
  const defaultFormValues: Partial<InformationFormValues> = useMemo(() => {
    if (!data) return {};
    return {
      work_name: convertToPersianDigits(data[0]?.work_name) || "",
      address: convertToPersianDigits(data[0]?.address) || "",
      mobile_number: convertToPersianDigits(data[0]?.mobile_number) || "",
      work_time: convertToPersianDigits(data[0]?.work_time?.slice(0, 5)) || "",
      instagram_page: convertToPersianDigits(data[0]?.instagram_page) || "",
      telegram_page: convertToPersianDigits(data[0]?.telegram_page) || "",
      use_info_by_chatbot: data[0]?.use_info_by_chatbot || false,
    };
  }, [data]);

  const onSubmit = (data: InformationFormValues) => {
    if (userData && userData?.length > 0) {
      patchUserInformation(
        { id: userData[0]?.id, body: data },
        {
          onSuccess: () => {
            addToast({
              title: "اطلاعات با موفقیت ثبت شد",
              status: "success",
            });
          },
          onError: () => {
            addToast({
              title: "خطا در ثبت اطلاعات",
              status: "error",
            });
          },
        },
      );
    } else {
      postUserInformation(
        { body: data },
        {
          onSuccess: () => {
            addToast({
              title: "اطلاعات با موفقیت ثبت شد",
              status: "success",
            });
          },
          onError: () => {
            addToast({
              title: "خطا در ثبت اطلاعات",
              status: "error",
            });
          },
        },
      );
    }
  };

  if (isFetching) {
    return <LoadingSpinner />;
  }

  if (isFetchError) {
    addToast({
      title: "خطا در دریافت اطلاعات",
      status: "error",
    });
  }

  return (
    <InformationFormComponent
      onSubmit={onSubmit}
      fields={fields}
      defaultValues={defaultFormValues}
      isSubmitting={isSubmitting || isFetchingAdd}
      isError={isPatchError || isFetchErrorAdd}
    />
  );
}

export default RouteComponent;
