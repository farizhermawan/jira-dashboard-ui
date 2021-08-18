import React from 'react';
import {Button, Modal} from "reactstrap";
import PropTypes from 'prop-types';
import {ModalBody, ModalFooter, ModalHeader} from "components";

const ConfirmationModal = (props) => (
  <Modal isOpen={props.isOpen} className="modal-outline-warning">
    <ModalHeader className="py-3"/>
    <ModalBody className="text-center px-5">
      <i className="fa fa-5x fa-exclamation fa-fw modal-icon mb-3"/>
      <h6>{props.title}</h6>
      <p className="modal-text">
        {props.text}
      </p>
    </ModalBody>
    <ModalFooter>
      <Button color="link" onClick={props.onCancel}>
        Cancel
      </Button>
      <Button color="warning" className="mr-2" onClick={props.onDelete}>
        Continue
      </Button>
    </ModalFooter>
  </Modal>
);

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  text: PropTypes.string,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
};

ConfirmationModal.defaultProps = {
  title: 'Attention',
  text: 'Removed data can not be restored!',
};

export {ConfirmationModal};
