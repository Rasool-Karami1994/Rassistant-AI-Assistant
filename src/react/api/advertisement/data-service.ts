import { apiClient1, apiClient2, apiClient3, apiClient4 } from "@api";
import {
  advertisementAdditionalItem,
  advertisementAdditionalItems,
  advertisementInstruction,
  advertisementInstructions,
  advertisementList,
  editAddEndpoint,
  editInformation,
  information,
  packageData,
  payments,
  workHour,
  workHourItem,
} from "./endpoints";
import {
  AdvertismentAdditionalItemPayload,
  AdvertismentAdditionalItemResponse,
  AdvertismentInstructionResponse,
  CreateWorkHour,
  EditAdvrtisementInstructionPayload,
  InformationFormValues,
  InformationFormValuesPayload,
  WorkHoursResponse,
} from "@lib/types";

//firt AxiosInstance services

export const fetchAdvertisementList = async (searchQuery?: string) => {
  const baseUrl = advertisementList();
  const url = searchQuery
    ? `${baseUrl}?search=${encodeURIComponent(searchQuery)}`
    : baseUrl;
  const response = await apiClient1.get(url);
  return response?.data;
};

export const editAdvertisementList = async (
  token: string,
  body: { enable: boolean },
): Promise<void> => {
  const response = await apiClient1.put(editAddEndpoint(token), body);
  return response.data;
};

export const editWelcomeMessage = async (
  token: string,
  body: { welcome_message: string },
): Promise<void> => {
  const response = await apiClient1.put(editAddEndpoint(token), body);
  return response.data;
};
export const fetchWorkHours = async () => {
  const response = await apiClient1.get(workHour());
  return response?.data;
};
export const addWorkHour = async (
  body: CreateWorkHour,
): Promise<WorkHoursResponse> => {
  const response = await apiClient1.post(workHour(), body);
  return response.data;
};
export const patchWorkHour = async (
  id: string,
  body: CreateWorkHour,
): Promise<WorkHoursResponse> => {
  const response = await apiClient1.put(workHourItem(id), body);

  return response.data;
};
export const deleteWorkHour = async (
  id: string,
): Promise<WorkHoursResponse> => {
  const response = await apiClient1.delete(workHourItem(id));
  return response.data;
};

//second AxiosInstance services
export const fetchAdvertisementAdditionalItems = async () => {
  const response = await apiClient2.get(advertisementAdditionalItems());
  return response?.data;
};
export const patchAdvertisementAdditionalItem = async (
  id: string,
  body: AdvertismentAdditionalItemPayload,
): Promise<AdvertismentAdditionalItemResponse[]> => {
  const response = await apiClient2.put(advertisementAdditionalItem(id), body);

  return response.data;
};
export const deleteAdvertisementAdditionalItem = async (
  id: string,
): Promise<AdvertismentAdditionalItemResponse[]> => {
  const response = await apiClient2.delete(advertisementAdditionalItem(id));
  return response.data;
};
export const addAdvertisementAdditionalItem = async (
  body: AdvertismentAdditionalItemPayload,
): Promise<AdvertismentAdditionalItemResponse[]> => {
  const response = await apiClient2.post(advertisementAdditionalItems(), body);
  return response.data;
};

export const fetchAdvertisementInstructions = async () => {
  const response = await apiClient2.get(advertisementInstructions());
  return response?.data;
};
export const patchAdvertisementInstruction = async (
  id: string,
  body: EditAdvrtisementInstructionPayload,
): Promise<AdvertismentInstructionResponse[]> => {
  const response = await apiClient2.put(advertisementInstruction(id), body);

  return response.data;
};
export const deleteAdvertisementInstruction = async (
  id: string,
): Promise<AdvertismentInstructionResponse[]> => {
  const response = await apiClient2.delete(advertisementInstruction(id));
  return response.data;
};
export const addAdvertisementInstruction = async (
  body: EditAdvrtisementInstructionPayload,
): Promise<AdvertismentInstructionResponse[]> => {
  const response = await apiClient2.post(advertisementInstructions(), body);
  return response.data;
};

//Third AxiosInstance services
export const fetchActivePackage = async () => {
  const response = await apiClient3.get(packageData());
  return response?.data;
};
export const fetchPayments = async () => {
  const response = await apiClient3.get(payments());
  return response?.data;
};

//Fourth AxiosInstance services
export const fetchInformationFormData = async () => {
  const response = await apiClient4.get(information());
  return response?.data;
};
export const addInforamtionFormData = async (
  body: InformationFormValuesPayload,
): Promise<InformationFormValues[]> => {
  const response = await apiClient4.post(information(), body);
  return response.data;
};

export const patchInforamtionFormData = async (
  id: string,
  body: InformationFormValuesPayload,
): Promise<InformationFormValues[]> => {
  const response = await apiClient4.put(editInformation(id), body);

  return response.data;
};
