import {
  AdvertisementListApiResponse,
  AdvertismentAdditionalItemResponse,
  AdvertismentInstructionResponse,
  InformationFormValues,
  UserPackage,
  UserPaymentsList,
  WorkHoursResponse,
} from "@lib/types";
import { useQuery } from "@tanstack/react-query";
import {
  fetchActivePackage,
  fetchAdvertisementAdditionalItems,
  fetchAdvertisementInstructions,
  fetchAdvertisementList,
  fetchInformationFormData,
  fetchPayments,
  fetchWorkHours,
} from "./data-service";

//first AxiosInstance queries

export const useGetAdvertisementList = (searchQuery?: string) => {
  return useQuery<AdvertisementListApiResponse>({
    queryKey: ["advertisementList", searchQuery],
    queryFn: () => fetchAdvertisementList(searchQuery),
  });
};
export const useGetWorkHours = () => {
  return useQuery<WorkHoursResponse[]>({
    queryKey: ["workHoursList"],
    queryFn: fetchWorkHours,
  });
};

//second AxiosInstance queries
export const useGetAdvertisementAdditionalItems = () => {
  return useQuery<AdvertismentAdditionalItemResponse[]>({
    queryKey: ["advertisementAdditionalItems"],
    queryFn: fetchAdvertisementAdditionalItems,
  });
};
export const useGetadvertisementInstructions = () => {
  return useQuery<AdvertismentInstructionResponse[]>({
    queryKey: ["advertisementInstruction"],
    queryFn: fetchAdvertisementInstructions,
  });
};

//Third AxiosInstance queries
export const useGetActivePackage = () => {
  return useQuery<UserPackage[]>({
    queryKey: ["packageData"],
    queryFn: fetchActivePackage,
  });
};
export const useGetpayments = () => {
  return useQuery<UserPaymentsList[]>({
    queryKey: ["payments"],
    queryFn: fetchPayments,
  });
};

//Fourth AxiosInstance queries
export const useGetInformationFormData = () => {
  return useQuery<InformationFormValues[]>({
    queryKey: ["information"],
    queryFn: fetchInformationFormData,
  });
};
