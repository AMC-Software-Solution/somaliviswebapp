import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './application-comment.reducer';
import { IApplicationComment } from 'app/shared/model/application-comment.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApplicationCommentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApplicationCommentDetail = (props: IApplicationCommentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { applicationCommentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="somaliviswebappApp.applicationComment.detail.title">ApplicationComment</Translate> [
          <b>{applicationCommentEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="title">
              <Translate contentKey="somaliviswebappApp.applicationComment.title">Title</Translate>
            </span>
          </dt>
          <dd>{applicationCommentEntity.title}</dd>
          <dt>
            <span id="comment">
              <Translate contentKey="somaliviswebappApp.applicationComment.comment">Comment</Translate>
            </span>
          </dt>
          <dd>{applicationCommentEntity.comment}</dd>
          <dt>
            <span id="commentDate">
              <Translate contentKey="somaliviswebappApp.applicationComment.commentDate">Comment Date</Translate>
            </span>
          </dt>
          <dd>
            {applicationCommentEntity.commentDate ? (
              <TextFormat value={applicationCommentEntity.commentDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="commenterType">
              <Translate contentKey="somaliviswebappApp.applicationComment.commenterType">Commenter Type</Translate>
            </span>
          </dt>
          <dd>{applicationCommentEntity.commenterType}</dd>
          <dt>
            <Translate contentKey="somaliviswebappApp.applicationComment.visaApplication">Visa Application</Translate>
          </dt>
          <dd>{applicationCommentEntity.visaApplicationApplicationName ? applicationCommentEntity.visaApplicationApplicationName : ''}</dd>
          <dt>
            <Translate contentKey="somaliviswebappApp.applicationComment.commentedBy">Commented By</Translate>
          </dt>
          <dd>{applicationCommentEntity.commentedByLogin ? applicationCommentEntity.commentedByLogin : ''}</dd>
        </dl>
        <Button tag={Link} to="/application-comment" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/application-comment/${applicationCommentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ applicationComment }: IRootState) => ({
  applicationCommentEntity: applicationComment.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationCommentDetail);
