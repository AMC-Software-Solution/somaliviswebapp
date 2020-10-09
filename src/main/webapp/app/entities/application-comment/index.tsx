import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ApplicationComment from './application-comment';
import ApplicationCommentDetail from './application-comment-detail';
import ApplicationCommentUpdate from './application-comment-update';
import ApplicationCommentDeleteDialog from './application-comment-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ApplicationCommentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ApplicationCommentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ApplicationCommentDetail} />
      <ErrorBoundaryRoute path={match.url} component={ApplicationComment} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ApplicationCommentDeleteDialog} />
  </>
);

export default Routes;
