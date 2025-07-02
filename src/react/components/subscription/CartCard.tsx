import React from "react";
import { PackageCartCardProps } from "@lib/types";
import { convertToPersianDigits, formatNumber } from "@lib/utils";

const CartCard: React.FC<PackageCartCardProps> = React.memo(
  ({ data: { packageName, packagePrice, tax, discount } }) => {
    const payableAmount = packagePrice + tax - (discount ? 10000 : 0);
    return (
      <div className="mt-6 flex w-full flex-col items-center justify-start rounded-lg bg-[var(--cards-bg)] px-3 py-4">
        <p className="mb-6 block h-[30px] w-full text-lg leading-[30px] font-medium text-[var(--primary-color)]">
          جزئیات خرید
        </p>
        <div className="mb-5 flex w-full flex-col gap-4 border-b border-[var(--border-bg)] pb-5 text-sm text-[var(--primary-color)]">
          <div className="flex h-[18px] w-full items-center justify-between">
            <p>نام بسته</p>
            <p>{convertToPersianDigits(packageName)}</p>
          </div>
          <div className="flex h-[18px] w-full items-center justify-between">
            <p>قیمت</p>
            <p className="flex items-center gap-1">
              {convertToPersianDigits(formatNumber(packagePrice))}
              <span className="text-xs">ریال</span>
            </p>
          </div>
          <div className="flex h-[18px] w-full items-center justify-between">
            <p>مالیات بر ارزش افزوده</p>
            <p className="flex items-center gap-1">
              {convertToPersianDigits(formatNumber(tax))}
              <span className="text-xs">ریال</span>
            </p>
          </div>
          {discount ? (
            <div className="flex h-[18px] w-full items-center justify-between">
              <p>تخفیف</p>
              <p className="flex items-center gap-1">
                {convertToPersianDigits(formatNumber(10000))}
                <span className="text-xs">ریال</span>
              </p>
            </div>
          ) : null}
        </div>
        <div className="flex h-[21px] w-full items-center justify-between text-[var(--light-green-bg)]">
          <p>مبلغ قابل پرداخت</p>
          <p className="flex items-center gap-1">
            {convertToPersianDigits(formatNumber(payableAmount))}
            <span className="text-xs">ریال</span>
          </p>
        </div>
      </div>
    );
  },
);

CartCard.displayName = "CartCard";

export default CartCard;
