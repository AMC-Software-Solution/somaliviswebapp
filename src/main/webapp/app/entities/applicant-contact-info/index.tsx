import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ApplicantContactInfo from './applicant-contact-info';
import ApplicantContactInfoDetail from './applicant-contact-info-detail';
import ApplicantContactInfoUpdate from './applicant-contact-info-update';
import ApplicantContactInfoDeleteDialog from './applicant-contact-info-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ApplicantContactInfoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ApplicantContactInfoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ApplicantContactInfoDetail} />
      <ErrorBoundaryRoute path={match.url} component={ApplicantContactInfo} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ApplicantContactInfoDeleteDialog} />
  </>
);

export default Routes;
