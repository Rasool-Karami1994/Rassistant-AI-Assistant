import { create } from "zustand";
import { AdvertisementListApiResponse, AdvertismentResponse } from "@lib/types";

interface AdvertisementStore {
  advertisements: AdvertisementListApiResponse | [];
  setAdvertisementList: (item: AdvertisementListApiResponse) => void;
  userId: number;
  selectedAdvertisement: AdvertismentResponse | null;
  setSelectedAdvertisement: (item: AdvertismentResponse) => void;
}

const useAdvertisementStore = create<AdvertisementStore>((set) => ({
  selectedAdvertisement: null,
  setAdvertisementList: (item: AdvertisementListApiResponse) =>
    set(() => ({
      advertisements: item,
    })),
  userId: 1, //has been hardcoded from Pooyan's Acount
  setSelectedAdvertisement: (item: AdvertismentResponse) =>
    set(() => ({
      selectedAdvertisement: item,
    })),
  advertisements: [],
}));

export default useAdvertisementStore;
