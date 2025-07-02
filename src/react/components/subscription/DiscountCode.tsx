import React, { useState } from "react";
import { DiscountCardProps } from "@lib/types";
import { CheckCircle } from "lucide-react";
import Button from "@ui/button";

const DiscountCode: React.FC<DiscountCardProps> = React.memo(
  ({ setDiscount }) => {
    const [discountCode, setDiscountCode] = useState("");
    const [isApplied, setIsApplied] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleApplyDiscount = () => {
      if (discountCode.trim() !== "") {
        setDiscount(discountCode);
        setIsApplied(true);
        setHasError(false);
      } else {
        setHasError(true);
      }
    };

    return (
      <div className="mt-6 w-full space-y-6 rounded-lg bg-[var(--cards-bg)] px-3 py-4">
        <p className="block h-[30px] w-full text-lg leading-[30px] font-medium text-[var(--primary-color)]">
          کد تخفیف
        </p>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="کد تخفیف وارد کنید"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            disabled={isApplied}
            className="block min-h-12 w-full rounded-lg bg-[#2E2E36] p-3 pr-3 pl-20 text-sm text-[var(--primary-color)] focus:outline-none"
          />
          {isApplied ? (
            <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3">
              <CheckCircle className="text-[var(--light-green-bg)]" size={24} />
            </div>
          ) : (
            <Button
              variant="primary"
              onClick={handleApplyDiscount}
              label="بررسی"
              className="absolute inset-y-0 left-0 mt-1 ml-1 flex items-center justify-center px-4"
            />
          )}
        </div>
        {hasError && (
          <p className="-mt-4 text-xs text-[var(--danger-color)]">
            کد اشتباه است
          </p>
        )}
      </div>
    );
  },
);

DiscountCode.displayName = "DiscountCode";

export default DiscountCode;
