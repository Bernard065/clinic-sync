import { decl } from "postcss";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}

declare interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
}

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare interface User extends CreateUserParams {
  $id: string
}

declare interface FileUploaderProps {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};
