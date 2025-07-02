import React from "react";
import { AdditionalItemListProps } from "@lib/types";
import AdditionalItemCard from "./AdditionalItemCard";

const AdditionalItemList: React.FC<AdditionalItemListProps> = ({
  items,
  onEditItem,
}) => {
  return (
    <>
      {items.map((item) => (
        <AdditionalItemCard key={item.id} {...item} onEdit={onEditItem} />
      ))}
    </>
  );
};

export default AdditionalItemList;
