import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IVisaApplication } from 'app/shared/model/visa-application.model';
import { getEntities as getVisaApplications } from 'app/entities/visa-application/visa-application.reducer';
import { getEntity, updateEntity, createEntity, reset } from './electronic-visa.reducer';
import { IElectronicVisa } from 'app/shared/model/electronic-visa.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IElectronicVisaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ElectronicVisaUpdate = (props: IElectronicVisaUpdateProps) => {
  const [visaApplicationId, setVisaApplicationId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { electronicVisaEntity, visaApplications, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/electronic-visa' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getVisaApplications();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...electronicVisaEntity,
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
          <h2 id="somaliviswebappApp.electronicVisa.home.createOrEditLabel">
            <Translate contentKey="somaliviswebappApp.electronicVisa.home.createOrEditLabel">Create or edit a ElectronicVisa</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : electronicVisaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="electronic-visa-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="electronic-visa-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="firstNameLabel" for="electronic-visa-firstName">
                  <Translate contentKey="somaliviswebappApp.electronicVisa.firstName">First Name</Translate>
                </Label>
                <AvField
                  id="electronic-visa-firstName"
                  type="text"
                  name="firstName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="electronic-visa-lastName">
                  <Translate contentKey="somaliviswebappApp.electronicVisa.lastName">Last Name</Translate>
                </Label>
                <AvField
                  id="electronic-visa-lastName"
                  type="text"
                  name="lastName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="visaNumberLabel" for="electronic-visa-visaNumber">
                  <Translate contentKey="somaliviswebappApp.electronicVisa.visaNumber">Visa Number</Translate>
                </Label>
                <AvField
                  id="electronic-visa-visaNumber"
                  type="text"
                  name="visaNumber"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="barcodeLabel" for="electronic-visa-barcode">
                  <Translate contentKey="somaliviswebappApp.electronicVisa.barcode">Barcode</Translate>
                </Label>
                <AvField
                  id="electronic-visa-barcode"
                  type="text"
                  name="barcode"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="nationalityLabel" for="electronic-visa-nationality">
                  <Translate contentKey="somaliviswebappApp.electronicVisa.nationality">Nationality</Translate>
                </Label>
                <AvField
                  id="electronic-visa-nationality"
                  type="text"
                  name="nationality"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="placeOfBirthLabel" for="electronic-visa-placeOfBirth">
                  <Translate contentKey="somaliviswebappApp.electronicVisa.placeOfBirth">Place Of Birth</Translate>
                </Label>
                <AvField
                  id="electronic-visa-placeOfBirth"
                  type="text"
                  name="placeOfBirth"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="travelDocumentLabel" for="electronic-visa-travelDocument">
                  <Translate contentKey="somaliviswebappApp.electronicVisa.travelDocument">Travel Document</Translate>
                </Label>
                <AvField
                  id="electronic-visa-travelDocument"
                  type="text"
                  name="travelDocument"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="travelDocumentIssueDateLabel" for="electronic-visa-travelDocumentIssueDate">
                  <Translate contentKey="somaliviswebappApp.electronicVisa.travelDocumentIssueDate">Travel Document Issue Date</Translate>
                </Label>
                <AvField
                  id="electronic-visa-travelDocumentIssueDate"
                  type="date"
                  className="form-control"
                  name="travelDocumentIssueDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="travelDocumentExpiryDateLabel" for="electronic-visa-travelDocumentExpiryDate">
                  <Translate contentKey="somaliviswebappApp.electronicVisa.travelDocumentExpiryDate">Travel Document Expiry Date</Translate>
                </Label>
                <AvField
                  id="electronic-visa-travelDocumentExpiryDate"
                  type="date"
                  className="form-control"
                  name="travelDocumentExpiryDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="travelPurposeLabel" for="electronic-visa-travelPurpose">
                  <Translate contentKey="somaliviswebappApp.electronicVisa.travelPurpose">Travel Purpose</Translate>
                </Label>
                <AvField
                  id="electronic-visa-travelPurpose"
                  type="text"
                  name="travelPurpose"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="visaValidFromLabel" for="electronic-visa-visaValidFrom">
                  <Translate contentKey="somaliviswebappApp.electronicVisa.visaValidFrom">Visa Valid From</Translate>
                </Label>
                <AvField
                  id="electronic-visa-visaValidFrom"
                  type="date"
                  className="form-control"
                  name="visaValidFrom"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="visaValidUntilLabel" for="electronic-visa-visaValidUntil">
                  <Translate contentKey="somaliviswebappApp.electronicVisa.visaValidUntil">Visa Valid Until</Translate>
                </Label>
                <AvField
                  id="electronic-visa-visaValidUntil"
                  type="date"
                  className="form-control"
                  name="visaValidUntil"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="visaValidityTypeLabel" for="electronic-visa-visaValidityType">
                  <Translate contentKey="somaliviswebappApp.electronicVisa.visaValidityType">Visa Validity Type</Translate>
                </Label>
                <AvField
                  id="electronic-visa-visaValidityType"
                  type="text"
                  name="visaValidityType"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="visaTypeLabel" for="electronic-visa-visaType">
                  <Translate contentKey="somaliviswebappApp.electronicVisa.visaType">Visa Type</Translate>
                </Label>
                <AvField
                  id="electronic-visa-visaType"
                  type="text"
                  name="visaType"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/electronic-visa" replace color="info">
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
  visaApplications: storeState.visaApplication.entities,
  electronicVisaEntity: storeState.electronicVisa.entity,
  loading: storeState.electronicVisa.loading,
  updating: storeState.electronicVisa.updating,
  updateSuccess: storeState.electronicVisa.updateSuccess,
});

const mapDispatchToProps = {
  getVisaApplications,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ElectronicVisaUpdate);
