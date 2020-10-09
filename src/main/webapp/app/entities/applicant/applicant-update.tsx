import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IApplicantContactInfo } from 'app/shared/model/applicant-contact-info.model';
import { getEntities as getApplicantContactInfos } from 'app/entities/applicant-contact-info/applicant-contact-info.reducer';
import { ICountry } from 'app/shared/model/country.model';
import { getEntities as getCountries } from 'app/entities/country/country.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './applicant.reducer';
import { IApplicant } from 'app/shared/model/applicant.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IApplicantUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApplicantUpdate = (props: IApplicantUpdateProps) => {
  const [applicantContactInfoId, setApplicantContactInfoId] = useState('0');
  const [nationalityId, setNationalityId] = useState('0');
  const [countryOfBirthId, setCountryOfBirthId] = useState('0');
  const [nationalityAtBirthId, setNationalityAtBirthId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { applicantEntity, applicantContactInfos, countries, loading, updating } = props;

  const { photo, photoContentType } = applicantEntity;

  const handleClose = () => {
    props.history.push('/applicant' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getApplicantContactInfos();
    props.getCountries();
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
        ...applicantEntity,
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
          <h2 id="somaliviswebappApp.applicant.home.createOrEditLabel">
            <Translate contentKey="somaliviswebappApp.applicant.home.createOrEditLabel">Create or edit a Applicant</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : applicantEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="applicant-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="applicant-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="applicant-title">
                  <Translate contentKey="somaliviswebappApp.applicant.title">Title</Translate>
                </Label>
                <AvField
                  id="applicant-title"
                  type="text"
                  name="title"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="firstNameLabel" for="applicant-firstName">
                  <Translate contentKey="somaliviswebappApp.applicant.firstName">First Name</Translate>
                </Label>
                <AvField
                  id="applicant-firstName"
                  type="text"
                  name="firstName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="middleNamesLabel" for="applicant-middleNames">
                  <Translate contentKey="somaliviswebappApp.applicant.middleNames">Middle Names</Translate>
                </Label>
                <AvField
                  id="applicant-middleNames"
                  type="text"
                  name="middleNames"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="applicant-lastName">
                  <Translate contentKey="somaliviswebappApp.applicant.lastName">Last Name</Translate>
                </Label>
                <AvField
                  id="applicant-lastName"
                  type="text"
                  name="lastName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="fullNameLabel" for="applicant-fullName">
                  <Translate contentKey="somaliviswebappApp.applicant.fullName">Full Name</Translate>
                </Label>
                <AvField id="applicant-fullName" type="text" name="fullName" />
              </AvGroup>
              <AvGroup>
                <Label id="dateOfBirthLabel" for="applicant-dateOfBirth">
                  <Translate contentKey="somaliviswebappApp.applicant.dateOfBirth">Date Of Birth</Translate>
                </Label>
                <AvField
                  id="applicant-dateOfBirth"
                  type="date"
                  className="form-control"
                  name="dateOfBirth"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="placeOfBirthLabel" for="applicant-placeOfBirth">
                  <Translate contentKey="somaliviswebappApp.applicant.placeOfBirth">Place Of Birth</Translate>
                </Label>
                <AvField
                  id="applicant-placeOfBirth"
                  type="text"
                  name="placeOfBirth"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="sexLabel" for="applicant-sex">
                  <Translate contentKey="somaliviswebappApp.applicant.sex">Sex</Translate>
                </Label>
                <AvInput
                  id="applicant-sex"
                  type="select"
                  className="form-control"
                  name="sex"
                  value={(!isNew && applicantEntity.sex) || 'MALE'}
                >
                  <option value="MALE">{translate('somaliviswebappApp.Gender.MALE')}</option>
                  <option value="FEMALE">{translate('somaliviswebappApp.Gender.FEMALE')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="maritalStatusLabel" for="applicant-maritalStatus">
                  <Translate contentKey="somaliviswebappApp.applicant.maritalStatus">Marital Status</Translate>
                </Label>
                <AvInput
                  id="applicant-maritalStatus"
                  type="select"
                  className="form-control"
                  name="maritalStatus"
                  value={(!isNew && applicantEntity.maritalStatus) || 'SINGLE'}
                >
                  <option value="SINGLE">{translate('somaliviswebappApp.MaritalStatus.SINGLE')}</option>
                  <option value="MARRIED">{translate('somaliviswebappApp.MaritalStatus.MARRIED')}</option>
                  <option value="DIVORCED">{translate('somaliviswebappApp.MaritalStatus.DIVORCED')}</option>
                  <option value="WIDOW">{translate('somaliviswebappApp.MaritalStatus.WIDOW')}</option>
                  <option value="WIDOWER">{translate('somaliviswebappApp.MaritalStatus.WIDOWER')}</option>
                  <option value="SEPARATED">{translate('somaliviswebappApp.MaritalStatus.SEPARATED')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="occupationLabel" for="applicant-occupation">
                  <Translate contentKey="somaliviswebappApp.applicant.occupation">Occupation</Translate>
                </Label>
                <AvField
                  id="applicant-occupation"
                  type="text"
                  name="occupation"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="photoLabel" for="photo">
                    <Translate contentKey="somaliviswebappApp.applicant.photo">Photo</Translate>
                  </Label>
                  <br />
                  {photo ? (
                    <div>
                      {photoContentType ? (
                        <a onClick={openFile(photoContentType, photo)}>
                          <img src={`data:${photoContentType};base64,${photo}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {photoContentType}, {byteSize(photo)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('photo')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_photo" type="file" onChange={onBlobChange(true, 'photo')} accept="image/*" />
                  <AvInput
                    type="hidden"
                    name="photo"
                    value={photo}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                    }}
                  />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label for="applicant-applicantContactInfo">
                  <Translate contentKey="somaliviswebappApp.applicant.applicantContactInfo">Applicant Contact Info</Translate>
                </Label>
                <AvInput id="applicant-applicantContactInfo" type="select" className="form-control" name="applicantContactInfoId">
                  <option value="" key="0" />
                  {applicantContactInfos
                    ? applicantContactInfos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.email}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="applicant-nationality">
                  <Translate contentKey="somaliviswebappApp.applicant.nationality">Nationality</Translate>
                </Label>
                <AvInput id="applicant-nationality" type="select" className="form-control" name="nationalityId">
                  <option value="" key="0" />
                  {countries
                    ? countries.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.countryName}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="applicant-countryOfBirth">
                  <Translate contentKey="somaliviswebappApp.applicant.countryOfBirth">Country Of Birth</Translate>
                </Label>
                <AvInput id="applicant-countryOfBirth" type="select" className="form-control" name="countryOfBirthId">
                  <option value="" key="0" />
                  {countries
                    ? countries.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.countryName}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="applicant-nationalityAtBirth">
                  <Translate contentKey="somaliviswebappApp.applicant.nationalityAtBirth">Nationality At Birth</Translate>
                </Label>
                <AvInput id="applicant-nationalityAtBirth" type="select" className="form-control" name="nationalityAtBirthId">
                  <option value="" key="0" />
                  {countries
                    ? countries.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.countryName}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/applicant" replace color="info">
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
  applicantContactInfos: storeState.applicantContactInfo.entities,
  countries: storeState.country.entities,
  applicantEntity: storeState.applicant.entity,
  loading: storeState.applicant.loading,
  updating: storeState.applicant.updating,
  updateSuccess: storeState.applicant.updateSuccess,
});

const mapDispatchToProps = {
  getApplicantContactInfos,
  getCountries,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantUpdate);
