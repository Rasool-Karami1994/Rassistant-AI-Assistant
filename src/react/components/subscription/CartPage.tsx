import Button from "@ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "@tanstack/react-router";
import CartCard from "./CartCard";
import DiscountCode from "./DiscountCode";
import { useState } from "react";
import { CartPageProps } from "@lib/types";

const CartPage = ({ cartData }: CartPageProps) => {
  const router = useRouter();
  const [discount, setDiscount] = useState<string>("");

  const handleGoBack = () => {
    router.history.back();
  };

  const packageName =
    cartData && cartData.number_of_chats
      ? `${cartData.number_of_chats} آگهی`
      : "آگهی پیش فرض";
  const packagePrice = cartData ? cartData.amount : 0;
  const tax = packagePrice * 0.1;

  return (
    <div className="flex h-screen w-full flex-col items-center justify-start bg-[var(--primary-bg)] px-4 py-4 pb-6">
      <div className="block w-full">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--dropdown-bg)] text-white"
          onClick={handleGoBack}
        >
          <ArrowRight size={20} />
        </button>
      </div>

      <CartCard
        data={{
          packageName: packageName,
          packagePrice: packagePrice,
          tax: tax,
          discount: discount,
        }}
      />

      <DiscountCode setDiscount={setDiscount} />

      <div className="mt-10 w-full">
        <Button
          variant="primary"
          width="w-full"
          label="تغییر یا خرید بسته"
          onClick={handleGoBack}
        />
      </div>
    </div>
  );
};

export default CartPage;
