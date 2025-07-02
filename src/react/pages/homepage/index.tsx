import { useState } from "react";
import AdvertisementList from "@components/AdvertisementList";
import SearchBox from "@components/SearchBox";
import { AdvertismentMainPageButtonProps } from "@lib/types";
import { useAddsEdit } from "@react/api/advertisement/mutations";
import { useToastContext } from "@react/context/ToastContext";
import { convertToPersianDigits } from "@lib/utils";
import useAdvertisementStore from "@react/store/useAdvertisementStore";

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bulkOperation, setBulkOperation] = useState<{
    type: "enable" | "disable";
    inProgress: boolean;
  }>({ type: "enable", inProgress: false });

  const AdvertismentMainPageButtons: (AdvertismentMainPageButtonProps & {
    action: "enable" | "disable";
  })[] = [
    { title: "فعالسازی همه", action: "enable" },
    { title: "غیرفعالسازی همه", action: "disable" },
  ];

  const disableAndEnableAll = useAddsEdit();
  const { addToast } = useToastContext();
  const advertisements = useAdvertisementStore((state) => state.advertisements);

  const handleBulkOperation = async (action: "enable" | "disable") => {
    if (!advertisements || advertisements.length === 0) return;

    setBulkOperation({ type: action, inProgress: true });

    try {
      const enableValue = action === "enable";

      await Promise.all(
        advertisements.map((item) =>
          disableAndEnableAll.mutateAsync({
            token: item.token,
            body: { enable: enableValue },
          }),
        ),
      );

      addToast({
        title: `همه آگهی‌ها ${action === "enable" ? "فعال" : "غیرفعال"} شدند`,
        status: "success",
      });
    } catch {
      addToast({
        title: "خطا در تغییر وضعیت آگهی‌ها",
        status: "error",
      });
    } finally {
      setBulkOperation({ type: "enable", inProgress: false });
    }
  };

  return (
    <main className="scrollbar-hide max-h-screen w-full min-w-[360px] flex-1 overflow-y-auto">
      <div className="flex h-[40px] w-full flex-row items-center justify-end gap-3">
        <SearchBox
          containerClassName="w-full px-4"
          placeholder="نام محصول"
          value={searchQuery}
          onChange={(e) =>
            setSearchQuery(convertToPersianDigits(e.target.value))
          }
        />
      </div>

      <div className="border-b-custom mt-4 flex w-full gap-3 px-[15px] pt-[6px] pb-5">
        {AdvertismentMainPageButtons.map(
          (
            button: AdvertismentMainPageButtonProps & {
              action: "enable" | "disable";
            },
          ) => {
            const isActiveOperation =
              bulkOperation.inProgress && bulkOperation.type === button.action;

            return (
              <div
                key={button.title}
                onClick={() => {
                  if (!bulkOperation.inProgress) {
                    handleBulkOperation(button.action);
                  }
                }}
                className={`flex h-[32px] w-[50%] items-center justify-center rounded-[100px] border px-5 py-2 ${
                  bulkOperation.inProgress
                    ? "cursor-not-allowed opacity-70"
                    : "cursor-pointer"
                }`}
              >
                {isActiveOperation ? (
                  <span>در حال پردازش...</span>
                ) : (
                  button.title
                )}
              </div>
            );
          },
        )}
      </div>

      <AdvertisementList searchQuery={searchQuery} />
    </main>
  );
};
