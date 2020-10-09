import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './applicant.reducer';
import { IApplicant } from 'app/shared/model/applicant.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApplicantDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApplicantDetail = (props: IApplicantDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { applicantEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="somaliviswebappApp.applicant.detail.title">Applicant</Translate> [<b>{applicantEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="title">
              <Translate contentKey="somaliviswebappApp.applicant.title">Title</Translate>
            </span>
          </dt>
          <dd>{applicantEntity.title}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="somaliviswebappApp.applicant.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{applicantEntity.firstName}</dd>
          <dt>
            <span id="middleNames">
              <Translate contentKey="somaliviswebappApp.applicant.middleNames">Middle Names</Translate>
            </span>
          </dt>
          <dd>{applicantEntity.middleNames}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="somaliviswebappApp.applicant.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{applicantEntity.lastName}</dd>
          <dt>
            <span id="fullName">
              <Translate contentKey="somaliviswebappApp.applicant.fullName">Full Name</Translate>
            </span>
          </dt>
          <dd>{applicantEntity.fullName}</dd>
          <dt>
            <span id="dateOfBirth">
              <Translate contentKey="somaliviswebappApp.applicant.dateOfBirth">Date Of Birth</Translate>
            </span>
          </dt>
          <dd>
            {applicantEntity.dateOfBirth ? (
              <TextFormat value={applicantEntity.dateOfBirth} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="placeOfBirth">
              <Translate contentKey="somaliviswebappApp.applicant.placeOfBirth">Place Of Birth</Translate>
            </span>
          </dt>
          <dd>{applicantEntity.placeOfBirth}</dd>
          <dt>
            <span id="sex">
              <Translate contentKey="somaliviswebappApp.applicant.sex">Sex</Translate>
            </span>
          </dt>
          <dd>{applicantEntity.sex}</dd>
          <dt>
            <span id="maritalStatus">
              <Translate contentKey="somaliviswebappApp.applicant.maritalStatus">Marital Status</Translate>
            </span>
          </dt>
          <dd>{applicantEntity.maritalStatus}</dd>
          <dt>
            <span id="occupation">
              <Translate contentKey="somaliviswebappApp.applicant.occupation">Occupation</Translate>
            </span>
          </dt>
          <dd>{applicantEntity.occupation}</dd>
          <dt>
            <span id="photo">
              <Translate contentKey="somaliviswebappApp.applicant.photo">Photo</Translate>
            </span>
          </dt>
          <dd>
            {applicantEntity.photo ? (
              <div>
                {applicantEntity.photoContentType ? (
                  <a onClick={openFile(applicantEntity.photoContentType, applicantEntity.photo)}>
                    <img src={`data:${applicantEntity.photoContentType};base64,${applicantEntity.photo}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {applicantEntity.photoContentType}, {byteSize(applicantEntity.photo)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="somaliviswebappApp.applicant.applicantContactInfo">Applicant Contact Info</Translate>
          </dt>
          <dd>{applicantEntity.applicantContactInfoEmail ? applicantEntity.applicantContactInfoEmail : ''}</dd>
          <dt>
            <Translate contentKey="somaliviswebappApp.applicant.nationality">Nationality</Translate>
          </dt>
          <dd>{applicantEntity.nationalityCountryName ? applicantEntity.nationalityCountryName : ''}</dd>
          <dt>
            <Translate contentKey="somaliviswebappApp.applicant.countryOfBirth">Country Of Birth</Translate>
          </dt>
          <dd>{applicantEntity.countryOfBirthCountryName ? applicantEntity.countryOfBirthCountryName : ''}</dd>
          <dt>
            <Translate contentKey="somaliviswebappApp.applicant.nationalityAtBirth">Nationality At Birth</Translate>
          </dt>
          <dd>{applicantEntity.nationalityAtBirthCountryName ? applicantEntity.nationalityAtBirthCountryName : ''}</dd>
        </dl>
        <Button tag={Link} to="/applicant" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/applicant/${applicantEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ applicant }: IRootState) => ({
  applicantEntity: applicant.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantDetail);
