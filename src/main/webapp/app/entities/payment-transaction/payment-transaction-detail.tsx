import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './payment-transaction.reducer';
import { IPaymentTransaction } from 'app/shared/model/payment-transaction.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaymentTransactionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PaymentTransactionDetail = (props: IPaymentTransactionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { paymentTransactionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="somaliviswebappApp.paymentTransaction.detail.title">PaymentTransaction</Translate> [
          <b>{paymentTransactionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="transactionAmount">
              <Translate contentKey="somaliviswebappApp.paymentTransaction.transactionAmount">Transaction Amount</Translate>
            </span>
          </dt>
          <dd>{paymentTransactionEntity.transactionAmount}</dd>
          <dt>
            <span id="paymentType">
              <Translate contentKey="somaliviswebappApp.paymentTransaction.paymentType">Payment Type</Translate>
            </span>
          </dt>
          <dd>{paymentTransactionEntity.paymentType}</dd>
          <dt>
            <span id="paymentDescription">
              <Translate contentKey="somaliviswebappApp.paymentTransaction.paymentDescription">Payment Description</Translate>
            </span>
          </dt>
          <dd>{paymentTransactionEntity.paymentDescription}</dd>
          <dt>
            <span id="paymentStatus">
              <Translate contentKey="somaliviswebappApp.paymentTransaction.paymentStatus">Payment Status</Translate>
            </span>
          </dt>
          <dd>{paymentTransactionEntity.paymentStatus}</dd>
          <dt>
            <span id="transactionDate">
              <Translate contentKey="somaliviswebappApp.paymentTransaction.transactionDate">Transaction Date</Translate>
            </span>
          </dt>
          <dd>
            {paymentTransactionEntity.transactionDate ? (
              <TextFormat value={paymentTransactionEntity.transactionDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="paymentProvider">
              <Translate contentKey="somaliviswebappApp.paymentTransaction.paymentProvider">Payment Provider</Translate>
            </span>
          </dt>
          <dd>{paymentTransactionEntity.paymentProvider}</dd>
          <dt>
            <Translate contentKey="somaliviswebappApp.paymentTransaction.visaApplication">Visa Application</Translate>
          </dt>
          <dd>{paymentTransactionEntity.visaApplicationApplicationName ? paymentTransactionEntity.visaApplicationApplicationName : ''}</dd>
        </dl>
        <Button tag={Link} to="/payment-transaction" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/payment-transaction/${paymentTransactionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ paymentTransaction }: IRootState) => ({
  paymentTransactionEntity: paymentTransaction.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaymentTransactionDetail);
