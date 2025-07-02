import React, { useState } from "react";
import WithToolTipButton from "@components/WithTooltipButton";
import {
  AdditionalItemsInformationCardExtendedProps,
  DropdownMenuItem,
} from "@lib/types";
import { Edit, Ellipsis, Trash } from "lucide-react";
import DropdownMenu from "@ui/dropDownMenu";
import { ConfirmationDialog } from "@ui/ConfirmationDialog";
import { useToastContext } from "@react/context/ToastContext";
import { useDeleteAdditionalItems } from "@react/api/advertisement/mutations";

export const InformationItemCard: React.FC<
  AdditionalItemsInformationCardExtendedProps
> = ({ containerClassName = "", onEdit, id, description, post }) => {
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const { addToast } = useToastContext();

  const { mutate: deleteAdvertisementInformation } = useDeleteAdditionalItems();

  const handleDelete = () => {
    deleteAdvertisementInformation(
      { id: id },
      {
        onSuccess: () => {
          addToast({
            title: "آیتم موردنظر با موفقیت حذف شد",
            status: "success",
          });
        },
        onError: () => {
          addToast({
            title: "خطا در حذف آیتم موردنظر",
            status: "error",
          });
        },
      },
    );
    setDialogOpen(false);
  };

  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setDropdownVisible((prev) => !prev);
  };

  const dropdownItems: DropdownMenuItem[] = [
    {
      label: "ویرایش",
      onClick: () => {
        if (onEdit) {
          onEdit(description || "", id, post);
        }
      },
      icon: <Edit size={16} />,
    },
    {
      label: "حذف",
      onClick: () => setDialogOpen(true),
      icon: <Trash size={16} />,
    },
  ];

  return (
    <div
      id={`${id}`}
      className={`flex w-full rounded-lg bg-[var(--cards-bg)] p-3 text-sm leading-6 text-[var(--primary-color)] ${containerClassName}`}
    >
      {description && (
        <div className="mt-2 flex w-full flex-1 font-normal text-[var(--secondary-color)]">
          {description}
        </div>
      )}
      <div className="relative flex items-center gap-2">
        <WithToolTipButton label="گزینه های بیشتر">
          <button
            className="left-0 flex h-8 w-8 cursor-pointer items-center justify-center text-[var(--placeholder-color)]"
            onClick={toggleDropdown}
          >
            <Ellipsis size={16} />
          </button>
        </WithToolTipButton>
        <DropdownMenu
          items={dropdownItems}
          isVisible={isDropdownVisible}
          onClose={() => setDropdownVisible(false)}
          className="origin-top-right"
        />
      </div>

      <ConfirmationDialog
        open={isDialogOpen}
        onOpenChange={setDialogOpen}
        description="آیا از حذف این آیتم مطمئن هستید؟"
        onDelete={handleDelete}
      />
    </div>
  );
};

export default InformationItemCard;
