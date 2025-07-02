import React from "react";
import { AdditionalItemsListProps } from "@lib/types";
import InformationItemCard from "./InformationItemCard";

const InformationList: React.FC<AdditionalItemsListProps> = ({
  items,
  onEditItem,
}) => {
  return (
    <>
      {items.map((item) => (
        <InformationItemCard key={item.id} {...item} onEdit={onEditItem} />
      ))}
    </>
  );
};

export default InformationList;
