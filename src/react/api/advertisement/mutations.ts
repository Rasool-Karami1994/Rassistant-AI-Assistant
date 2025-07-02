import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as ds from "./data-service";
import { advertisementQueryKeys } from "./keys";
import {
  AdvertismentAdditionalItemPayload,
  CreateWorkHour,
  EditAdvrtisementInstructionPayload,
  InformationFormValuesPayload,
} from "@lib/types";

//first AxiosInstance mutations

export const useAddsEdit = () => {
  const queryClient = useQueryClient();
  return useMutation<
    unknown,
    unknown,
    { token: string; body: { enable: boolean } },
    unknown
  >({
    mutationFn: ({ token, body }) => ds.editAdvertisementList(token, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: advertisementQueryKeys.advertisementList,
      });
    },
  });
};
export const useAddWelcomeMessage = () => {
  const queryClient = useQueryClient();
  return useMutation<
    unknown,
    unknown,
    { token: string; body: { welcome_message: string } },
    unknown
  >({
    mutationFn: ({ token, body }) => ds.editWelcomeMessage(token, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: advertisementQueryKeys.advertisementList,
      });
    },
  });
};
export const useAddWorkHour = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, { body: CreateWorkHour }, unknown>({
    mutationFn: ({ body }) => ds.addWorkHour(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: advertisementQueryKeys.workHoursList,
      });
    },
  });
};
export const useEditWorkHour = () => {
  const queryClient = useQueryClient();
  return useMutation<
    unknown,
    unknown,
    { token: string; body: CreateWorkHour },
    unknown
  >({
    mutationFn: ({ token, body }) => ds.patchWorkHour(token, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: advertisementQueryKeys.workHoursList,
      });
    },
  });
};
export const useDeleteWorkHour = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, { id: string }, unknown>({
    mutationFn: ({ id }) => ds.deleteWorkHour(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: advertisementQueryKeys.workHoursList,
      });
    },
  });
};

//second AxiosInstance mutations
export const useAdditionalItemsEdit = () => {
  const queryClient = useQueryClient();
  return useMutation<
    unknown,
    unknown,
    { token: string; body: AdvertismentAdditionalItemPayload },
    unknown
  >({
    mutationFn: ({ token, body }) =>
      ds.patchAdvertisementAdditionalItem(token, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: advertisementQueryKeys.advertisementAdditionalItems,
      });
    },
  });
};
export const useDeleteAdditionalItems = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, { id: string }, unknown>({
    mutationFn: ({ id }) => ds.deleteAdvertisementAdditionalItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: advertisementQueryKeys.advertisementAdditionalItems,
      });
    },
  });
};
export const useAddAdditionalItem = () => {
  const queryClient = useQueryClient();
  return useMutation<
    unknown,
    unknown,
    { body: AdvertismentAdditionalItemPayload },
    unknown
  >({
    mutationFn: ({ body }) => ds.addAdvertisementAdditionalItem(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: advertisementQueryKeys.advertisementAdditionalItems,
      });
    },
  });
};

export const useAdvertisementInstructionEdit = () => {
  const queryClient = useQueryClient();
  return useMutation<
    unknown,
    unknown,
    { token: string; body: EditAdvrtisementInstructionPayload },
    unknown
  >({
    mutationFn: ({ token, body }) =>
      ds.patchAdvertisementInstruction(token, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: advertisementQueryKeys.advertisementInstruction,
      });
    },
  });
};
export const useDeleteAdvertisementInstruction = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, { id: string }, unknown>({
    mutationFn: ({ id }) => ds.deleteAdvertisementInstruction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: advertisementQueryKeys.advertisementInstruction,
      });
    },
  });
};
export const useAddAdvertisementInstruction = () => {
  const queryClient = useQueryClient();
  return useMutation<
    unknown,
    unknown,
    { body: EditAdvrtisementInstructionPayload },
    unknown
  >({
    mutationFn: ({ body }) => ds.addAdvertisementInstruction(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: advertisementQueryKeys.advertisementInstruction,
      });
    },
  });
};

//Fourth AxiosInstance mutations
export const useAddInforamtionFormData = () => {
  const queryClient = useQueryClient();
  return useMutation<
    unknown,
    unknown,
    { body: InformationFormValuesPayload },
    unknown
  >({
    mutationFn: ({ body }) => ds.addInforamtionFormData(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: advertisementQueryKeys.information,
      });
    },
  });
};
export const useInforamtionFormDataEdit = () => {
  const queryClient = useQueryClient();
  return useMutation<
    unknown,
    unknown,
    { id: string; body: InformationFormValuesPayload },
    unknown
  >({
    mutationFn: ({ id, body }) => ds.patchInforamtionFormData(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: advertisementQueryKeys.information,
      });
    },
  });
};
