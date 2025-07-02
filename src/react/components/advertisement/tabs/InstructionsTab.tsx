import AdditionalItemList from "../AdditionalItemList";
import { EmptyBoxComponent } from "../EmptyListComponent";
import { HistoryState, useNavigate, useParams } from "@tanstack/react-router";
import { Route as NewAdvertisementInstructionFormImport } from "@react/routes/newAdvertisementInstructionForm";
import AdvertisementHeader from "../AdvertisementHeader";
import { useGetadvertisementInstructions } from "@react/api/advertisement";
import LoadingSpinner from "@ui/loadingSpinner";
import { useToastContext } from "@react/context/ToastContext";
import { AdvertismentInstructionResponse } from "@lib/types";

const InstructionsTab = () => {
  const navigate = useNavigate();
  const { advertisement_id } = useParams({ strict: false });
  const { data, isLoading, isError } = useGetadvertisementInstructions();
  const { addToast } = useToastContext();

  if (isError) {
    addToast({
      title: "خطا در دریافت لیست دستورالعمل ها",
      status: "error",
    });
  }
  interface NavigationState extends HistoryState {
    id: string;
  }

  const instructions = data || [];

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-start gap-3 px-4">
      <AdvertisementHeader
        title="دستورالعمل"
        onAddClick={() =>
          navigate({
            to: NewAdvertisementInstructionFormImport.to,
            state: {
              id: advertisement_id,
            } as NavigationState,
          })
        }
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : instructions.length === 0 ? (
        <EmptyBoxComponent title="هیچ دستورالعملی اضافه نشده" />
      ) : (
        <AdditionalItemList
          items={instructions as AdvertismentInstructionResponse[]}
        />
      )}
    </div>
  );
};

export default InstructionsTab;
