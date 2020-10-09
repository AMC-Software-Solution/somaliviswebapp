import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VisaApplicationStay from './visa-application-stay';
import VisaApplicationStayDetail from './visa-application-stay-detail';
import VisaApplicationStayUpdate from './visa-application-stay-update';
import VisaApplicationStayDeleteDialog from './visa-application-stay-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VisaApplicationStayUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VisaApplicationStayUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VisaApplicationStayDetail} />
      <ErrorBoundaryRoute path={match.url} component={VisaApplicationStay} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VisaApplicationStayDeleteDialog} />
  </>
);

export default Routes;
