import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './applicant-contact-info.reducer';
import { IApplicantContactInfo } from 'app/shared/model/applicant-contact-info.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApplicantContactInfoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApplicantContactInfoDetail = (props: IApplicantContactInfoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { applicantContactInfoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="somaliviswebappApp.applicantContactInfo.detail.title">ApplicantContactInfo</Translate> [
          <b>{applicantContactInfoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="applicantsHomeAddress">
              <Translate contentKey="somaliviswebappApp.applicantContactInfo.applicantsHomeAddress">Applicants Home Address</Translate>
            </span>
          </dt>
          <dd>{applicantContactInfoEntity.applicantsHomeAddress}</dd>
          <dt>
            <span id="telephoneNumber">
              <Translate contentKey="somaliviswebappApp.applicantContactInfo.telephoneNumber">Telephone Number</Translate>
            </span>
          </dt>
          <dd>{applicantContactInfoEntity.telephoneNumber}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="somaliviswebappApp.applicantContactInfo.email">Email</Translate>
            </span>
          </dt>
          <dd>{applicantContactInfoEntity.email}</dd>
          <dt>
            <span id="employer">
              <Translate contentKey="somaliviswebappApp.applicantContactInfo.employer">Employer</Translate>
            </span>
          </dt>
          <dd>{applicantContactInfoEntity.employer}</dd>
          <dt>
            <span id="employersAddress">
              <Translate contentKey="somaliviswebappApp.applicantContactInfo.employersAddress">Employers Address</Translate>
            </span>
          </dt>
          <dd>{applicantContactInfoEntity.employersAddress}</dd>
        </dl>
        <Button tag={Link} to="/applicant-contact-info" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/applicant-contact-info/${applicantContactInfoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ applicantContactInfo }: IRootState) => ({
  applicantContactInfoEntity: applicantContactInfo.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantContactInfoDetail);
