import { Moment } from 'moment';
import { Gender } from 'app/shared/model/enumerations/gender.model';
import { MaritalStatus } from 'app/shared/model/enumerations/marital-status.model';

export interface IApplicant {
  id?: number;
  title?: string;
  firstName?: string;
  middleNames?: string;
  lastName?: string;
  fullName?: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  sex?: Gender;
  maritalStatus?: MaritalStatus;
  occupation?: string;
  photoContentType?: string;
  photo?: any;
  applicantContactInfoEmail?: string;
  applicantContactInfoId?: number;
  nationalityCountryName?: string;
  nationalityId?: number;
  countryOfBirthCountryName?: string;
  countryOfBirthId?: number;
  nationalityAtBirthCountryName?: string;
  nationalityAtBirthId?: number;
}

export const defaultValue: Readonly<IApplicant> = {};
