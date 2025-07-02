import React, { useState, useRef, useLayoutEffect } from "react";
import WithToolTipButton from "@components/WithTooltipButton";
import { AdditionalItemCardExtendedProps, DropdownMenuItem } from "@lib/types";
import { Edit, Ellipsis, Trash, ChevronDown } from "lucide-react";
import DropdownMenu from "@ui/dropDownMenu";
import { ConfirmationDialog } from "@ui/ConfirmationDialog";
import { HistoryState, useNavigate } from "@tanstack/react-router";
import { Route as AdvertismentInstructionEditFormImport } from "@react/routes/$advertismentInstructionEditForm";
import { useToastContext } from "@react/context/ToastContext";
import { useDeleteAdvertisementInstruction } from "@react/api/advertisement/mutations";

export const AdditionalItemCard: React.FC<AdditionalItemCardExtendedProps> = ({
  containerClassName = "",
  onEdit,
  id,
  post,
  question,
  answer,
}) => {
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showChevron, setShowChevron] = useState<boolean>(false);
  const navigate = useNavigate();
  const measureContentRef = useRef<HTMLDivElement>(null);
  const measureSubContentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!answer) {
      setShowChevron(false);
      return;
    }
    let contentOverflow = false;
    let subContentOverflow = false;
    if (measureContentRef.current) {
      contentOverflow = measureContentRef.current.scrollHeight > 56;
    }
    if (answer && measureSubContentRef.current) {
      subContentOverflow = measureSubContentRef.current.scrollHeight > 96;
    }
    setShowChevron(contentOverflow || subContentOverflow);
  }, [question, answer]);

  const { mutate } = useDeleteAdvertisementInstruction();
  const { addToast } = useToastContext();

  const handleDelete = () => {
    if (id) {
      mutate(
        { id },
        {
          onSuccess: () => {
            addToast({
              title: "با موفقیت حذف شد",
              status: "success",
            });
          },
          onError: () => {
            addToast({
              title: "خطا در حذف آیتم مورد نظر",
              status: "error",
            });
          },
        },
      );
    }
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
          onEdit(question);
        } else {
          navigate({
            to: AdvertismentInstructionEditFormImport.to,
            params: { advertismentInstructionEditForm: `${id}` },
            state: {
              question: question,
              assistantAnswer: answer,
              id: id,
              post,
            } as unknown as HistoryState,
          });
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
      className={`relative flex w-full flex-col rounded-lg bg-[var(--cards-bg)] p-3 text-sm leading-6 text-[var(--primary-color)] ${containerClassName}`}
    >
      {answer && (
        <div
          ref={measureContentRef}
          style={{
            visibility: "hidden",
            position: "absolute",
            zIndex: -1,
            whiteSpace: "normal",
            overflow: "visible",
          }}
          className="font-medium"
        >
          {question}
        </div>
      )}
      {answer && (
        <div
          ref={measureSubContentRef}
          style={{
            visibility: "hidden",
            position: "absolute",
            zIndex: -1,
            whiteSpace: "normal",
            overflow: "visible",
          }}
          className="font-normal"
        >
          {answer}
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div
          className="flex flex-1 font-medium"
          style={
            answer && !isExpanded
              ? {
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                }
              : {}
          }
        >
          {question}
        </div>
        <div className="relative flex items-center gap-2">
          {answer && showChevron && (
            <button
              className="flex h-8 w-8 cursor-pointer items-center justify-center text-[var(--placeholder-color)]"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              <ChevronDown
                size={16}
                className={isExpanded ? "rotate-180" : ""}
              />
            </button>
          )}
          <WithToolTipButton label="گزینه های بیشتر">
            <button
              className="flex h-8 w-8 cursor-pointer items-center justify-center text-[var(--placeholder-color)]"
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
      </div>

      {answer && (
        <div
          className="mt-2 w-full font-normal text-[var(--secondary-color)]"
          style={
            !isExpanded
              ? {
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  overflow: "hidden",
                }
              : {}
          }
        >
          {answer}
        </div>
      )}
      <ConfirmationDialog
        open={isDialogOpen}
        onOpenChange={setDialogOpen}
        description="آیا از حذف این آیتم مطمئن هستید؟"
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdditionalItemCard;
