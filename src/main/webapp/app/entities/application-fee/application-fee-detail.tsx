import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './application-fee.reducer';
import { IApplicationFee } from 'app/shared/model/application-fee.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApplicationFeeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApplicationFeeDetail = (props: IApplicationFeeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { applicationFeeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="somaliviswebappApp.applicationFee.detail.title">ApplicationFee</Translate> [
          <b>{applicationFeeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="amount">
              <Translate contentKey="somaliviswebappApp.applicationFee.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{applicationFeeEntity.amount}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="somaliviswebappApp.applicationFee.description">Description</Translate>
            </span>
          </dt>
          <dd>{applicationFeeEntity.description}</dd>
          <dt>
            <span id="currency">
              <Translate contentKey="somaliviswebappApp.applicationFee.currency">Currency</Translate>
            </span>
          </dt>
          <dd>{applicationFeeEntity.currency}</dd>
          <dt>
            <span id="currentIsoCode">
              <Translate contentKey="somaliviswebappApp.applicationFee.currentIsoCode">Current Iso Code</Translate>
            </span>
          </dt>
          <dd>{applicationFeeEntity.currentIsoCode}</dd>
        </dl>
        <Button tag={Link} to="/application-fee" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/application-fee/${applicationFeeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ applicationFee }: IRootState) => ({
  applicationFeeEntity: applicationFee.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationFeeDetail);
