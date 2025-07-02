import { useEffect, useRef, useState } from "react";
import { CardItem, WorkHoursResponse } from "@lib/types";
import CardList from "../CardsList";
import AdvertisementHeader from "@components/advertisement/AdvertisementHeader";
import AssistantWorkingHoursCard from "../AssistantWorkingHoursCard";
import useAdvertisementStore from "@react/store/useAdvertisementStore";
import LoadingSpinner from "@ui/loadingSpinner";
import { EmptyBoxComponent } from "@components/advertisement/EmptyListComponent";
import { useToastContext } from "@react/context/ToastContext";
import { convertToEnglishDigits } from "@lib/utils";
import { useGetWorkHours } from "@react/api/advertisement";
import {
  useAddWorkHour,
  useDeleteWorkHour,
  useEditWorkHour,
} from "@react/api/advertisement/mutations";

type WorkHourCardExtended = WorkHoursResponse & { draft?: boolean };

const AssistantWorkingHoursTab = () => {
  const { data, isLoading, isError } = useGetWorkHours();
  const [selectedId, setSelectedId] = useState<string | null>(
    data && data?.length > 0 ? "1" : "2",
  );
  const [cards, setCards] = useState<WorkHourCardExtended[]>([]);
  const [cardCounter, setCardCounter] = useState<number>(1000);
  const { userId } = useAdvertisementStore();
  const { mutate: createWorkHour } = useAddWorkHour();
  const { mutate: deleteWorkHour } = useDeleteWorkHour();
  const { mutate: editWorkHour } = useEditWorkHour();
  const listContainerRef = useRef<HTMLDivElement>(null);
  const prevCardsLengthRef = useRef<number>(0);
  const { addToast } = useToastContext();
  if (isError) {
    addToast({
      title: "خطا در دریافت لیست ساعت کاری",
      status: "error",
    });
  }
  useEffect(() => {
    if (data?.length) {
      const fetchedCards = data.map((card: WorkHoursResponse) => ({
        ...card,
        draft: false,
      }));
      setCards(fetchedCards);
    }
  }, [data]);

  useEffect(() => {
    if (listContainerRef.current && cards.length > prevCardsLengthRef.current) {
      listContainerRef.current.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
    prevCardsLengthRef.current = cards.length;
  }, [cards]);

  const items: CardItem[] = [
    {
      id: "1",
      title: "همیشگی",
      subtitle: "در هر زمان و تاریخ دستیار به جای شما پاسخ می‌دهد",
    },
    {
      id: "2",
      title: "زمان مشخص",
      subtitle: "در زمان و تاریخ مشخص دستیار فعال می‌باشد",
    },
  ];

  const handleAddCard = () => {
    if (!userId) return;
    const newId = cardCounter;
    const newCard: WorkHourCardExtended = {
      id: newId,
      days_of_week: ["saturday"],
      start_time: "09:00",
      end_time: "17:00",
      user: userId,
      is_active: false,
      draft: true,
    };
    setCards((prev) => [...prev, newCard]);
    setCardCounter((prev) => prev + 1);

    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleDeleteCard = (cardId: number, draft?: boolean) => {
    if (draft) {
      setCards((prev) => prev.filter((card) => card.id !== cardId));
      return;
    }
    deleteWorkHour(
      { id: `${cardId}` },
      {
        onSuccess: () => {
          setCards((prev) => prev.filter((card) => card.id !== cardId));
          addToast({
            title: "ساعت کاری با موفقیت حذف شد",
            status: "success",
          });
        },
        onError: () => {
          addToast({
            title: "خطا در حذف ساعت کاری",
            status: "error",
          });
        },
      },
    );
  };

  const handleConfirmDraft = (
    card: WorkHourCardExtended,
    updatedData: {
      days_of_week: string[];
      start_time: string;
      end_time: string;
      is_active: boolean;
    },
  ) => {
    const payload = {
      user: userId,
      days_of_week: updatedData.days_of_week,
      start_time: convertToEnglishDigits(updatedData.start_time)
        ?.replace(/\s*:\s*/g, ":")
        .split(":")
        .reverse()
        .join(":"),
      end_time: convertToEnglishDigits(updatedData.end_time)
        ?.replace(/\s*:\s*/g, ":")
        .split(":")
        .reverse()
        .join(":"),
      is_active: updatedData.is_active,
    };
    createWorkHour(
      { body: payload },
      {
        onSuccess: () => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === card.id
                ? {
                    ...c,
                    ...updatedData,
                    is_active: updatedData.is_active ? true : false,
                    draft: false,
                  }
                : c,
            ),
          );
          addToast({
            title: "ساعت کاری با موفقیت ایجاد شد",
            status: "success",
          });
        },
        onError: () =>
          addToast({
            title: "خطا در ایجاد ساعت کاری",
            status: "error",
          }),
      },
    );
  };

  const handleEditCard = (
    card: WorkHourCardExtended,
    updatedData: {
      days_of_week: string[];
      start_time: string;
      end_time: string;
      is_active: boolean;
    },
  ) => {
    const payload = {
      days_of_week: updatedData.days_of_week,
      start_time: convertToEnglishDigits(updatedData.start_time)
        ?.replace(/\s*:\s*/g, ":")
        .split(":")
        .reverse()
        .join(":"),
      end_time: convertToEnglishDigits(updatedData.end_time)
        ?.replace(/\s*:\s*/g, ":")
        .split(":")
        .reverse()
        .join(":"),
      is_active: updatedData.is_active,
      user: card.user,
    };
    editWorkHour(
      { token: `${card.id}`, body: payload },
      {
        onSuccess: () => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === card.id
                ? {
                    ...c,
                    ...updatedData,
                    is_active: updatedData.is_active ? true : false,
                  }
                : c,
            ),
          );
          addToast({
            title: "ساعت کاری با موفقیت ویرایش شد",
            status: "success",
          });
        },
        onError: () =>
          addToast({
            title: "ویرایش ساعت کاری با خطا مواجه شد",
            status: "error",
          }),
      },
    );
  };

  return (
    <div className="scrollbar-hide max-h-screen overflow-y-auto py-4">
      <CardList
        items={items}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <div
        className={`mb-4 px-4 ${
          selectedId === "1" ? "pointer-events-none brightness-50" : ""
        }`}
      >
        <AdvertisementHeader
          title="انتخاب بازه زمانی"
          onAddClick={handleAddCard}
        />
      </div>
      <div
        ref={listContainerRef}
        className={`h-auto space-y-4 px-4 ${
          selectedId === "1" ? "pointer-events-none brightness-50" : ""
        }`}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : cards?.length === 0 ? (
          <EmptyBoxComponent title="موردی یافت نشد" />
        ) : (
          cards.map((card) => (
            <AssistantWorkingHoursCard
              key={card.id}
              cardData={card}
              onDelete={() => handleDeleteCard(card.id, card.draft)}
              onConfirm={
                card.draft
                  ? (updatedData) => handleConfirmDraft(card, updatedData)
                  : undefined
              }
              onEdit={
                !card.draft
                  ? (updatedData) => handleEditCard(card, updatedData)
                  : undefined
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AssistantWorkingHoursTab;
