import { Moment } from 'moment';

export interface IElectronicVisa {
  id?: number;
  firstName?: string;
  lastName?: string;
  visaNumber?: string;
  barcode?: string;
  nationality?: string;
  placeOfBirth?: string;
  travelDocument?: string;
  travelDocumentIssueDate?: string;
  travelDocumentExpiryDate?: string;
  travelPurpose?: string;
  visaValidFrom?: string;
  visaValidUntil?: string;
  visaValidityType?: string;
  visaType?: string;
  visaApplicationId?: number;
}

export const defaultValue: Readonly<IElectronicVisa> = {};
