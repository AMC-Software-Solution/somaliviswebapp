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
import { getEntity, updateEntity, createEntity, reset } from './visa-application-stay.reducer';
import { IVisaApplicationStay } from 'app/shared/model/visa-application-stay.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVisaApplicationStayUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VisaApplicationStayUpdate = (props: IVisaApplicationStayUpdateProps) => {
  const [visaApplicationId, setVisaApplicationId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { visaApplicationStayEntity, visaApplications, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/visa-application-stay' + props.location.search);
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
        ...visaApplicationStayEntity,
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
          <h2 id="somaliviswebappApp.visaApplicationStay.home.createOrEditLabel">
            <Translate contentKey="somaliviswebappApp.visaApplicationStay.home.createOrEditLabel">
              Create or edit a VisaApplicationStay
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : visaApplicationStayEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="visa-application-stay-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="visa-application-stay-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="durationOfProposedStayInDaysLabel" for="visa-application-stay-durationOfProposedStayInDays">
                  <Translate contentKey="somaliviswebappApp.visaApplicationStay.durationOfProposedStayInDays">
                    Duration Of Proposed Stay In Days
                  </Translate>
                </Label>
                <AvField
                  id="visa-application-stay-durationOfProposedStayInDays"
                  type="string"
                  className="form-control"
                  name="durationOfProposedStayInDays"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="nameOfHostingPersonOrcompanyLabel" for="visa-application-stay-nameOfHostingPersonOrcompany">
                  <Translate contentKey="somaliviswebappApp.visaApplicationStay.nameOfHostingPersonOrcompany">
                    Name Of Hosting Person Orcompany
                  </Translate>
                </Label>
                <AvField id="visa-application-stay-nameOfHostingPersonOrcompany" type="text" name="nameOfHostingPersonOrcompany" />
              </AvGroup>
              <AvGroup>
                <Label id="stayingLocationNameLabel" for="visa-application-stay-stayingLocationName">
                  <Translate contentKey="somaliviswebappApp.visaApplicationStay.stayingLocationName">Staying Location Name</Translate>
                </Label>
                <AvField id="visa-application-stay-stayingLocationName" type="text" name="stayingLocationName" />
              </AvGroup>
              <AvGroup>
                <Label id="stayLocationFullAddressLabel" for="visa-application-stay-stayLocationFullAddress">
                  <Translate contentKey="somaliviswebappApp.visaApplicationStay.stayLocationFullAddress">
                    Stay Location Full Address
                  </Translate>
                </Label>
                <AvField id="visa-application-stay-stayLocationFullAddress" type="text" name="stayLocationFullAddress" />
              </AvGroup>
              <AvGroup>
                <Label id="stayLocationTelephoneNumberLabel" for="visa-application-stay-stayLocationTelephoneNumber">
                  <Translate contentKey="somaliviswebappApp.visaApplicationStay.stayLocationTelephoneNumber">
                    Stay Location Telephone Number
                  </Translate>
                </Label>
                <AvField id="visa-application-stay-stayLocationTelephoneNumber" type="text" name="stayLocationTelephoneNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="stayLocationEmailLabel" for="visa-application-stay-stayLocationEmail">
                  <Translate contentKey="somaliviswebappApp.visaApplicationStay.stayLocationEmail">Stay Location Email</Translate>
                </Label>
                <AvField id="visa-application-stay-stayLocationEmail" type="text" name="stayLocationEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="whoCoversCostOfApplicantsStayLabel" for="visa-application-stay-whoCoversCostOfApplicantsStay">
                  <Translate contentKey="somaliviswebappApp.visaApplicationStay.whoCoversCostOfApplicantsStay">
                    Who Covers Cost Of Applicants Stay
                  </Translate>
                </Label>
                <AvField id="visa-application-stay-whoCoversCostOfApplicantsStay" type="text" name="whoCoversCostOfApplicantsStay" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/visa-application-stay" replace color="info">
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
  visaApplicationStayEntity: storeState.visaApplicationStay.entity,
  loading: storeState.visaApplicationStay.loading,
  updating: storeState.visaApplicationStay.updating,
  updateSuccess: storeState.visaApplicationStay.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(VisaApplicationStayUpdate);
