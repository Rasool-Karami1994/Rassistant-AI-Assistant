import { CardListProps } from "@lib/types";

const CardList = ({ items, selectedId, onSelect }: CardListProps) => {
  return (
    <div className="w-full border-b border-[#303038] pb-8">
      <div className="w-full space-y-3 border-b border-[#303038] px-4">
        {items.map((item) => {
          const isActive = selectedId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`flex h-[73px] w-full cursor-pointer items-center justify-between rounded-xl p-4 transition-all ${isActive ? "border-[1.5px] border-[var(--light-green-bg)]" : "border border-[var(--secondary-border-color)]"}`}
            >
              <div className="flex flex-1 flex-col items-start gap-2">
                <p className="text=[var(--primary-color)] text-[13px] font-medium">
                  {item.title}
                </p>
                <p className="text-xs font-normal text-[var(--secondary-color)]">
                  {item.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${isActive ? "border-[var(--light-green-bg)]" : "border-[var(--secondary-border-color)]"}`}
                >
                  {isActive && (
                    <div className="h-3 w-3 rounded-full bg-[var(--light-green-bg)]" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CardList;
