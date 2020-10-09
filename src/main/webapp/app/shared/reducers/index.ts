import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import applicant, {
  ApplicantState
} from 'app/entities/applicant/applicant.reducer';
// prettier-ignore
import applicantTravelDocument, {
  ApplicantTravelDocumentState
} from 'app/entities/applicant-travel-document/applicant-travel-document.reducer';
// prettier-ignore
import applicantContactInfo, {
  ApplicantContactInfoState
} from 'app/entities/applicant-contact-info/applicant-contact-info.reducer';
// prettier-ignore
import visaApplication, {
  VisaApplicationState
} from 'app/entities/visa-application/visa-application.reducer';
// prettier-ignore
import visaApplicationStay, {
  VisaApplicationStayState
} from 'app/entities/visa-application-stay/visa-application-stay.reducer';
// prettier-ignore
import applicationComment, {
  ApplicationCommentState
} from 'app/entities/application-comment/application-comment.reducer';
// prettier-ignore
import paymentTransaction, {
  PaymentTransactionState
} from 'app/entities/payment-transaction/payment-transaction.reducer';
// prettier-ignore
import applicationFee, {
  ApplicationFeeState
} from 'app/entities/application-fee/application-fee.reducer';
// prettier-ignore
import appSetting, {
  AppSettingState
} from 'app/entities/app-setting/app-setting.reducer';
// prettier-ignore
import systemSetting, {
  SystemSettingState
} from 'app/entities/system-setting/system-setting.reducer';
// prettier-ignore
import country, {
  CountryState
} from 'app/entities/country/country.reducer';
// prettier-ignore
import electronicVisa, {
  ElectronicVisaState
} from 'app/entities/electronic-visa/electronic-visa.reducer';
// prettier-ignore
import employee, {
  EmployeeState
} from 'app/entities/employee/employee.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly applicant: ApplicantState;
  readonly applicantTravelDocument: ApplicantTravelDocumentState;
  readonly applicantContactInfo: ApplicantContactInfoState;
  readonly visaApplication: VisaApplicationState;
  readonly visaApplicationStay: VisaApplicationStayState;
  readonly applicationComment: ApplicationCommentState;
  readonly paymentTransaction: PaymentTransactionState;
  readonly applicationFee: ApplicationFeeState;
  readonly appSetting: AppSettingState;
  readonly systemSetting: SystemSettingState;
  readonly country: CountryState;
  readonly electronicVisa: ElectronicVisaState;
  readonly employee: EmployeeState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  applicant,
  applicantTravelDocument,
  applicantContactInfo,
  visaApplication,
  visaApplicationStay,
  applicationComment,
  paymentTransaction,
  applicationFee,
  appSetting,
  systemSetting,
  country,
  electronicVisa,
  employee,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
