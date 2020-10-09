import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ApplicationFee from './application-fee';
import ApplicationFeeDetail from './application-fee-detail';
import ApplicationFeeUpdate from './application-fee-update';
import ApplicationFeeDeleteDialog from './application-fee-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ApplicationFeeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ApplicationFeeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ApplicationFeeDetail} />
      <ErrorBoundaryRoute path={match.url} component={ApplicationFee} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ApplicationFeeDeleteDialog} />
  </>
);

export default Routes;
