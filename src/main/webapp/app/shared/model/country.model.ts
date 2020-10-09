export interface ICountry {
  id?: number;
  countryName?: string;
  countryIsoCode?: string;
  countryFlagUrl?: string;
  countryCallingCode?: string;
  countryTelDigitLength?: number;
}

export const defaultValue: Readonly<ICountry> = {};
