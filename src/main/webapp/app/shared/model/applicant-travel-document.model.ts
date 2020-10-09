import { Moment } from 'moment';
import { TypeOfTravelDocument } from 'app/shared/model/enumerations/type-of-travel-document.model';

export interface IApplicantTravelDocument {
  id?: number;
  documentNumber?: string;
  dateOfIssue?: string;
  expiryDate?: string;
  issuingAuthority?: string;
  documentPhotoContentType?: string;
  documentPhoto?: any;
  typeOfDocument?: TypeOfTravelDocument;
  applicantFullName?: string;
  applicantId?: number;
}

export const defaultValue: Readonly<IApplicantTravelDocument> = {};
