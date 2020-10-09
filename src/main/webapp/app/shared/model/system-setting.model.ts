import { Moment } from 'moment';

export interface ISystemSetting {
  id?: number;
  fieldName?: string;
  fieldValue?: string;
  defaultValue?: string;
  enabled?: boolean;
  createdDate?: string;
  updatedDate?: string;
}

export const defaultValue: Readonly<ISystemSetting> = {
  enabled: false,
};
