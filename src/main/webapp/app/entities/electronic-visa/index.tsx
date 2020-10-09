import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ElectronicVisa from './electronic-visa';
import ElectronicVisaDetail from './electronic-visa-detail';
import ElectronicVisaUpdate from './electronic-visa-update';
import ElectronicVisaDeleteDialog from './electronic-visa-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ElectronicVisaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ElectronicVisaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ElectronicVisaDetail} />
      <ErrorBoundaryRoute path={match.url} component={ElectronicVisa} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ElectronicVisaDeleteDialog} />
  </>
);

export default Routes;
