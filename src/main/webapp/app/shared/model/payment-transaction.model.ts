import { Moment } from 'moment';
import { PaymentType } from 'app/shared/model/enumerations/payment-type.model';
import { PaymentStatus } from 'app/shared/model/enumerations/payment-status.model';

export interface IPaymentTransaction {
  id?: number;
  transactionAmount?: number;
  paymentType?: PaymentType;
  paymentDescription?: string;
  paymentStatus?: PaymentStatus;
  transactionDate?: string;
  paymentProvider?: string;
  visaApplicationApplicationName?: string;
  visaApplicationId?: number;
}

export const defaultValue: Readonly<IPaymentTransaction> = {};
