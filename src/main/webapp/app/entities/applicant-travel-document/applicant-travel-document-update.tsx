import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IApplicant } from 'app/shared/model/applicant.model';
import { getEntities as getApplicants } from 'app/entities/applicant/applicant.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './applicant-travel-document.reducer';
import { IApplicantTravelDocument } from 'app/shared/model/applicant-travel-document.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IApplicantTravelDocumentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApplicantTravelDocumentUpdate = (props: IApplicantTravelDocumentUpdateProps) => {
  const [applicantId, setApplicantId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { applicantTravelDocumentEntity, applicants, loading, updating } = props;

  const { documentPhoto, documentPhotoContentType } = applicantTravelDocumentEntity;

  const handleClose = () => {
    props.history.push('/applicant-travel-document' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getApplicants();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...applicantTravelDocumentEntity,
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
          <h2 id="somaliviswebappApp.applicantTravelDocument.home.createOrEditLabel">
            <Translate contentKey="somaliviswebappApp.applicantTravelDocument.home.createOrEditLabel">
              Create or edit a ApplicantTravelDocument
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : applicantTravelDocumentEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="applicant-travel-document-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="applicant-travel-document-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="documentNumberLabel" for="applicant-travel-document-documentNumber">
                  <Translate contentKey="somaliviswebappApp.applicantTravelDocument.documentNumber">Document Number</Translate>
                </Label>
                <AvField
                  id="applicant-travel-document-documentNumber"
                  type="text"
                  name="documentNumber"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateOfIssueLabel" for="applicant-travel-document-dateOfIssue">
                  <Translate contentKey="somaliviswebappApp.applicantTravelDocument.dateOfIssue">Date Of Issue</Translate>
                </Label>
                <AvField
                  id="applicant-travel-document-dateOfIssue"
                  type="date"
                  className="form-control"
                  name="dateOfIssue"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="expiryDateLabel" for="applicant-travel-document-expiryDate">
                  <Translate contentKey="somaliviswebappApp.applicantTravelDocument.expiryDate">Expiry Date</Translate>
                </Label>
                <AvField
                  id="applicant-travel-document-expiryDate"
                  type="date"
                  className="form-control"
                  name="expiryDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="issuingAuthorityLabel" for="applicant-travel-document-issuingAuthority">
                  <Translate contentKey="somaliviswebappApp.applicantTravelDocument.issuingAuthority">Issuing Authority</Translate>
                </Label>
                <AvField
                  id="applicant-travel-document-issuingAuthority"
                  type="text"
                  name="issuingAuthority"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="documentPhotoLabel" for="documentPhoto">
                    <Translate contentKey="somaliviswebappApp.applicantTravelDocument.documentPhoto">Document Photo</Translate>
                  </Label>
                  <br />
                  {documentPhoto ? (
                    <div>
                      {documentPhotoContentType ? (
                        <a onClick={openFile(documentPhotoContentType, documentPhoto)}>
                          <img src={`data:${documentPhotoContentType};base64,${documentPhoto}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {documentPhotoContentType}, {byteSize(documentPhoto)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('documentPhoto')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_documentPhoto" type="file" onChange={onBlobChange(true, 'documentPhoto')} accept="image/*" />
                  <AvInput
                    type="hidden"
                    name="documentPhoto"
                    value={documentPhoto}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                    }}
                  />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="typeOfDocumentLabel" for="applicant-travel-document-typeOfDocument">
                  <Translate contentKey="somaliviswebappApp.applicantTravelDocument.typeOfDocument">Type Of Document</Translate>
                </Label>
                <AvInput
                  id="applicant-travel-document-typeOfDocument"
                  type="select"
                  className="form-control"
                  name="typeOfDocument"
                  value={(!isNew && applicantTravelDocumentEntity.typeOfDocument) || 'ORDINARY_PASSPORT'}
                >
                  <option value="ORDINARY_PASSPORT">{translate('somaliviswebappApp.TypeOfTravelDocument.ORDINARY_PASSPORT')}</option>
                  <option value="SERVICE_PASSPORT">{translate('somaliviswebappApp.TypeOfTravelDocument.SERVICE_PASSPORT')}</option>
                  <option value="DIPLOMATIC_PASSPORT">{translate('somaliviswebappApp.TypeOfTravelDocument.DIPLOMATIC_PASSPORT')}</option>
                  <option value="OFFICIAL_PASSPORT">{translate('somaliviswebappApp.TypeOfTravelDocument.OFFICIAL_PASSPORT')}</option>
                  <option value="SUPPORTING_DOCUMENT">{translate('somaliviswebappApp.TypeOfTravelDocument.SUPPORTING_DOCUMENT')}</option>
                  <option value="OTHER">{translate('somaliviswebappApp.TypeOfTravelDocument.OTHER')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="applicant-travel-document-applicant">
                  <Translate contentKey="somaliviswebappApp.applicantTravelDocument.applicant">Applicant</Translate>
                </Label>
                <AvInput id="applicant-travel-document-applicant" type="select" className="form-control" name="applicantId">
                  <option value="" key="0" />
                  {applicants
                    ? applicants.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.fullName}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/applicant-travel-document" replace color="info">
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
  applicants: storeState.applicant.entities,
  applicantTravelDocumentEntity: storeState.applicantTravelDocument.entity,
  loading: storeState.applicantTravelDocument.loading,
  updating: storeState.applicantTravelDocument.updating,
  updateSuccess: storeState.applicantTravelDocument.updateSuccess,
});

const mapDispatchToProps = {
  getApplicants,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantTravelDocumentUpdate);
