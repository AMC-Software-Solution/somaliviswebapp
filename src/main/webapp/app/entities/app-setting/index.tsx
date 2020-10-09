import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AppSetting from './app-setting';
import AppSettingDetail from './app-setting-detail';
import AppSettingUpdate from './app-setting-update';
import AppSettingDeleteDialog from './app-setting-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AppSettingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AppSettingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AppSettingDetail} />
      <ErrorBoundaryRoute path={match.url} component={AppSetting} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AppSettingDeleteDialog} />
  </>
);

export default Routes;
