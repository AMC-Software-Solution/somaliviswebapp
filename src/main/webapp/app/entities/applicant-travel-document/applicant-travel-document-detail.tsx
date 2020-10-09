import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './applicant-travel-document.reducer';
import { IApplicantTravelDocument } from 'app/shared/model/applicant-travel-document.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApplicantTravelDocumentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApplicantTravelDocumentDetail = (props: IApplicantTravelDocumentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { applicantTravelDocumentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="somaliviswebappApp.applicantTravelDocument.detail.title">ApplicantTravelDocument</Translate> [
          <b>{applicantTravelDocumentEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="documentNumber">
              <Translate contentKey="somaliviswebappApp.applicantTravelDocument.documentNumber">Document Number</Translate>
            </span>
          </dt>
          <dd>{applicantTravelDocumentEntity.documentNumber}</dd>
          <dt>
            <span id="dateOfIssue">
              <Translate contentKey="somaliviswebappApp.applicantTravelDocument.dateOfIssue">Date Of Issue</Translate>
            </span>
          </dt>
          <dd>
            {applicantTravelDocumentEntity.dateOfIssue ? (
              <TextFormat value={applicantTravelDocumentEntity.dateOfIssue} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="expiryDate">
              <Translate contentKey="somaliviswebappApp.applicantTravelDocument.expiryDate">Expiry Date</Translate>
            </span>
          </dt>
          <dd>
            {applicantTravelDocumentEntity.expiryDate ? (
              <TextFormat value={applicantTravelDocumentEntity.expiryDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="issuingAuthority">
              <Translate contentKey="somaliviswebappApp.applicantTravelDocument.issuingAuthority">Issuing Authority</Translate>
            </span>
          </dt>
          <dd>{applicantTravelDocumentEntity.issuingAuthority}</dd>
          <dt>
            <span id="documentPhoto">
              <Translate contentKey="somaliviswebappApp.applicantTravelDocument.documentPhoto">Document Photo</Translate>
            </span>
          </dt>
          <dd>
            {applicantTravelDocumentEntity.documentPhoto ? (
              <div>
                {applicantTravelDocumentEntity.documentPhotoContentType ? (
                  <a
                    onClick={openFile(applicantTravelDocumentEntity.documentPhotoContentType, applicantTravelDocumentEntity.documentPhoto)}
                  >
                    <img
                      src={`data:${applicantTravelDocumentEntity.documentPhotoContentType};base64,${applicantTravelDocumentEntity.documentPhoto}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {applicantTravelDocumentEntity.documentPhotoContentType}, {byteSize(applicantTravelDocumentEntity.documentPhoto)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="typeOfDocument">
              <Translate contentKey="somaliviswebappApp.applicantTravelDocument.typeOfDocument">Type Of Document</Translate>
            </span>
          </dt>
          <dd>{applicantTravelDocumentEntity.typeOfDocument}</dd>
          <dt>
            <Translate contentKey="somaliviswebappApp.applicantTravelDocument.applicant">Applicant</Translate>
          </dt>
          <dd>{applicantTravelDocumentEntity.applicantFullName ? applicantTravelDocumentEntity.applicantFullName : ''}</dd>
        </dl>
        <Button tag={Link} to="/applicant-travel-document" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/applicant-travel-document/${applicantTravelDocumentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ applicantTravelDocument }: IRootState) => ({
  applicantTravelDocumentEntity: applicantTravelDocument.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantTravelDocumentDetail);
