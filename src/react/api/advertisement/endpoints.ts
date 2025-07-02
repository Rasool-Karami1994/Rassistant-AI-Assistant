//Firt AxiosInstance endpoints

export const advertisementList = () => "advertisement";
export const editAddEndpoint = (id: string) => `advertisement/${id}`;
export const workHour = () => "work-hours";
export const workHourItem = (id: string) => `work-hours/${id}`;

//Second AxiosInstance endpoints
export const advertisementAdditionalItems = () =>
  "advertisementAdditionalItems";
export const advertisementAdditionalItem = (id: string) =>
  `advertisementAdditionalItems/${id}`;

export const advertisementInstructions = () => "advertisementInstruction";
export const advertisementInstruction = (id: string) =>
  `advertisementInstruction/${id}`;

//Third AxiosInstance endpoints
export const packageData = () => "package";
export const payments = () => "payments";

//Fourth AxiosInstance endpoints
export const information = () => "information";
export const editInformation = (id: string) => `information/${id}`;
