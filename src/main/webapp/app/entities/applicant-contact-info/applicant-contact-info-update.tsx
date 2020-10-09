import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IApplicant } from 'app/shared/model/applicant.model';
import { getEntities as getApplicants } from 'app/entities/applicant/applicant.reducer';
import { getEntity, updateEntity, createEntity, reset } from './applicant-contact-info.reducer';
import { IApplicantContactInfo } from 'app/shared/model/applicant-contact-info.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IApplicantContactInfoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApplicantContactInfoUpdate = (props: IApplicantContactInfoUpdateProps) => {
  const [applicantId, setApplicantId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { applicantContactInfoEntity, applicants, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/applicant-contact-info' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getApplicants();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...applicantContactInfoEntity,
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
          <h2 id="somaliviswebappApp.applicantContactInfo.home.createOrEditLabel">
            <Translate contentKey="somaliviswebappApp.applicantContactInfo.home.createOrEditLabel">
              Create or edit a ApplicantContactInfo
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : applicantContactInfoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="applicant-contact-info-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="applicant-contact-info-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="applicantsHomeAddressLabel" for="applicant-contact-info-applicantsHomeAddress">
                  <Translate contentKey="somaliviswebappApp.applicantContactInfo.applicantsHomeAddress">Applicants Home Address</Translate>
                </Label>
                <AvField
                  id="applicant-contact-info-applicantsHomeAddress"
                  type="text"
                  name="applicantsHomeAddress"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="telephoneNumberLabel" for="applicant-contact-info-telephoneNumber">
                  <Translate contentKey="somaliviswebappApp.applicantContactInfo.telephoneNumber">Telephone Number</Translate>
                </Label>
                <AvField
                  id="applicant-contact-info-telephoneNumber"
                  type="text"
                  name="telephoneNumber"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="applicant-contact-info-email">
                  <Translate contentKey="somaliviswebappApp.applicantContactInfo.email">Email</Translate>
                </Label>
                <AvField
                  id="applicant-contact-info-email"
                  type="text"
                  name="email"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="employerLabel" for="applicant-contact-info-employer">
                  <Translate contentKey="somaliviswebappApp.applicantContactInfo.employer">Employer</Translate>
                </Label>
                <AvField id="applicant-contact-info-employer" type="text" name="employer" />
              </AvGroup>
              <AvGroup>
                <Label id="employersAddressLabel" for="applicant-contact-info-employersAddress">
                  <Translate contentKey="somaliviswebappApp.applicantContactInfo.employersAddress">Employers Address</Translate>
                </Label>
                <AvField id="applicant-contact-info-employersAddress" type="text" name="employersAddress" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/applicant-contact-info" replace color="info">
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
  applicantContactInfoEntity: storeState.applicantContactInfo.entity,
  loading: storeState.applicantContactInfo.loading,
  updating: storeState.applicantContactInfo.updating,
  updateSuccess: storeState.applicantContactInfo.updateSuccess,
});

const mapDispatchToProps = {
  getApplicants,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantContactInfoUpdate);
