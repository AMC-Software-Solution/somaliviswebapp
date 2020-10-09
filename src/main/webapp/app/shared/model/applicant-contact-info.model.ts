export interface IApplicantContactInfo {
  id?: number;
  applicantsHomeAddress?: string;
  telephoneNumber?: string;
  email?: string;
  employer?: string;
  employersAddress?: string;
  applicantId?: number;
}

export const defaultValue: Readonly<IApplicantContactInfo> = {};
