import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PaymentTransaction from './payment-transaction';
import PaymentTransactionDetail from './payment-transaction-detail';
import PaymentTransactionUpdate from './payment-transaction-update';
import PaymentTransactionDeleteDialog from './payment-transaction-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PaymentTransactionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PaymentTransactionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PaymentTransactionDetail} />
      <ErrorBoundaryRoute path={match.url} component={PaymentTransaction} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PaymentTransactionDeleteDialog} />
  </>
);

export default Routes;
