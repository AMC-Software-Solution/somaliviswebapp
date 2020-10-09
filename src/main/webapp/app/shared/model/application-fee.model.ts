export interface IApplicationFee {
  id?: number;
  amount?: number;
  description?: string;
  currency?: string;
  currentIsoCode?: string;
  visaApplicationId?: number;
}

export const defaultValue: Readonly<IApplicationFee> = {};
