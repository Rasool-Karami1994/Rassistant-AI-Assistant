import { useState } from "react";
import Button from "@ui/button";
import { EmptyBoxComponent } from "../EmptyListComponent";
import TextAreaInput from "../TextAreaInputComponent";
import AdvertisementHeader from "../AdvertisementHeader";
import InformationList from "../InformationList";

import LoadingSpinner from "@ui/loadingSpinner";
import { useToastContext } from "@react/context/ToastContext";
import { convertToPersianDigits } from "@lib/utils";
import { useGetAdvertisementAdditionalItems } from "@react/api/advertisement";
import {
  useAddAdditionalItem,
  useAdditionalItemsEdit,
} from "@react/api/advertisement/mutations";
import { AdvertismentAdditionalItemPayload } from "@lib/types";

export const AdditionalItems = () => {
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const [addModeActive, setAddModeActive] = useState<boolean>(false);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<{
    description: string;
    itemId: string;
    post: string;
  } | null>(null);

  const { addToast } = useToastContext();

  const { data, isLoading, isError } = useGetAdvertisementAdditionalItems();
  if (isError) {
    addToast({
      title: "خطا در دریافت لیست موارد تکمیلی",
      status: "error",
    });
  }

  const { mutate: createAdditionalItem, isError: createAdditionalItemError } =
    useAddAdditionalItem();
  const { mutate: editAdditionalItem, isError: editAdditionalItemError } =
    useAdditionalItemsEdit();

  const handleSave = () => {
    if (!textAreaValue.trim()) return;

    const payload: AdvertismentAdditionalItemPayload = {
      description: textAreaValue,
      post: editItem?.post ?? "",
    };
    if (editItemId || (editItemId && editAdditionalItemError)) {
      editAdditionalItem(
        { token: `${editItemId}`, body: payload },
        {
          onSuccess: () => {
            setAddModeActive(false);
            setTextAreaValue("");
            setEditItemId(null);
            addToast({
              title: "با موفقیت ویرایش شد",
              status: "success",
            });
          },
          onError: () => {
            addToast({
              title: "خطا در ویرایش مورد تکمیلی جدید",
              status: "success",
            });
          },
        },
      );
    } else {
      const AddPayload: AdvertismentAdditionalItemPayload = {
        description: textAreaValue,
        post: `${Date.now()}-${Math.floor(Math.random() * 1e6)}`,
      };
      createAdditionalItem(
        { body: AddPayload },
        {
          onSuccess: () => {
            setAddModeActive(false);
            setTextAreaValue("");
            addToast({
              title: "با موفقیت ثبت شد",
              status: "success",
            });
          },
          onError: () => {
            addToast({
              title: "خطا در ثبت مورد تکمیلی جدید",
              status: "success",
            });
          },
        },
      );
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-start gap-3 px-4">
      <AdvertisementHeader
        title="اطلاعات تکمیلی"
        onAddClick={() => {
          setAddModeActive((prevState) => !prevState);
          setEditItemId(null);
          setTextAreaValue("");
        }}
      />
      {addModeActive && (
        <TextAreaInput
          placeholder="اینجا بنویسید ..."
          value={textAreaValue}
          onChange={(e) =>
            setTextAreaValue(
              e.target.value && convertToPersianDigits(e.target.value),
            )
          }
          className="my-6 w-full"
        />
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : data?.length === 0 ? (
        <EmptyBoxComponent title="هیچ اطلاعاتی تکمیلی یافت نشد" />
      ) : (
        data && (
          <InformationList
            items={data}
            onEditItem={(description: string, itemId: string, post: string) => {
              setAddModeActive(true);
              setTextAreaValue(description || "");
              setEditItemId(itemId);

              setEditItem({ description, itemId, post });
            }}
          />
        )
      )}

      {addModeActive && (
        <div className="absolute bottom-[242px] flex w-full gap-4 px-4">
          <Button
            onClick={handleSave}
            label={
              createAdditionalItemError || editAdditionalItemError
                ? "تلاش مجدد"
                : editItemId
                  ? "ویرایش"
                  : "ذخیره"
            }
            variant="primary"
            width="w-[50%]"
          />
          <Button
            onClick={() => {
              setAddModeActive(false);
              setTextAreaValue("");
              setEditItemId(null);
            }}
            label="انصراف"
            variant="secondary"
            width="w-[50%]"
          />
        </div>
      )}
    </div>
  );
};

export default AdditionalItems;
