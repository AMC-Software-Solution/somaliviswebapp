import { Moment } from 'moment';
import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface IEmployee {
  id?: number;
  employeeFullName?: string;
  profession?: string;
  phone?: string;
  gender?: Gender;
  bio?: string;
  profilePhotoContentType?: string;
  profilePhoto?: any;
  profilePhotoUrl?: string;
  enabled?: boolean;
  reason?: string;
  createdDate?: string;
  lastUpdatedDate?: string;
  userLogin?: string;
  userId?: number;
}

export const defaultValue: Readonly<IEmployee> = {
  enabled: false,
};
