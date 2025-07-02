import {
  AdevertisementFeaturesList,
  AdevertisementFeaturesListProps,
} from "@lib/types";
import React from "react";

const AdevertisementFeaturesListComponent: React.FC<
  AdevertisementFeaturesListProps
> = ({ title }) => {
  const adevertisementFeatures = [{ label: "وضعیت ظاهری", value: "در حد نو" },{label:"مایل به معاوضه",value:"هستم"}];
  return (
    <div className="flex w-full flex-col">
      <p className="w-full pb-4 font-medium">{title}</p>
      {adevertisementFeatures?.map(
        (row: AdevertisementFeaturesList, index: number) => (
          <div key={index} className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-[5px] w-[5px] rounded-full bg-[var(--light-green-bg)]"></span>
              <span className="text-sm text-[var(--secondary-color)]">
                {row.label}
              </span>
            </div>
            <span className="text-sm text-[var(--primary-color)]">
              {row.value}
            </span>
          </div>
        ),
      )}
    </div>
  );
};
export default AdevertisementFeaturesListComponent;
