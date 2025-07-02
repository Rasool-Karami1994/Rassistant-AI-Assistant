// PaymentRecords.tsx
import Table from "@ui/table";

const PaymentRecords = () => {
  return (
    <div className="flex h-screen flex-col gap-6 px-4">
      <div className="h-[34px] w-full flex-shrink-0 items-center justify-start rounded-lg bg-[#2D2D38] p-2 text-xs leading-[18px] text-[#A6C3FF]">
        برای مشاهده جزئیات بیشتر، روی ردیف مورد نظر بزنید.
      </div>
      <div className="flex-1 overflow-y-auto">
        <Table />
      </div>
    </div>
  );
};

export default PaymentRecords;