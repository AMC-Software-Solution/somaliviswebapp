export interface IVisaApplicationStay {
  id?: number;
  durationOfProposedStayInDays?: number;
  nameOfHostingPersonOrcompany?: string;
  stayingLocationName?: string;
  stayLocationFullAddress?: string;
  stayLocationTelephoneNumber?: string;
  stayLocationEmail?: string;
  whoCoversCostOfApplicantsStay?: string;
  visaApplicationId?: number;
}

export const defaultValue: Readonly<IVisaApplicationStay> = {};
