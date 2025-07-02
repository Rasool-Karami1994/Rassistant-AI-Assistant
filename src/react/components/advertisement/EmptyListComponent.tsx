import { EmptyBoxIcon } from "@components/icons";
import { EmptyBoxComponentProps } from "@lib/types";

export const EmptyBoxComponent: React.FC<EmptyBoxComponentProps> = ({
  title,
}) => {
  return (
    <div className="mt-6 flex h-[110px] w-full flex-col items-center justify-center gap-4 rounded-lg bg-[var(--cards-bg)]">
      <span className="flex h-8 w-8 items-center justify-center text-[#878799]">
        <EmptyBoxIcon className="h-7 w-7" />
      </span>
      <p className="w-full text-center text-sm leading-[22px] text-[var(--primary-color)]">
        {title}
      </p>
    </div>
  );
};
