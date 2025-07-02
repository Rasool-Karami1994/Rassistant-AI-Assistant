export interface SearchBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  containerClassName?: string;
}
export interface AdvertismentMainPageButtonProps {
  title: string;
}
export interface AdvertismentMainPageItemsProps {
  title: string;
  id: string;
  imageUrl: string;
  isActive: boolean;
}
export interface NavItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  to: string;
}
export interface AdvertisementListProps {
  advertisements: AdvertismentMainPageItemsProps[];
  toggleAdvertisement: (id: string) => void;
}
export interface AdevertisementFeaturesList {
  label: string;
  value: string;
}
export interface AdevertisementFeaturesListProps {
  title?: string | null;
}
export type ButtonVariant = "primary" | "secondary" | "danger";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  width?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export interface EmptyBoxComponentProps {
  title: string;
}
export type TextAreaInputProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;
export type StringInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: "text" | "password" | "email" | "tel" | "url" | "search";
};
export type NumberInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: "number" | "range";
};

export interface AdditionalItemListProps {
  items: AdvertismentInstructionResponse[];
  containerClassName?: string;
}
export interface DropdownMenuItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

export interface DropdownMenuProps {
  items: DropdownMenuItem[];
  isVisible: boolean;
  onClose: () => void;
  className?: string;
}
export interface AdditionalItemCardExtendedProps
  extends AdvertismentInstructionResponse {
  onEdit?: (content: string) => void;
  containerClassName?: string;
}
export interface AdditionalItemListProps {
  items: AdvertismentInstructionResponse[];
  onEditItem?: (content?: string) => void;
}
export interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  description: string;
  onDelete: () => void;
}
export interface AdvertisementHeaderProps {
  title?: string;
  onAddClick: () => void;
}

export interface SimpleHeaderWIthBackProps {
  title?: string;
  id?: number;
}

export interface InstructionFormComponentProps {
  question?: string;
  assistantAnswer?: string;
  id?: number;
  post?: string;
}
export interface CardItem {
  id: string;
  title: string;
  subtitle: string;
}

export interface CardListProps {
  items: CardItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export interface AssistantWorkingHoursCardProps {
  onDelete: () => void;
  cardData: WorkHoursResponse & { draft?: boolean };
  onConfirm?: (updatedData: {
    days_of_week: string[];
    start_time: string;
    end_time: string;
    is_active: boolean;
  }) => void;
  onEdit?: (updatedData: {
    days_of_week: string[];
    start_time: string;
    end_time: string;
    is_active: boolean;
  }) => void;
}

export interface InformationFormValues {
  id: string;
  work_name: string;
  address: string;
  mobile_number: string;
  work_time: string;
  instagram_page: string;
  telegram_page: string;
  use_info_by_chatbot: boolean;
}
export interface InformationFormValuesPayload {
  work_name: string;
  address: string;
  mobile_number: string;
  work_time: string;
  instagram_page: string;
  telegram_page: string;
  use_info_by_chatbot: boolean;
}
export type InputType =
  | "search"
  | "email"
  | "password"
  | "tel"
  | "text"
  | "url";
export type FieldComponentType = "input" | "textarea" | "switch";

export interface FieldDefinition {
  name: keyof InformationFormValues;
  label: string;
  placeholder?: string;
  type?: InputType;
  component?: FieldComponentType;
}
export interface TimePickerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (selectedTime: string) => void;
  onCancel: () => void;
}

export interface PackageCardProps {
  data: {
    id: string;
    number_of_chats: number;
    amount: number;
    isActive: boolean;
  };
}
export interface PackageCartCardProps {
  data: {
    packageName: string;
    packagePrice: number;
    tax: number;
    discount: string;
  };
}
export interface ProgressBarProps {
  progress: number;
  total: number;
}
export interface SubscriptionListCardsProps {
  ad_number: number;
  fee: number;
  id: string;
}
export interface DiscountCardProps {
  setDiscount: (value: string) => void;
}


export type ParamsType =
  | Record<string, string | number | (string | number)[]>
  | undefined;

export interface AdvertismentResponse {
  first_publish_at: string;
  title: string;
  images: string;
  category: string;
  city: string;
  district: string;
  chat_enabled: boolean;
  link: string;
  enable: boolean;
  search_web: boolean;
  description: string;
  welcome_message: string;
  access_token: string;
  refresh_token: string;
  user: number;
  question_answers: number;
  state: string;
  data: boolean;
  token: string;
}

export type AdvertisementListApiResponse = AdvertismentResponse[];
export interface AdvertismentInstructionResponse {
  id: string;
  post: string;
  question: string;
  answer: string;
}


export interface EditAdvrtisementInstructionPayload {
  post: string;
  question: string;
  answer: string;
}
export interface AdvertismentAdditionalItemResponse {
  id: string;
  post: string;
  description: string;
}
export interface AdvertismentAdditionalItemPayload {
  post: string;
  description: string;
}

export type AdvertismentAdditionalItemApiResponse =
  AdvertismentAdditionalItemResponse[];
export interface AdditionalItemsListProps {
  items: AdvertismentAdditionalItemResponse[];
  onEditItem?: (description: string, itemId: string, post:string) => void;
}
export interface AdditionalItemsInformationListProps {
  items: AdditionalItemsListProps[];
  containerClassName?: string;
}
export interface AdditionalItemsInformationCardExtendedProps
  extends AdvertismentAdditionalItemResponse {
  onEdit?: (description: string, id: string, post:string) => void;
  containerClassName?: string;
}
export interface CreateAdvertismentAdditionalItemResponse {
  post: string;
  description: string;
}
export interface AdditionalItemCardProps {
  ad_id: string;
  id: string;
  content: string;
  subContent: string;
}
export interface WorkHoursResponse {
  id: number;
  days_of_week: string[];
  start_time: string;
  end_time: string;
  user: number;
  is_active: boolean;
}

export interface WorkHoursData {
  count: number;
  next: string | null;
  previous: string | null;
  results: WorkHoursResponse[];
  available_filters: Record<string, unknown>;
}

export interface PackageResponse {
  id: number;
  number_of_chats: number;
  amount: number;
}

export interface PackagesData {
  count: number;
  next: string | null;
  previous: string | null;
  results: PackageResponse[];
  available_filters: Record<string, unknown>;
}
export interface CartPageProps {
  cartData: {
    id: number;
    number_of_chats: number;
    amount: number;
  } | null;
}

export interface UserPackage {
  user: number;
  package: number;
  active_chats: number;
  number_of_chats: number;
}

export interface UserPaymentsList {
  id: number;
  payment_code: number;
  payment_gateway: string;
  payment_amount: number;
  user: number;
}


export interface WelcomeMessage {
  message: string | null;
}
export interface WelcomeMessageApiResponse {
  success: boolean;
  data: WelcomeMessage;
}

export interface CreateWelcomeMessageResponse {
  id: number;
  last_login: string;
  is_superuser: true;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: true;
  is_active: true;
  date_joined: string;
  mobile_number: string;
  created_at: string;
  welcome_message: string;
  work_name: null;
  address: null;
  work_time: null;
  instagram_page: null;
  telegram_page: null;
  work_number: null;
  website: null;
  more_info: null;
  groups: [];
  user_permissions: [];
}
export interface CreateWelcomeMessageApiResponse {
  success: boolean;
  data: CreateWelcomeMessageResponse;
}
export interface CreateWorkHour {
  user: number;
  days_of_week: string[];
  start_time: string;
  end_time: string;
  is_active: boolean;
}
export interface WorkHourEditPayload {
  days_of_week: string[];
  start_time: string;
  end_time: string;
  is_active: boolean;
}
export interface CreateWorkHourApiResponse {
  success: boolean;
  data: CreateWorkHour;
}
export interface GetUserDataPayload {
  username: string;
  password: string;
}
export interface GetUserDataResponse {
  success: true;
  data: {
    id: number;
    access: string;
    refresh: string;
    access_token_expires_at: number;
    password: string;
    last_login: string;
    is_superuser: boolean;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_staff: boolean;
    is_active: boolean;
    date_joined: string;
    mobile_number: string;
    created_at: string;
    welcome_message: string;
    work_name: string;
    address: string;
    work_time: string;
    instagram_page: string;
    telegram_page: string;
    work_number: null;
    website: null;
    more_info: null;
    use_info_by_chatbot: boolean;
    groups: [];
    user_permissions: [];
  };
}
