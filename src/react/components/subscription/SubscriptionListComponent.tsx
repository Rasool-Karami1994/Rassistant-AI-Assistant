import Button from "@ui/button";
import { Route as SubscriptionCartImport } from "@react/routes/subscriptionCart";
import { ArrowRight } from "lucide-react";
import { useRouter, useNavigate, HistoryState } from "@tanstack/react-router";
import { useState } from "react";
import { SubscriptionListCardsProps } from "@lib/types";
import { convertToPersianDigits, formatNumber } from "@lib/utils";

const SubscriptionListComponent = () => {
  const router = useRouter();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string>("1");

  const packagesForBuyList: SubscriptionListCardsProps[] = [
    {
      id: "1",
      ad_number: 20,
      fee: 30000,
    },
    {
      id: "2",
      ad_number: 30,
      fee: 40000,
    },
    {
      id: "3",
      ad_number: 40,
      fee: 50000,
    },
  ];

  const handleGoBack = () => {
    router.history.back();
  };
  const selectedItem = packagesForBuyList.find(
    (item) => item.id === selectedId,
  );
  return (
    <div className="scrollbar-hide flex h-screen w-full flex-col items-center justify-start overflow-y-auto bg-[var(--primary-bg)] px-4 py-4 pb-6">
      <div className="block w-full">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-[100px] bg-[var(--dropdown-bg)] text-white"
          onClick={handleGoBack}
        >
          <ArrowRight size={20} />
        </button>
      </div>
      <img
        className="mt-2 mb-10 block h-[160px] w-[300px] object-cover sm:h-[180px] sm:w-[350px] md:h-[240px] md:w-[450px]"
        alt="subscribeListVector"
        src="/images/temp/subscribeListVector.webp"
      />

      <h2 className="mb-10 text-xl font-semibold text-[var(--primary-color)]">
        اشتراک‌های کاپیار
      </h2>

      <div className="h-auto w-full space-y-4 overflow-y-visible">
        {packagesForBuyList?.map((item: SubscriptionListCardsProps) => {
          const isActive = selectedId === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              style={
                isActive
                  ? {
                      background:
                        "linear-gradient(90deg, rgba(0, 214, 193, 0.1) 0%, rgba(24, 24, 28, 0.1) 50%, rgba(0, 214, 193, 0.1) 100%)",
                    }
                  : {}
              }
              className={`flex h-[56px] w-full cursor-pointer items-center justify-between rounded-xl p-4 text-[15px] font-medium transition-all ${
                isActive
                  ? "border-[1.5px] border-[var(--light-green-bg)]"
                  : "border border-[var(--secondary-border-color)]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    isActive
                      ? "border-[var(--light-green-bg)]"
                      : "border-[var(--secondary-border-color)]"
                  }`}
                >
                  {isActive && (
                    <div className="h-3 w-3 rounded-full bg-[var(--light-green-bg)]" />
                  )}
                </div>
                <p>{convertToPersianDigits(item.ad_number)} آگهی</p>
              </div>
              <p className="flex items-center gap-1">
                {convertToPersianDigits(formatNumber(item.fee))}
                <span className="font-sm text-xs">هزار تومان</span>
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 w-full">
        <Button
          variant="primary"
          width="w-full"
          label="تغییر یا خرید بسته"
          onClick={() => {
            if (selectedItem)
              navigate({
                to: SubscriptionCartImport.to,
                state: {
                  id: selectedItem?.id,
                  number_of_chats: selectedItem?.ad_number,
                  amount: selectedItem?.fee,
                } as unknown as HistoryState,
              });
          }}
        />
      </div>
    </div>
  );
};

export default SubscriptionListComponent;
