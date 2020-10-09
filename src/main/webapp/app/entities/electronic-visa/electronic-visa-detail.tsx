import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './electronic-visa.reducer';
import { IElectronicVisa } from 'app/shared/model/electronic-visa.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IElectronicVisaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ElectronicVisaDetail = (props: IElectronicVisaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { electronicVisaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="somaliviswebappApp.electronicVisa.detail.title">ElectronicVisa</Translate> [
          <b>{electronicVisaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="firstName">
              <Translate contentKey="somaliviswebappApp.electronicVisa.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{electronicVisaEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="somaliviswebappApp.electronicVisa.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{electronicVisaEntity.lastName}</dd>
          <dt>
            <span id="visaNumber">
              <Translate contentKey="somaliviswebappApp.electronicVisa.visaNumber">Visa Number</Translate>
            </span>
          </dt>
          <dd>{electronicVisaEntity.visaNumber}</dd>
          <dt>
            <span id="barcode">
              <Translate contentKey="somaliviswebappApp.electronicVisa.barcode">Barcode</Translate>
            </span>
          </dt>
          <dd>{electronicVisaEntity.barcode}</dd>
          <dt>
            <span id="nationality">
              <Translate contentKey="somaliviswebappApp.electronicVisa.nationality">Nationality</Translate>
            </span>
          </dt>
          <dd>{electronicVisaEntity.nationality}</dd>
          <dt>
            <span id="placeOfBirth">
              <Translate contentKey="somaliviswebappApp.electronicVisa.placeOfBirth">Place Of Birth</Translate>
            </span>
          </dt>
          <dd>{electronicVisaEntity.placeOfBirth}</dd>
          <dt>
            <span id="travelDocument">
              <Translate contentKey="somaliviswebappApp.electronicVisa.travelDocument">Travel Document</Translate>
            </span>
          </dt>
          <dd>{electronicVisaEntity.travelDocument}</dd>
          <dt>
            <span id="travelDocumentIssueDate">
              <Translate contentKey="somaliviswebappApp.electronicVisa.travelDocumentIssueDate">Travel Document Issue Date</Translate>
            </span>
          </dt>
          <dd>
            {electronicVisaEntity.travelDocumentIssueDate ? (
              <TextFormat value={electronicVisaEntity.travelDocumentIssueDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="travelDocumentExpiryDate">
              <Translate contentKey="somaliviswebappApp.electronicVisa.travelDocumentExpiryDate">Travel Document Expiry Date</Translate>
            </span>
          </dt>
          <dd>
            {electronicVisaEntity.travelDocumentExpiryDate ? (
              <TextFormat value={electronicVisaEntity.travelDocumentExpiryDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="travelPurpose">
              <Translate contentKey="somaliviswebappApp.electronicVisa.travelPurpose">Travel Purpose</Translate>
            </span>
          </dt>
          <dd>{electronicVisaEntity.travelPurpose}</dd>
          <dt>
            <span id="visaValidFrom">
              <Translate contentKey="somaliviswebappApp.electronicVisa.visaValidFrom">Visa Valid From</Translate>
            </span>
          </dt>
          <dd>
            {electronicVisaEntity.visaValidFrom ? (
              <TextFormat value={electronicVisaEntity.visaValidFrom} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="visaValidUntil">
              <Translate contentKey="somaliviswebappApp.electronicVisa.visaValidUntil">Visa Valid Until</Translate>
            </span>
          </dt>
          <dd>
            {electronicVisaEntity.visaValidUntil ? (
              <TextFormat value={electronicVisaEntity.visaValidUntil} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="visaValidityType">
              <Translate contentKey="somaliviswebappApp.electronicVisa.visaValidityType">Visa Validity Type</Translate>
            </span>
          </dt>
          <dd>{electronicVisaEntity.visaValidityType}</dd>
          <dt>
            <span id="visaType">
              <Translate contentKey="somaliviswebappApp.electronicVisa.visaType">Visa Type</Translate>
            </span>
          </dt>
          <dd>{electronicVisaEntity.visaType}</dd>
        </dl>
        <Button tag={Link} to="/electronic-visa" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/electronic-visa/${electronicVisaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ electronicVisa }: IRootState) => ({
  electronicVisaEntity: electronicVisa.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ElectronicVisaDetail);
