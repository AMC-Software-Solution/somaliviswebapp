import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IVisaApplication } from 'app/shared/model/visa-application.model';
import { getEntities as getVisaApplications } from 'app/entities/visa-application/visa-application.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './application-comment.reducer';
import { IApplicationComment } from 'app/shared/model/application-comment.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IApplicationCommentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApplicationCommentUpdate = (props: IApplicationCommentUpdateProps) => {
  const [visaApplicationId, setVisaApplicationId] = useState('0');
  const [commentedById, setCommentedById] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { applicationCommentEntity, visaApplications, users, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/application-comment' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getVisaApplications();
    props.getUsers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.commentDate = convertDateTimeToServer(values.commentDate);

    if (errors.length === 0) {
      const entity = {
        ...applicationCommentEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="somaliviswebappApp.applicationComment.home.createOrEditLabel">
            <Translate contentKey="somaliviswebappApp.applicationComment.home.createOrEditLabel">
              Create or edit a ApplicationComment
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : applicationCommentEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="application-comment-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="application-comment-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="application-comment-title">
                  <Translate contentKey="somaliviswebappApp.applicationComment.title">Title</Translate>
                </Label>
                <AvField
                  id="application-comment-title"
                  type="text"
                  name="title"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="commentLabel" for="application-comment-comment">
                  <Translate contentKey="somaliviswebappApp.applicationComment.comment">Comment</Translate>
                </Label>
                <AvField
                  id="application-comment-comment"
                  type="text"
                  name="comment"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="commentDateLabel" for="application-comment-commentDate">
                  <Translate contentKey="somaliviswebappApp.applicationComment.commentDate">Comment Date</Translate>
                </Label>
                <AvInput
                  id="application-comment-commentDate"
                  type="datetime-local"
                  className="form-control"
                  name="commentDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.applicationCommentEntity.commentDate)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="commenterTypeLabel" for="application-comment-commenterType">
                  <Translate contentKey="somaliviswebappApp.applicationComment.commenterType">Commenter Type</Translate>
                </Label>
                <AvInput
                  id="application-comment-commenterType"
                  type="select"
                  className="form-control"
                  name="commenterType"
                  value={(!isNew && applicationCommentEntity.commenterType) || 'EMPLOYEE'}
                >
                  <option value="EMPLOYEE">{translate('somaliviswebappApp.CommenterType.EMPLOYEE')}</option>
                  <option value="APPLICANT">{translate('somaliviswebappApp.CommenterType.APPLICANT')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="application-comment-visaApplication">
                  <Translate contentKey="somaliviswebappApp.applicationComment.visaApplication">Visa Application</Translate>
                </Label>
                <AvInput id="application-comment-visaApplication" type="select" className="form-control" name="visaApplicationId">
                  <option value="" key="0" />
                  {visaApplications
                    ? visaApplications.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.applicationName}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="application-comment-commentedBy">
                  <Translate contentKey="somaliviswebappApp.applicationComment.commentedBy">Commented By</Translate>
                </Label>
                <AvInput id="application-comment-commentedBy" type="select" className="form-control" name="commentedById">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.login}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/application-comment" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  visaApplications: storeState.visaApplication.entities,
  users: storeState.userManagement.users,
  applicationCommentEntity: storeState.applicationComment.entity,
  loading: storeState.applicationComment.loading,
  updating: storeState.applicationComment.updating,
  updateSuccess: storeState.applicationComment.updateSuccess,
});

const mapDispatchToProps = {
  getVisaApplications,
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationCommentUpdate);
