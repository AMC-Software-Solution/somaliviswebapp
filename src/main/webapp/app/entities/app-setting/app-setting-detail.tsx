import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './app-setting.reducer';
import { IAppSetting } from 'app/shared/model/app-setting.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAppSettingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AppSettingDetail = (props: IAppSettingDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { appSettingEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="somaliviswebappApp.appSetting.detail.title">AppSetting</Translate> [<b>{appSettingEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="fieldName">
              <Translate contentKey="somaliviswebappApp.appSetting.fieldName">Field Name</Translate>
            </span>
          </dt>
          <dd>{appSettingEntity.fieldName}</dd>
          <dt>
            <span id="fieldValue">
              <Translate contentKey="somaliviswebappApp.appSetting.fieldValue">Field Value</Translate>
            </span>
          </dt>
          <dd>{appSettingEntity.fieldValue}</dd>
          <dt>
            <span id="defaultValue">
              <Translate contentKey="somaliviswebappApp.appSetting.defaultValue">Default Value</Translate>
            </span>
          </dt>
          <dd>{appSettingEntity.defaultValue}</dd>
          <dt>
            <span id="enabled">
              <Translate contentKey="somaliviswebappApp.appSetting.enabled">Enabled</Translate>
            </span>
          </dt>
          <dd>{appSettingEntity.enabled ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="somaliviswebappApp.appSetting.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {appSettingEntity.createdDate ? <TextFormat value={appSettingEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="somaliviswebappApp.appSetting.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>
            {appSettingEntity.updatedDate ? <TextFormat value={appSettingEntity.updatedDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/app-setting" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/app-setting/${appSettingEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ appSetting }: IRootState) => ({
  appSettingEntity: appSetting.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AppSettingDetail);
