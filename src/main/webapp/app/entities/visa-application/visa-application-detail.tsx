import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './visa-application.reducer';
import { IVisaApplication } from 'app/shared/model/visa-application.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVisaApplicationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VisaApplicationDetail = (props: IVisaApplicationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { visaApplicationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="somaliviswebappApp.visaApplication.detail.title">VisaApplication</Translate> [
          <b>{visaApplicationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="applicationName">
              <Translate contentKey="somaliviswebappApp.visaApplication.applicationName">Application Name</Translate>
            </span>
          </dt>
          <dd>{visaApplicationEntity.applicationName}</dd>
          <dt>
            <span id="applicationCode">
              <Translate contentKey="somaliviswebappApp.visaApplication.applicationCode">Application Code</Translate>
            </span>
          </dt>
          <dd>{visaApplicationEntity.applicationCode}</dd>
          <dt>
            <span id="applicationDate">
              <Translate contentKey="somaliviswebappApp.visaApplication.applicationDate">Application Date</Translate>
            </span>
          </dt>
          <dd>
            {visaApplicationEntity.applicationDate ? (
              <TextFormat value={visaApplicationEntity.applicationDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="applicationStatus">
              <Translate contentKey="somaliviswebappApp.visaApplication.applicationStatus">Application Status</Translate>
            </span>
          </dt>
          <dd>{visaApplicationEntity.applicationStatus}</dd>
          <dt>
            <span id="travelPurpose">
              <Translate contentKey="somaliviswebappApp.visaApplication.travelPurpose">Travel Purpose</Translate>
            </span>
          </dt>
          <dd>{visaApplicationEntity.travelPurpose}</dd>
          <dt>
            <span id="visaType">
              <Translate contentKey="somaliviswebappApp.visaApplication.visaType">Visa Type</Translate>
            </span>
          </dt>
          <dd>{visaApplicationEntity.visaType}</dd>
          <dt>
            <span id="travelMode">
              <Translate contentKey="somaliviswebappApp.visaApplication.travelMode">Travel Mode</Translate>
            </span>
          </dt>
          <dd>{visaApplicationEntity.travelMode}</dd>
          <dt>
            <span id="portOfEntry">
              <Translate contentKey="somaliviswebappApp.visaApplication.portOfEntry">Port Of Entry</Translate>
            </span>
          </dt>
          <dd>{visaApplicationEntity.portOfEntry}</dd>
          <dt>
            <span id="numberOfEntriesRequested">
              <Translate contentKey="somaliviswebappApp.visaApplication.numberOfEntriesRequested">Number Of Entries Requested</Translate>
            </span>
          </dt>
          <dd>{visaApplicationEntity.numberOfEntriesRequested}</dd>
          <dt>
            <span id="intendedDateOfArrival">
              <Translate contentKey="somaliviswebappApp.visaApplication.intendedDateOfArrival">Intended Date Of Arrival</Translate>
            </span>
          </dt>
          <dd>
            {visaApplicationEntity.intendedDateOfArrival ? (
              <TextFormat value={visaApplicationEntity.intendedDateOfArrival} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="intendedDateOfDeparture">
              <Translate contentKey="somaliviswebappApp.visaApplication.intendedDateOfDeparture">Intended Date Of Departure</Translate>
            </span>
          </dt>
          <dd>
            {visaApplicationEntity.intendedDateOfDeparture ? (
              <TextFormat value={visaApplicationEntity.intendedDateOfDeparture} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="validUntil">
              <Translate contentKey="somaliviswebappApp.visaApplication.validUntil">Valid Until</Translate>
            </span>
          </dt>
          <dd>
            {visaApplicationEntity.validUntil ? (
              <TextFormat value={visaApplicationEntity.validUntil} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="travelPurposeOther">
              <Translate contentKey="somaliviswebappApp.visaApplication.travelPurposeOther">Travel Purpose Other</Translate>
            </span>
          </dt>
          <dd>{visaApplicationEntity.travelPurposeOther}</dd>
          <dt>
            <span id="rejectReason">
              <Translate contentKey="somaliviswebappApp.visaApplication.rejectReason">Reject Reason</Translate>
            </span>
          </dt>
          <dd>{visaApplicationEntity.rejectReason}</dd>
          <dt>
            <span id="approvedDate">
              <Translate contentKey="somaliviswebappApp.visaApplication.approvedDate">Approved Date</Translate>
            </span>
          </dt>
          <dd>
            {visaApplicationEntity.approvedDate ? (
              <TextFormat value={visaApplicationEntity.approvedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="somaliviswebappApp.visaApplication.visaApplicationStay">Visa Application Stay</Translate>
          </dt>
          <dd>
            {visaApplicationEntity.visaApplicationStayStayLocationFullAddress
              ? visaApplicationEntity.visaApplicationStayStayLocationFullAddress
              : ''}
          </dd>
          <dt>
            <Translate contentKey="somaliviswebappApp.visaApplication.applicationFee">Application Fee</Translate>
          </dt>
          <dd>{visaApplicationEntity.applicationFeeDescription ? visaApplicationEntity.applicationFeeDescription : ''}</dd>
          <dt>
            <Translate contentKey="somaliviswebappApp.visaApplication.electronicVisa">Electronic Visa</Translate>
          </dt>
          <dd>{visaApplicationEntity.electronicVisaVisaNumber ? visaApplicationEntity.electronicVisaVisaNumber : ''}</dd>
          <dt>
            <Translate contentKey="somaliviswebappApp.visaApplication.approvedBy">Approved By</Translate>
          </dt>
          <dd>{visaApplicationEntity.approvedByEmployeeFullName ? visaApplicationEntity.approvedByEmployeeFullName : ''}</dd>
        </dl>
        <Button tag={Link} to="/visa-application" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/visa-application/${visaApplicationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ visaApplication }: IRootState) => ({
  visaApplicationEntity: visaApplication.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VisaApplicationDetail);
