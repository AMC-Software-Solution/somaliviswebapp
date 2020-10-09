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
import { getEntity, updateEntity, createEntity, reset } from './payment-transaction.reducer';
import { IPaymentTransaction } from 'app/shared/model/payment-transaction.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPaymentTransactionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PaymentTransactionUpdate = (props: IPaymentTransactionUpdateProps) => {
  const [visaApplicationId, setVisaApplicationId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { paymentTransactionEntity, visaApplications, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/payment-transaction' + props.location.search);
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
    values.transactionDate = convertDateTimeToServer(values.transactionDate);

    if (errors.length === 0) {
      const entity = {
        ...paymentTransactionEntity,
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
          <h2 id="somaliviswebappApp.paymentTransaction.home.createOrEditLabel">
            <Translate contentKey="somaliviswebappApp.paymentTransaction.home.createOrEditLabel">
              Create or edit a PaymentTransaction
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : paymentTransactionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="payment-transaction-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="payment-transaction-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="transactionAmountLabel" for="payment-transaction-transactionAmount">
                  <Translate contentKey="somaliviswebappApp.paymentTransaction.transactionAmount">Transaction Amount</Translate>
                </Label>
                <AvField
                  id="payment-transaction-transactionAmount"
                  type="string"
                  className="form-control"
                  name="transactionAmount"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="paymentTypeLabel" for="payment-transaction-paymentType">
                  <Translate contentKey="somaliviswebappApp.paymentTransaction.paymentType">Payment Type</Translate>
                </Label>
                <AvInput
                  id="payment-transaction-paymentType"
                  type="select"
                  className="form-control"
                  name="paymentType"
                  value={(!isNew && paymentTransactionEntity.paymentType) || 'CASH'}
                >
                  <option value="CASH">{translate('somaliviswebappApp.PaymentType.CASH')}</option>
                  <option value="CARD">{translate('somaliviswebappApp.PaymentType.CARD')}</option>
                  <option value="MOBILE_PAYMENT">{translate('somaliviswebappApp.PaymentType.MOBILE_PAYMENT')}</option>
                  <option value="PAY_PAL">{translate('somaliviswebappApp.PaymentType.PAY_PAL')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="paymentDescriptionLabel" for="payment-transaction-paymentDescription">
                  <Translate contentKey="somaliviswebappApp.paymentTransaction.paymentDescription">Payment Description</Translate>
                </Label>
                <AvField
                  id="payment-transaction-paymentDescription"
                  type="text"
                  name="paymentDescription"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="paymentStatusLabel" for="payment-transaction-paymentStatus">
                  <Translate contentKey="somaliviswebappApp.paymentTransaction.paymentStatus">Payment Status</Translate>
                </Label>
                <AvInput
                  id="payment-transaction-paymentStatus"
                  type="select"
                  className="form-control"
                  name="paymentStatus"
                  value={(!isNew && paymentTransactionEntity.paymentStatus) || 'PAID'}
                >
                  <option value="PAID">{translate('somaliviswebappApp.PaymentStatus.PAID')}</option>
                  <option value="UNPAID">{translate('somaliviswebappApp.PaymentStatus.UNPAID')}</option>
                  <option value="CANCELLED">{translate('somaliviswebappApp.PaymentStatus.CANCELLED')}</option>
                  <option value="REJECTED">{translate('somaliviswebappApp.PaymentStatus.REJECTED')}</option>
                  <option value="PENDING">{translate('somaliviswebappApp.PaymentStatus.PENDING')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="transactionDateLabel" for="payment-transaction-transactionDate">
                  <Translate contentKey="somaliviswebappApp.paymentTransaction.transactionDate">Transaction Date</Translate>
                </Label>
                <AvInput
                  id="payment-transaction-transactionDate"
                  type="datetime-local"
                  className="form-control"
                  name="transactionDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.paymentTransactionEntity.transactionDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="paymentProviderLabel" for="payment-transaction-paymentProvider">
                  <Translate contentKey="somaliviswebappApp.paymentTransaction.paymentProvider">Payment Provider</Translate>
                </Label>
                <AvField id="payment-transaction-paymentProvider" type="text" name="paymentProvider" />
              </AvGroup>
              <AvGroup>
                <Label for="payment-transaction-visaApplication">
                  <Translate contentKey="somaliviswebappApp.paymentTransaction.visaApplication">Visa Application</Translate>
                </Label>
                <AvInput id="payment-transaction-visaApplication" type="select" className="form-control" name="visaApplicationId">
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
              <Button tag={Link} id="cancel-save" to="/payment-transaction" replace color="info">
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
  paymentTransactionEntity: storeState.paymentTransaction.entity,
  loading: storeState.paymentTransaction.loading,
  updating: storeState.paymentTransaction.updating,
  updateSuccess: storeState.paymentTransaction.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentTransactionUpdate);
