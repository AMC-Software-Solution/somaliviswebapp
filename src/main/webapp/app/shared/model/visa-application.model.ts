import { Moment } from 'moment';
import { ApplicationStatus } from 'app/shared/model/enumerations/application-status.model';
import { TravelPurpose } from 'app/shared/model/enumerations/travel-purpose.model';
import { VisaType } from 'app/shared/model/enumerations/visa-type.model';
import { TravelMode } from 'app/shared/model/enumerations/travel-mode.model';

export interface IVisaApplication {
  id?: number;
  applicationName?: string;
  applicationCode?: string;
  applicationDate?: string;
  applicationStatus?: ApplicationStatus;
  travelPurpose?: TravelPurpose;
  visaType?: VisaType;
  travelMode?: TravelMode;
  portOfEntry?: string;
  numberOfEntriesRequested?: string;
  intendedDateOfArrival?: string;
  intendedDateOfDeparture?: string;
  validUntil?: string;
  travelPurposeOther?: string;
  rejectReason?: string;
  approvedDate?: string;
  visaApplicationStayStayLocationFullAddress?: string;
  visaApplicationStayId?: number;
  applicationFeeDescription?: string;
  applicationFeeId?: number;
  electronicVisaVisaNumber?: string;
  electronicVisaId?: number;
  approvedByEmployeeFullName?: string;
  approvedById?: number;
}

export const defaultValue: Readonly<IVisaApplication> = {};
