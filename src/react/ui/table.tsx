import React, { useCallback, useMemo, useState } from "react";
import { X } from "lucide-react";
import { EmptyBoxComponent } from "@components/advertisement/EmptyListComponent";
import LoadingSpinner from "./loadingSpinner";
import { convertToPersianDigits, formatAmount } from "@lib/utils";
import { useToastContext } from "@react/context/ToastContext";
import { useGetpayments } from "@react/api/advertisement";
import { UserPaymentsList } from "@lib/types";

const headers: { label: string; key: keyof UserPaymentsList }[] = [
  { label: "شماره تراکنش", key: "payment_code" },
  { label: "پذیرنده", key: "payment_gateway" },
  { label: "مبلغ (تومان)", key: "payment_amount" },
];

const Table = () => {
  const { addToast } = useToastContext();
  const [selectedRow, setSelectedRow] = useState<UserPaymentsList | null>(null);
  const { data, isLoading, isError } = useGetpayments();

  if (isError) {
    addToast({
      title: "خطا در دریافت لیست سوابق پرداخت",
      status: "error",
    });
  }

  const renderHeaders = useMemo(
    () =>
      headers.map((header) => (
        <th
          key={String(header.key)}
          className="border-b border-[var(--border-bg)] px-4 py-3 text-center text-xs font-medium tracking-wider text-[--secondary-color]"
        >
          {header.label}
        </th>
      )),
    [],
  );

  const renderRows = useMemo(() => {
    if (!data?.length) return null;

    return data.map((row, rowIndex) => (
      <tr
        key={rowIndex}
        className="h-[60px] cursor-pointer transition-colors hover:bg-[var(--secondary-bg)]"
        onClick={() => setSelectedRow(row)}
      >
        {headers.map((header) => (
          <td
            key={`${String(header.key)}-${rowIndex}`}
            className="border-b border-[var(--border-bg)] px-4 py-3 text-center text-sm text-[var(--primary-color)]"
          >
            {header.key === "payment_amount"
              ? convertToPersianDigits(formatAmount(row[header.key]))
              : (convertToPersianDigits(row[header.key]) as React.ReactNode)}
          </td>
        ))}
      </tr>
    ));
  }, [data]);

  const closeBottomSheet = useCallback(() => setSelectedRow(null), []);

  return isLoading ? (
    <LoadingSpinner />
  ) : data?.length === 0 ? (
    <EmptyBoxComponent title="سابقه پرداختی یافت نشد" />
  ) : (
    <div className="w-full">
      <table className="w-full border-collapse">
        <thead className="sticky top-0 z-10 rounded-xl">
          <tr className="bg-[var(--cards-bg)]">{renderHeaders}</tr>
          <tr>
            <td
              colSpan={headers.length}
              className="h-4 border-none bg-transparent p-0"
              style={{ lineHeight: 0 }}
            />
          </tr>
        </thead>
        <tbody className="rounded-xl border border-[var(--border-bg)]">
          {renderRows}
        </tbody>
      </table>

      {selectedRow && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={closeBottomSheet}
          role="presentation"
        />
      )}

      <div
        className={`fixed inset-x-0 bottom-0 z-[1000] min-h-[232px] rounded-t-[14px] bg-[var(--cards-bg)] shadow-lg transition-transform ${
          selectedRow ? "translate-y-0" : "translate-y-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="h-full overflow-y-auto">
          {selectedRow && (
            <div className="grid h-full gap-3">
              <div className="flex h-[56px] items-center justify-between border-b border-[var(--border-bg)] px-4 py-3">
                <div className="flex items-center gap-3">
                  <p className="text-lg font-medium text-[var(--primary-color)]">
                    جزییات
                  </p>
                  <button
                    className="flex h-8 cursor-pointer items-center justify-between rounded-[6px] border border-[var(--light-green-bg)] px-3 text-xs text-[var(--light-green-bg)]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    دانلود فاکتور
                  </button>
                </div>
                <button
                  className="flex h-12 w-12 items-center justify-center"
                  onClick={closeBottomSheet}
                  aria-label="بستن جزئیات"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="px-4 text-[13px]">
                <div className="flex h-10 items-center justify-between">
                  <p className="text-[var(--secondary-color)]">نام بسته</p>
                  <p className="text-[var(--primary-color)]">بسته پیش فرض</p>
                </div>
                <div className="flex h-10 items-center justify-between">
                  <p className="text-[var(--secondary-color)]">
                    مالیات بر ارزش افزوده (۱۰٪)
                  </p>
                  <p className="text-[var(--primary-color)]">
                    {convertToPersianDigits(
                      formatAmount(
                        Number(selectedRow.payment_amount || 0) * 0.1,
                      ),
                    )}{" "}
                    تومان
                  </p>
                </div>
                <div className="flex h-10 items-center justify-between text-sm font-medium">
                  <p className="text-[var(--secondary-color)]">مبلغ کل</p>
                  <p className="text-[var(--primary-color)]">
                    {convertToPersianDigits(
                      formatAmount(
                        Number(selectedRow.payment_amount || 0) +
                          Number(selectedRow.payment_amount || 0) * 0.1,
                      ),
                    )}{" "}
                    تومان
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Table);
