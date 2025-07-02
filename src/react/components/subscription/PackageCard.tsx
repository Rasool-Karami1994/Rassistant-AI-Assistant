import Button from "@ui/button";
import ProgressBar from "@ui/progressBar";
import { useNavigate } from "@tanstack/react-router";

import { Route as SubscriptionsListImport } from "@react/routes/subscriptionsList";
import { EmptyBoxComponent } from "@components/advertisement/EmptyListComponent";
import LoadingSpinner from "@ui/loadingSpinner";
import { convertToPersianDigits } from "@lib/utils";
import { useGetActivePackage } from "@react/api/advertisement";
import { useMemo } from "react";

const PackageCard: React.FC = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetActivePackage();
  const activePackage = data?.[0];

  const isActive = useMemo<Partial<boolean>>(() => {
    let values: Partial<boolean> = false;
    if (activePackage && activePackage?.active_chats > 0) {
      values = true;
    }
    return values;
  }, [activePackage]);

  return isLoading ? (
    <LoadingSpinner />
  ) : !activePackage ? (
    <EmptyBoxComponent title="بسته فعالی ندارید" />
  ) : (
    <div
      className={`flex h-[210px] w-full flex-col items-center justify-start rounded-lg bg-[var(--cards-bg)] px-3 py-4`}
    >
      <div className="mb-8 flex h-[30px] w-full items-center justify-start gap-2">
        <p className="text-lg leading-[30px] font-medium text-[var(--primary-color)]">
          {convertToPersianDigits(
            `بسته ${activePackage?.number_of_chats} آگهی`,
          )}
        </p>
        <span
          className={`rounded-[6px] p-[6px] text-center text-xs font-normal text-[var(--primary-color)] ${
            isActive ? "bg-[#2A4B54]" : "bg-[#542A2E]"
          }`}
        >
          {isActive ? "فعال" : "منقضی"}
        </span>
      </div>
      <div className="h-9 w-full">
        <ProgressBar
          progress={
            activePackage?.number_of_chats - activePackage?.active_chats
          }
          total={activePackage?.number_of_chats}
        />
      </div>
      <div className="mt-10 w-full">
        <Button
          variant="primary"
          width="w-full"
          label="تغییر یا خرید بسته"
          onClick={() => {
            navigate({
              to: SubscriptionsListImport.to,
            });
          }}
        />
      </div>
    </div>
  );
};

export default PackageCard;
