import AdevertisementFeaturesListComponent from "@components/AdevertisementFeaturesListComponent";
import useAdvertisementStore from "@react/store/useAdvertisementStore";
import { convertToPersianDigits, timeAgoInPersian } from "@lib/utils";

export const InformationTab = () => {
  const selectedAdvertisement = useAdvertisementStore(
    (state) => state.selectedAdvertisement,
  );
  return (
    <div className="w-full flex-col items-center justify-start">
      <div className="border-b-custom w-full flex-col items-center justify-start pb-6">
        <div className="w-full flex-col items-center justify-start px-4">
          <img
            src={
              selectedAdvertisement?.images
                ? selectedAdvertisement?.images
                : "/images/temp/cupyarImageAlternative.png"
            }
            alt="add s image"
            className="h-[328px] w-full object-cover transition-all duration-500 ease-in-out"
          />
          <p className="mt-4 mb-1 w-full text-lg leading-7 font-medium break-words whitespace-normal text-[var(--primary-color)]">
            {selectedAdvertisement?.title &&
              convertToPersianDigits(selectedAdvertisement?.title)}
          </p>
          <p className="mt-4 mb-1 w-full text-sm leading-6 font-normal text-[#9D9DB2]">
            {selectedAdvertisement?.first_publish_at
              ? timeAgoInPersian(selectedAdvertisement?.first_publish_at)
              : "-"}
            {"  "}-{"  "}
            {selectedAdvertisement?.city
              ? convertToPersianDigits(selectedAdvertisement?.city)
              : "اصفهان"}
          </p>
        </div>
      </div>
      <div className="border-b-custom py-6">
        <div className="px-4">
          <AdevertisementFeaturesListComponent />
        </div>
      </div>

      <div className="py-6">
        <div className="w-full flex-col px-4 pb-6">
          <p className="w-full pb-4 font-medium text-[var(--primary-color)]">
            توضیحات
          </p>
          <p className="w-full leading-[26px] font-medium text-[var(--primary-color)]">
            {selectedAdvertisement?.description &&
              convertToPersianDigits(selectedAdvertisement?.description)}
          </p>
        </div>
      </div>
    </div>
  );
};
