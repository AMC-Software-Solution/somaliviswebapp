import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ApplicantTravelDocument from './applicant-travel-document';
import ApplicantTravelDocumentDetail from './applicant-travel-document-detail';
import ApplicantTravelDocumentUpdate from './applicant-travel-document-update';
import ApplicantTravelDocumentDeleteDialog from './applicant-travel-document-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ApplicantTravelDocumentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ApplicantTravelDocumentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ApplicantTravelDocumentDetail} />
      <ErrorBoundaryRoute path={match.url} component={ApplicantTravelDocument} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ApplicantTravelDocumentDeleteDialog} />
  </>
);

export default Routes;
