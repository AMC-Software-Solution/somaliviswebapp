import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IApplicantTravelDocument } from 'app/shared/model/applicant-travel-document.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './applicant-travel-document.reducer';

export interface IApplicantTravelDocumentDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApplicantTravelDocumentDeleteDialog = (props: IApplicantTravelDocumentDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/applicant-travel-document' + props.location.search);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.applicantTravelDocumentEntity.id);
  };

  const { applicantTravelDocumentEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="somaliviswebappApp.applicantTravelDocument.delete.question">
        <Translate
          contentKey="somaliviswebappApp.applicantTravelDocument.delete.question"
          interpolate={{ id: applicantTravelDocumentEntity.id }}
        >
          Are you sure you want to delete this ApplicantTravelDocument?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-applicantTravelDocument" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ applicantTravelDocument }: IRootState) => ({
  applicantTravelDocumentEntity: applicantTravelDocument.entity,
  updateSuccess: applicantTravelDocument.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantTravelDocumentDeleteDialog);
