import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './app-setting.reducer';
import { IAppSetting } from 'app/shared/model/app-setting.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAppSettingUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AppSettingUpdate = (props: IAppSettingUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { appSettingEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/app-setting' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.updatedDate = convertDateTimeToServer(values.updatedDate);

    if (errors.length === 0) {
      const entity = {
        ...appSettingEntity,
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
          <h2 id="somaliviswebappApp.appSetting.home.createOrEditLabel">
            <Translate contentKey="somaliviswebappApp.appSetting.home.createOrEditLabel">Create or edit a AppSetting</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : appSettingEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="app-setting-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="app-setting-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="fieldNameLabel" for="app-setting-fieldName">
                  <Translate contentKey="somaliviswebappApp.appSetting.fieldName">Field Name</Translate>
                </Label>
                <AvField
                  id="app-setting-fieldName"
                  type="text"
                  name="fieldName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="fieldValueLabel" for="app-setting-fieldValue">
                  <Translate contentKey="somaliviswebappApp.appSetting.fieldValue">Field Value</Translate>
                </Label>
                <AvField
                  id="app-setting-fieldValue"
                  type="text"
                  name="fieldValue"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="defaultValueLabel" for="app-setting-defaultValue">
                  <Translate contentKey="somaliviswebappApp.appSetting.defaultValue">Default Value</Translate>
                </Label>
                <AvField
                  id="app-setting-defaultValue"
                  type="text"
                  name="defaultValue"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="enabledLabel">
                  <AvInput id="app-setting-enabled" type="checkbox" className="form-check-input" name="enabled" />
                  <Translate contentKey="somaliviswebappApp.appSetting.enabled">Enabled</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="app-setting-createdDate">
                  <Translate contentKey="somaliviswebappApp.appSetting.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="app-setting-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.appSettingEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedDateLabel" for="app-setting-updatedDate">
                  <Translate contentKey="somaliviswebappApp.appSetting.updatedDate">Updated Date</Translate>
                </Label>
                <AvInput
                  id="app-setting-updatedDate"
                  type="datetime-local"
                  className="form-control"
                  name="updatedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.appSettingEntity.updatedDate)}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/app-setting" replace color="info">
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
  appSettingEntity: storeState.appSetting.entity,
  loading: storeState.appSetting.loading,
  updating: storeState.appSetting.updating,
  updateSuccess: storeState.appSetting.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AppSettingUpdate);
