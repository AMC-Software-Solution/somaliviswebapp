import { Moment } from 'moment';

export interface IAppSetting {
  id?: number;
  fieldName?: string;
  fieldValue?: string;
  defaultValue?: string;
  enabled?: boolean;
  createdDate?: string;
  updatedDate?: string;
}

export const defaultValue: Readonly<IAppSetting> = {
  enabled: false,
};
