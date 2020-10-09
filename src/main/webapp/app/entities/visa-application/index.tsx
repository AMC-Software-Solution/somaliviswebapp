import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VisaApplication from './visa-application';
import VisaApplicationDetail from './visa-application-detail';
import VisaApplicationUpdate from './visa-application-update';
import VisaApplicationDeleteDialog from './visa-application-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VisaApplicationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VisaApplicationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VisaApplicationDetail} />
      <ErrorBoundaryRoute path={match.url} component={VisaApplication} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VisaApplicationDeleteDialog} />
  </>
);

export default Routes;
