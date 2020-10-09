import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './visa-application-stay.reducer';
import { IVisaApplicationStay } from 'app/shared/model/visa-application-stay.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVisaApplicationStayDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VisaApplicationStayDetail = (props: IVisaApplicationStayDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { visaApplicationStayEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="somaliviswebappApp.visaApplicationStay.detail.title">VisaApplicationStay</Translate> [
          <b>{visaApplicationStayEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="durationOfProposedStayInDays">
              <Translate contentKey="somaliviswebappApp.visaApplicationStay.durationOfProposedStayInDays">
                Duration Of Proposed Stay In Days
              </Translate>
            </span>
          </dt>
          <dd>{visaApplicationStayEntity.durationOfProposedStayInDays}</dd>
          <dt>
            <span id="nameOfHostingPersonOrcompany">
              <Translate contentKey="somaliviswebappApp.visaApplicationStay.nameOfHostingPersonOrcompany">
                Name Of Hosting Person Orcompany
              </Translate>
            </span>
          </dt>
          <dd>{visaApplicationStayEntity.nameOfHostingPersonOrcompany}</dd>
          <dt>
            <span id="stayingLocationName">
              <Translate contentKey="somaliviswebappApp.visaApplicationStay.stayingLocationName">Staying Location Name</Translate>
            </span>
          </dt>
          <dd>{visaApplicationStayEntity.stayingLocationName}</dd>
          <dt>
            <span id="stayLocationFullAddress">
              <Translate contentKey="somaliviswebappApp.visaApplicationStay.stayLocationFullAddress">Stay Location Full Address</Translate>
            </span>
          </dt>
          <dd>{visaApplicationStayEntity.stayLocationFullAddress}</dd>
          <dt>
            <span id="stayLocationTelephoneNumber">
              <Translate contentKey="somaliviswebappApp.visaApplicationStay.stayLocationTelephoneNumber">
                Stay Location Telephone Number
              </Translate>
            </span>
          </dt>
          <dd>{visaApplicationStayEntity.stayLocationTelephoneNumber}</dd>
          <dt>
            <span id="stayLocationEmail">
              <Translate contentKey="somaliviswebappApp.visaApplicationStay.stayLocationEmail">Stay Location Email</Translate>
            </span>
          </dt>
          <dd>{visaApplicationStayEntity.stayLocationEmail}</dd>
          <dt>
            <span id="whoCoversCostOfApplicantsStay">
              <Translate contentKey="somaliviswebappApp.visaApplicationStay.whoCoversCostOfApplicantsStay">
                Who Covers Cost Of Applicants Stay
              </Translate>
            </span>
          </dt>
          <dd>{visaApplicationStayEntity.whoCoversCostOfApplicantsStay}</dd>
        </dl>
        <Button tag={Link} to="/visa-application-stay" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/visa-application-stay/${visaApplicationStayEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ visaApplicationStay }: IRootState) => ({
  visaApplicationStayEntity: visaApplicationStay.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VisaApplicationStayDetail);
