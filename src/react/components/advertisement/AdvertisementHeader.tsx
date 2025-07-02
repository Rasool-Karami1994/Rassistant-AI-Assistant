import React from "react";
import { Plus, CircleHelp } from "lucide-react";
import Button from "@ui/button";
import { AdvertisementHeaderProps } from "@lib/types";

const AdvertisementHeader: React.FC<AdvertisementHeaderProps> = ({
  title,
  onAddClick,
}) => {
  return (
    <div className="flex w-full items-center justify-between pt-4">
      <div className="flex items-center gap-2">
        <p className="text-base leading-7 font-medium text-[var(--primary-color)]">
          {title}
        </p>
        <span className="text-[var(--placeholder-color)]">
          <CircleHelp size={18} />
        </span>
      </div>
      <Button
        label="افزودن"
        variant="primary"
        icon={<Plus size={12} />}
        width="w-[100px]"
        onClick={onAddClick}
      />
    </div>
  );
};

export default AdvertisementHeader;
