import { FormFieldType } from '@/lib/utils';
import { Control } from 'react-hook-form';

declare interface CustomProps {
  control: Control<any>,
  fieldType: FormFieldType,
  name: string,
  label?: string,
  placeholder?: string,
  iconSrc?: string,
  iconAlt?: string,
  disabled?: boolean,
  dateFormat?: string,
  showTimeSelect?: boolean,
  children?: React.ReactNode,
  renderSkeleton?: (field: any) => React.ReactNode,
}

declare interface ButtonProps {
  isLoading: boolean,
  className?: string,
  children: React.ReactNode,
}

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
