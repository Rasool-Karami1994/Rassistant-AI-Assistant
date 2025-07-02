import { ProgressBarProps } from "@lib/types";
import { convertToPersianDigits } from "@lib/utils";

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, total }) => {
  const percentage = convertToPersianDigits(
    total > 0 ? Math.min(100, (progress / total) * 100) : 0,
  );

  return (
    <div className="w-full space-y-3">
      <div className="flex justify-between text-sm font-normal text-[var(--primary-color)]">
        <span>تعداد آگهی ها</span>
        <span>
          {convertToPersianDigits(progress)}/{convertToPersianDigits(total)}
        </span>
      </div>

      <div className="h-[6px] w-full rounded-full bg-[var(--dropdown-bg)]">
        <div
          className="h-full rounded-full bg-[var(--light-green-bg)] transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
