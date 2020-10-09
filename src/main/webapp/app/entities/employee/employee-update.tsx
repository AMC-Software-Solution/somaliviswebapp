import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './employee.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeUpdate = (props: IEmployeeUpdateProps) => {
  const [userId, setUserId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { employeeEntity, users, loading, updating } = props;

  const { profilePhoto, profilePhotoContentType } = employeeEntity;

  const handleClose = () => {
    props.history.push('/employee' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
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
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.lastUpdatedDate = convertDateTimeToServer(values.lastUpdatedDate);

    if (errors.length === 0) {
      const entity = {
        ...employeeEntity,
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
          <h2 id="somaliviswebappApp.employee.home.createOrEditLabel">
            <Translate contentKey="somaliviswebappApp.employee.home.createOrEditLabel">Create or edit a Employee</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : employeeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="employee-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="employee-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="employeeFullNameLabel" for="employee-employeeFullName">
                  <Translate contentKey="somaliviswebappApp.employee.employeeFullName">Employee Full Name</Translate>
                </Label>
                <AvField id="employee-employeeFullName" type="text" name="employeeFullName" />
              </AvGroup>
              <AvGroup>
                <Label id="professionLabel" for="employee-profession">
                  <Translate contentKey="somaliviswebappApp.employee.profession">Profession</Translate>
                </Label>
                <AvField id="employee-profession" type="text" name="profession" />
              </AvGroup>
              <AvGroup>
                <Label id="phoneLabel" for="employee-phone">
                  <Translate contentKey="somaliviswebappApp.employee.phone">Phone</Translate>
                </Label>
                <AvField id="employee-phone" type="text" name="phone" />
              </AvGroup>
              <AvGroup>
                <Label id="genderLabel" for="employee-gender">
                  <Translate contentKey="somaliviswebappApp.employee.gender">Gender</Translate>
                </Label>
                <AvInput
                  id="employee-gender"
                  type="select"
                  className="form-control"
                  name="gender"
                  value={(!isNew && employeeEntity.gender) || 'MALE'}
                >
                  <option value="MALE">{translate('somaliviswebappApp.Gender.MALE')}</option>
                  <option value="FEMALE">{translate('somaliviswebappApp.Gender.FEMALE')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="bioLabel" for="employee-bio">
                  <Translate contentKey="somaliviswebappApp.employee.bio">Bio</Translate>
                </Label>
                <AvField id="employee-bio" type="text" name="bio" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="profilePhotoLabel" for="profilePhoto">
                    <Translate contentKey="somaliviswebappApp.employee.profilePhoto">Profile Photo</Translate>
                  </Label>
                  <br />
                  {profilePhoto ? (
                    <div>
                      {profilePhotoContentType ? (
                        <a onClick={openFile(profilePhotoContentType, profilePhoto)}>
                          <img src={`data:${profilePhotoContentType};base64,${profilePhoto}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {profilePhotoContentType}, {byteSize(profilePhoto)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('profilePhoto')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_profilePhoto" type="file" onChange={onBlobChange(true, 'profilePhoto')} accept="image/*" />
                  <AvInput type="hidden" name="profilePhoto" value={profilePhoto} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="profilePhotoUrlLabel" for="employee-profilePhotoUrl">
                  <Translate contentKey="somaliviswebappApp.employee.profilePhotoUrl">Profile Photo Url</Translate>
                </Label>
                <AvField id="employee-profilePhotoUrl" type="text" name="profilePhotoUrl" />
              </AvGroup>
              <AvGroup check>
                <Label id="enabledLabel">
                  <AvInput id="employee-enabled" type="checkbox" className="form-check-input" name="enabled" />
                  <Translate contentKey="somaliviswebappApp.employee.enabled">Enabled</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="reasonLabel" for="employee-reason">
                  <Translate contentKey="somaliviswebappApp.employee.reason">Reason</Translate>
                </Label>
                <AvField id="employee-reason" type="text" name="reason" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="employee-createdDate">
                  <Translate contentKey="somaliviswebappApp.employee.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="employee-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.employeeEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastUpdatedDateLabel" for="employee-lastUpdatedDate">
                  <Translate contentKey="somaliviswebappApp.employee.lastUpdatedDate">Last Updated Date</Translate>
                </Label>
                <AvInput
                  id="employee-lastUpdatedDate"
                  type="datetime-local"
                  className="form-control"
                  name="lastUpdatedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.employeeEntity.lastUpdatedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="employee-user">
                  <Translate contentKey="somaliviswebappApp.employee.user">User</Translate>
                </Label>
                <AvInput id="employee-user" type="select" className="form-control" name="userId">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.login}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/employee" replace color="info">
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
  users: storeState.userManagement.users,
  employeeEntity: storeState.employee.entity,
  loading: storeState.employee.loading,
  updating: storeState.employee.updating,
  updateSuccess: storeState.employee.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeUpdate);
