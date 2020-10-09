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
import { getEntity, updateEntity, createEntity, reset } from './application-fee.reducer';
import { IApplicationFee } from 'app/shared/model/application-fee.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IApplicationFeeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApplicationFeeUpdate = (props: IApplicationFeeUpdateProps) => {
  const [visaApplicationId, setVisaApplicationId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { applicationFeeEntity, visaApplications, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/application-fee' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getVisaApplications();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...applicationFeeEntity,
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
          <h2 id="somaliviswebappApp.applicationFee.home.createOrEditLabel">
            <Translate contentKey="somaliviswebappApp.applicationFee.home.createOrEditLabel">Create or edit a ApplicationFee</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : applicationFeeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="application-fee-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="application-fee-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="amountLabel" for="application-fee-amount">
                  <Translate contentKey="somaliviswebappApp.applicationFee.amount">Amount</Translate>
                </Label>
                <AvField
                  id="application-fee-amount"
                  type="string"
                  className="form-control"
                  name="amount"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="application-fee-description">
                  <Translate contentKey="somaliviswebappApp.applicationFee.description">Description</Translate>
                </Label>
                <AvField
                  id="application-fee-description"
                  type="text"
                  name="description"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="currencyLabel" for="application-fee-currency">
                  <Translate contentKey="somaliviswebappApp.applicationFee.currency">Currency</Translate>
                </Label>
                <AvField
                  id="application-fee-currency"
                  type="text"
                  name="currency"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="currentIsoCodeLabel" for="application-fee-currentIsoCode">
                  <Translate contentKey="somaliviswebappApp.applicationFee.currentIsoCode">Current Iso Code</Translate>
                </Label>
                <AvField
                  id="application-fee-currentIsoCode"
                  type="text"
                  name="currentIsoCode"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/application-fee" replace color="info">
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
  applicationFeeEntity: storeState.applicationFee.entity,
  loading: storeState.applicationFee.loading,
  updating: storeState.applicationFee.updating,
  updateSuccess: storeState.applicationFee.updateSuccess,
});

const mapDispatchToProps = {
  getVisaApplications,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationFeeUpdate);
