import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IVisaApplicationStay } from 'app/shared/model/visa-application-stay.model';
import { getEntities as getVisaApplicationStays } from 'app/entities/visa-application-stay/visa-application-stay.reducer';
import { IApplicationFee } from 'app/shared/model/application-fee.model';
import { getEntities as getApplicationFees } from 'app/entities/application-fee/application-fee.reducer';
import { IElectronicVisa } from 'app/shared/model/electronic-visa.model';
import { getEntities as getElectronicVisas } from 'app/entities/electronic-visa/electronic-visa.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';
import { getEntity, updateEntity, createEntity, reset } from './visa-application.reducer';
import { IVisaApplication } from 'app/shared/model/visa-application.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVisaApplicationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VisaApplicationUpdate = (props: IVisaApplicationUpdateProps) => {
  const [visaApplicationStayId, setVisaApplicationStayId] = useState('0');
  const [applicationFeeId, setApplicationFeeId] = useState('0');
  const [electronicVisaId, setElectronicVisaId] = useState('0');
  const [approvedById, setApprovedById] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { visaApplicationEntity, visaApplicationStays, applicationFees, electronicVisas, employees, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/visa-application' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getVisaApplicationStays();
    props.getApplicationFees();
    props.getElectronicVisas();
    props.getEmployees();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.applicationDate = convertDateTimeToServer(values.applicationDate);
    values.approvedDate = convertDateTimeToServer(values.approvedDate);

    if (errors.length === 0) {
      const entity = {
        ...visaApplicationEntity,
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
          <h2 id="somaliviswebappApp.visaApplication.home.createOrEditLabel">
            <Translate contentKey="somaliviswebappApp.visaApplication.home.createOrEditLabel">Create or edit a VisaApplication</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : visaApplicationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="visa-application-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="visa-application-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="applicationNameLabel" for="visa-application-applicationName">
                  <Translate contentKey="somaliviswebappApp.visaApplication.applicationName">Application Name</Translate>
                </Label>
                <AvField
                  id="visa-application-applicationName"
                  type="text"
                  name="applicationName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="applicationCodeLabel" for="visa-application-applicationCode">
                  <Translate contentKey="somaliviswebappApp.visaApplication.applicationCode">Application Code</Translate>
                </Label>
                <AvField id="visa-application-applicationCode" type="text" name="applicationCode" />
              </AvGroup>
              <AvGroup>
                <Label id="applicationDateLabel" for="visa-application-applicationDate">
                  <Translate contentKey="somaliviswebappApp.visaApplication.applicationDate">Application Date</Translate>
                </Label>
                <AvInput
                  id="visa-application-applicationDate"
                  type="datetime-local"
                  className="form-control"
                  name="applicationDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.visaApplicationEntity.applicationDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="applicationStatusLabel" for="visa-application-applicationStatus">
                  <Translate contentKey="somaliviswebappApp.visaApplication.applicationStatus">Application Status</Translate>
                </Label>
                <AvInput
                  id="visa-application-applicationStatus"
                  type="select"
                  className="form-control"
                  name="applicationStatus"
                  value={(!isNew && visaApplicationEntity.applicationStatus) || 'RECEIVED'}
                >
                  <option value="RECEIVED">{translate('somaliviswebappApp.ApplicationStatus.RECEIVED')}</option>
                  <option value="UNDER_PROCESS">{translate('somaliviswebappApp.ApplicationStatus.UNDER_PROCESS')}</option>
                  <option value="APPROVED">{translate('somaliviswebappApp.ApplicationStatus.APPROVED')}</option>
                  <option value="CANCELLED">{translate('somaliviswebappApp.ApplicationStatus.CANCELLED')}</option>
                  <option value="REJECTED">{translate('somaliviswebappApp.ApplicationStatus.REJECTED')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="travelPurposeLabel" for="visa-application-travelPurpose">
                  <Translate contentKey="somaliviswebappApp.visaApplication.travelPurpose">Travel Purpose</Translate>
                </Label>
                <AvInput
                  id="visa-application-travelPurpose"
                  type="select"
                  className="form-control"
                  name="travelPurpose"
                  value={(!isNew && visaApplicationEntity.travelPurpose) || 'TOURISM'}
                >
                  <option value="TOURISM">{translate('somaliviswebappApp.TravelPurpose.TOURISM')}</option>
                  <option value="BUSINESS">{translate('somaliviswebappApp.TravelPurpose.BUSINESS')}</option>
                  <option value="OFFICIAL_VISIT">{translate('somaliviswebappApp.TravelPurpose.OFFICIAL_VISIT')}</option>
                  <option value="TRANSIT">{translate('somaliviswebappApp.TravelPurpose.TRANSIT')}</option>
                  <option value="STUDY">{translate('somaliviswebappApp.TravelPurpose.STUDY')}</option>
                  <option value="MEDICAL">{translate('somaliviswebappApp.TravelPurpose.MEDICAL')}</option>
                  <option value="CULTURE">{translate('somaliviswebappApp.TravelPurpose.CULTURE')}</option>
                  <option value="SPORTS">{translate('somaliviswebappApp.TravelPurpose.SPORTS')}</option>
                  <option value="OTHER">{translate('somaliviswebappApp.TravelPurpose.OTHER')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="visaTypeLabel" for="visa-application-visaType">
                  <Translate contentKey="somaliviswebappApp.visaApplication.visaType">Visa Type</Translate>
                </Label>
                <AvInput
                  id="visa-application-visaType"
                  type="select"
                  className="form-control"
                  name="visaType"
                  value={(!isNew && visaApplicationEntity.visaType) || 'SINGLE_ENTRY'}
                >
                  <option value="SINGLE_ENTRY">{translate('somaliviswebappApp.VisaType.SINGLE_ENTRY')}</option>
                  <option value="MULTIPLE_ENTRY">{translate('somaliviswebappApp.VisaType.MULTIPLE_ENTRY')}</option>
                  <option value="TRANSIT">{translate('somaliviswebappApp.VisaType.TRANSIT')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="travelModeLabel" for="visa-application-travelMode">
                  <Translate contentKey="somaliviswebappApp.visaApplication.travelMode">Travel Mode</Translate>
                </Label>
                <AvInput
                  id="visa-application-travelMode"
                  type="select"
                  className="form-control"
                  name="travelMode"
                  value={(!isNew && visaApplicationEntity.travelMode) || 'AIR'}
                >
                  <option value="AIR">{translate('somaliviswebappApp.TravelMode.AIR')}</option>
                  <option value="SEA">{translate('somaliviswebappApp.TravelMode.SEA')}</option>
                  <option value="LAND">{translate('somaliviswebappApp.TravelMode.LAND')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="portOfEntryLabel" for="visa-application-portOfEntry">
                  <Translate contentKey="somaliviswebappApp.visaApplication.portOfEntry">Port Of Entry</Translate>
                </Label>
                <AvField
                  id="visa-application-portOfEntry"
                  type="text"
                  name="portOfEntry"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="numberOfEntriesRequestedLabel" for="visa-application-numberOfEntriesRequested">
                  <Translate contentKey="somaliviswebappApp.visaApplication.numberOfEntriesRequested">
                    Number Of Entries Requested
                  </Translate>
                </Label>
                <AvField
                  id="visa-application-numberOfEntriesRequested"
                  type="text"
                  name="numberOfEntriesRequested"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="intendedDateOfArrivalLabel" for="visa-application-intendedDateOfArrival">
                  <Translate contentKey="somaliviswebappApp.visaApplication.intendedDateOfArrival">Intended Date Of Arrival</Translate>
                </Label>
                <AvField
                  id="visa-application-intendedDateOfArrival"
                  type="date"
                  className="form-control"
                  name="intendedDateOfArrival"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="intendedDateOfDepartureLabel" for="visa-application-intendedDateOfDeparture">
                  <Translate contentKey="somaliviswebappApp.visaApplication.intendedDateOfDeparture">Intended Date Of Departure</Translate>
                </Label>
                <AvField
                  id="visa-application-intendedDateOfDeparture"
                  type="date"
                  className="form-control"
                  name="intendedDateOfDeparture"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="validUntilLabel" for="visa-application-validUntil">
                  <Translate contentKey="somaliviswebappApp.visaApplication.validUntil">Valid Until</Translate>
                </Label>
                <AvField
                  id="visa-application-validUntil"
                  type="date"
                  className="form-control"
                  name="validUntil"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="travelPurposeOtherLabel" for="visa-application-travelPurposeOther">
                  <Translate contentKey="somaliviswebappApp.visaApplication.travelPurposeOther">Travel Purpose Other</Translate>
                </Label>
                <AvField id="visa-application-travelPurposeOther" type="text" name="travelPurposeOther" />
              </AvGroup>
              <AvGroup>
                <Label id="rejectReasonLabel" for="visa-application-rejectReason">
                  <Translate contentKey="somaliviswebappApp.visaApplication.rejectReason">Reject Reason</Translate>
                </Label>
                <AvField id="visa-application-rejectReason" type="text" name="rejectReason" />
              </AvGroup>
              <AvGroup>
                <Label id="approvedDateLabel" for="visa-application-approvedDate">
                  <Translate contentKey="somaliviswebappApp.visaApplication.approvedDate">Approved Date</Translate>
                </Label>
                <AvInput
                  id="visa-application-approvedDate"
                  type="datetime-local"
                  className="form-control"
                  name="approvedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.visaApplicationEntity.approvedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="visa-application-visaApplicationStay">
                  <Translate contentKey="somaliviswebappApp.visaApplication.visaApplicationStay">Visa Application Stay</Translate>
                </Label>
                <AvInput id="visa-application-visaApplicationStay" type="select" className="form-control" name="visaApplicationStayId">
                  <option value="" key="0" />
                  {visaApplicationStays
                    ? visaApplicationStays.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.stayLocationFullAddress}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="visa-application-applicationFee">
                  <Translate contentKey="somaliviswebappApp.visaApplication.applicationFee">Application Fee</Translate>
                </Label>
                <AvInput id="visa-application-applicationFee" type="select" className="form-control" name="applicationFeeId">
                  <option value="" key="0" />
                  {applicationFees
                    ? applicationFees.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.description}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="visa-application-electronicVisa">
                  <Translate contentKey="somaliviswebappApp.visaApplication.electronicVisa">Electronic Visa</Translate>
                </Label>
                <AvInput id="visa-application-electronicVisa" type="select" className="form-control" name="electronicVisaId">
                  <option value="" key="0" />
                  {electronicVisas
                    ? electronicVisas.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.visaNumber}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="visa-application-approvedBy">
                  <Translate contentKey="somaliviswebappApp.visaApplication.approvedBy">Approved By</Translate>
                </Label>
                <AvInput id="visa-application-approvedBy" type="select" className="form-control" name="approvedById">
                  <option value="" key="0" />
                  {employees
                    ? employees.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.employeeFullName}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/visa-application" replace color="info">
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
  visaApplicationStays: storeState.visaApplicationStay.entities,
  applicationFees: storeState.applicationFee.entities,
  electronicVisas: storeState.electronicVisa.entities,
  employees: storeState.employee.entities,
  visaApplicationEntity: storeState.visaApplication.entity,
  loading: storeState.visaApplication.loading,
  updating: storeState.visaApplication.updating,
  updateSuccess: storeState.visaApplication.updateSuccess,
});

const mapDispatchToProps = {
  getVisaApplicationStays,
  getApplicationFees,
  getElectronicVisas,
  getEmployees,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VisaApplicationUpdate);
