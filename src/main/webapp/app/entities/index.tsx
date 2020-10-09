import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Applicant from './applicant';
import ApplicantTravelDocument from './applicant-travel-document';
import ApplicantContactInfo from './applicant-contact-info';
import VisaApplication from './visa-application';
import VisaApplicationStay from './visa-application-stay';
import ApplicationComment from './application-comment';
import PaymentTransaction from './payment-transaction';
import ApplicationFee from './application-fee';
import AppSetting from './app-setting';
import SystemSetting from './system-setting';
import Country from './country';
import ElectronicVisa from './electronic-visa';
import Employee from './employee';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}applicant`} component={Applicant} />
      <ErrorBoundaryRoute path={`${match.url}applicant-travel-document`} component={ApplicantTravelDocument} />
      <ErrorBoundaryRoute path={`${match.url}applicant-contact-info`} component={ApplicantContactInfo} />
      <ErrorBoundaryRoute path={`${match.url}visa-application`} component={VisaApplication} />
      <ErrorBoundaryRoute path={`${match.url}visa-application-stay`} component={VisaApplicationStay} />
      <ErrorBoundaryRoute path={`${match.url}application-comment`} component={ApplicationComment} />
      <ErrorBoundaryRoute path={`${match.url}payment-transaction`} component={PaymentTransaction} />
      <ErrorBoundaryRoute path={`${match.url}application-fee`} component={ApplicationFee} />
      <ErrorBoundaryRoute path={`${match.url}app-setting`} component={AppSetting} />
      <ErrorBoundaryRoute path={`${match.url}system-setting`} component={SystemSetting} />
      <ErrorBoundaryRoute path={`${match.url}country`} component={Country} />
      <ErrorBoundaryRoute path={`${match.url}electronic-visa`} component={ElectronicVisa} />
      <ErrorBoundaryRoute path={`${match.url}employee`} component={Employee} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
