import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeDetail = (props: IEmployeeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { employeeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="somaliviswebappApp.employee.detail.title">Employee</Translate> [<b>{employeeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="employeeFullName">
              <Translate contentKey="somaliviswebappApp.employee.employeeFullName">Employee Full Name</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.employeeFullName}</dd>
          <dt>
            <span id="profession">
              <Translate contentKey="somaliviswebappApp.employee.profession">Profession</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.profession}</dd>
          <dt>
            <span id="phone">
              <Translate contentKey="somaliviswebappApp.employee.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.phone}</dd>
          <dt>
            <span id="gender">
              <Translate contentKey="somaliviswebappApp.employee.gender">Gender</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.gender}</dd>
          <dt>
            <span id="bio">
              <Translate contentKey="somaliviswebappApp.employee.bio">Bio</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.bio}</dd>
          <dt>
            <span id="profilePhoto">
              <Translate contentKey="somaliviswebappApp.employee.profilePhoto">Profile Photo</Translate>
            </span>
          </dt>
          <dd>
            {employeeEntity.profilePhoto ? (
              <div>
                {employeeEntity.profilePhotoContentType ? (
                  <a onClick={openFile(employeeEntity.profilePhotoContentType, employeeEntity.profilePhoto)}>
                    <img
                      src={`data:${employeeEntity.profilePhotoContentType};base64,${employeeEntity.profilePhoto}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {employeeEntity.profilePhotoContentType}, {byteSize(employeeEntity.profilePhoto)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="profilePhotoUrl">
              <Translate contentKey="somaliviswebappApp.employee.profilePhotoUrl">Profile Photo Url</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.profilePhotoUrl}</dd>
          <dt>
            <span id="enabled">
              <Translate contentKey="somaliviswebappApp.employee.enabled">Enabled</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.enabled ? 'true' : 'false'}</dd>
          <dt>
            <span id="reason">
              <Translate contentKey="somaliviswebappApp.employee.reason">Reason</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.reason}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="somaliviswebappApp.employee.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {employeeEntity.createdDate ? <TextFormat value={employeeEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="lastUpdatedDate">
              <Translate contentKey="somaliviswebappApp.employee.lastUpdatedDate">Last Updated Date</Translate>
            </span>
          </dt>
          <dd>
            {employeeEntity.lastUpdatedDate ? (
              <TextFormat value={employeeEntity.lastUpdatedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="somaliviswebappApp.employee.user">User</Translate>
          </dt>
          <dd>{employeeEntity.userLogin ? employeeEntity.userLogin : ''}</dd>
        </dl>
        <Button tag={Link} to="/employee" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employee/${employeeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ employee }: IRootState) => ({
  employeeEntity: employee.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetail);
