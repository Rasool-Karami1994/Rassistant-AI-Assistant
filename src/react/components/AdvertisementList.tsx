// AdvertisementList.tsx
import { useNavigate } from "@tanstack/react-router";
import { AdvertismentResponse } from "@lib/types";
import useAdvertisementStore from "@react/store/useAdvertisementStore";
import { InstructionsTabIcon } from "@components/icons";
import { Route as AppAdvertisementDetailRoute } from "@react/routes/(app)/advertisement/$advertisement_id";
import WithToolTipButton from "./WithTooltipButton";
import { useGetAdvertisementList } from "@react/api/advertisement";
import LoadingSpinner from "@ui/loadingSpinner";
import { EmptyBoxComponent } from "./advertisement/EmptyListComponent";
import { useAddsEdit } from "@react/api/advertisement/mutations";
import { useToastContext } from "@react/context/ToastContext";
import { convertToPersianDigits } from "@lib/utils";
import { useEffect } from "react";

export interface AdvertisementListProps {
  searchQuery?: string;
}

const AdvertisementList: React.FC<AdvertisementListProps> = ({
  searchQuery,
}) => {
  const navigate = useNavigate();
  const { addToast } = useToastContext();

  const setSelectedAdvertisement = useAdvertisementStore(
    (state) => state.setSelectedAdvertisement,
  );
  const setAdvertisementList = useAdvertisementStore(
    (state) => state.setAdvertisementList,
  );

  const { data, isLoading, isError } = useGetAdvertisementList(
    searchQuery && searchQuery,
  );
  useEffect(() => {
    if (data) {
      setAdvertisementList(data);
    }
  }, [data]);
  useEffect(() => {
    if (isError) {
      addToast({
        title: "خطا در دریافت لیست آگهی ها",
        status: "error",
      });
    }
  }, []);
  const { mutate } = useAddsEdit();
  const handleEdit = (token: string, item: AdvertismentResponse) => {
    mutate(
      { token, body: { enable: item.enable } },
      {
        onSuccess: () => {
          addToast({
            title: item.enable ? "آگهی فعال شد" : "آگهی غیر فعال شد",
            status: "success",
          });
        },
        onError: () => {
          addToast({
            title: item.enable
              ? "خطا در فعالسازی آگهی"
              : "خطا در غیرفعالسازیآگهی",
            status: "error",
          });
        },
      },
    );
  };
  return isLoading ? (
    <LoadingSpinner />
  ) : data?.length === 0 || !data ? (
    <div className="w-full px-4">
      <EmptyBoxComponent title="هیچ آگهی یافت نشد" />
    </div>
  ) : (
    <div className="mt-6 mb-10 flex h-auto w-full flex-col items-center justify-start overflow-y-visible px-3">
      {data?.map((item: AdvertismentResponse) => (
        <div
          key={item?.token}
          className="border-b-custom mb-4 h-[196px] w-full pb-4"
        >
          <div className="flex h-[180px] w-full flex-col items-center rounded-[10px] bg-[var(--cards-bg)] p-4">
            <div className="mb-6 flex h-20 w-full items-start gap-4">
              <p className="flex-1 text-base leading-[26px] font-medium break-words whitespace-normal text-white">
                {item?.title
                  ? convertToPersianDigits(item?.title)
                  : "بدون عنوان"}
              </p>
              <img
                alt="advertisement"
                src={item.images ?? "/images/temp/cupyarImageAlternative.png"}
                className="h-20 w-20 rounded-lg object-cover"
              />
            </div>
            <div className="flex h-12 w-full items-center justify-between gap-6">
              <WithToolTipButton label="مشاهده آگهی">
                <button
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[var(--tertiary-bg)] text-[var(--primary-color)]"
                  onClick={() => {
                    setSelectedAdvertisement(item);
                    navigate({
                      to: AppAdvertisementDetailRoute.to,
                      params: { advertisement_id: item.token },
                    });
                  }}
                >
                  <InstructionsTabIcon />
                </button>
              </WithToolTipButton>

              <div className="flex h-11 min-w-[236px] items-center justify-between rounded-[10px] bg-[var(--tertiary-bg)] px-3 text-[var(--primary-color)]">
                <p>فعال کردن دستیار</p>
                <button
                  role="switch"
                  aria-checked={item.enable}
                  onClick={() => {
                    handleEdit(item?.token, { ...item, enable: !item.enable });
                  }}
                  className={`relative inline-flex h-6 w-12 cursor-pointer items-center rounded-full transition-colors duration-300 focus:outline-none ${
                    item.enable
                      ? "bg-[var(--light-green-bg)]"
                      : "bg-[var(--switch-bg)]"
                  }`}
                >
                  <span
                    className={`absolute left-0 h-5 w-5 rounded-full bg-white transition-transform duration-300 ${
                      item.enable ? "translate-x-[26px]" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdvertisementList;
