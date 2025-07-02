import { SimpleHeaderWIthBackProps } from "@lib/types";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Route as appAdvertisementAdvertisementidIndexImport } from "@react/routes/(app)/advertisement/$advertisement_id";

export const SimpleHeaderWIthBack: React.FC<SimpleHeaderWIthBackProps> = ({
  title,
  id,
}) => {
  const navigate = useNavigate();
  const router = useRouter();

  return (
    <div className="relative flex h-[72px] w-full items-center justify-center text-lg font-medium text-[var(--primary-color)]">
      <button
        className="absolute right-0 flex h-12 w-12 items-center justify-start text-[var(--secondary-color)]"
        onClick={() =>
          id
            ? navigate({
                to: appAdvertisementAdvertisementidIndexImport.to,
                params: {
                  advertisement_id: `${id}`,
                },
              })
            : router.history.back()
        }
      >
        <ArrowRight size={20} />
      </button>
      <p>{title}</p>
    </div>
  );
};
