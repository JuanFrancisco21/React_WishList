import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function WishEditModal({ wishToModal, onHide, showModal, modalToParent }) {
  //Text from the search imput
  const inputEditWish = useRef();
  const checkEditWish = useRef();

  function handleEditWish() {
    if (inputEditWish.current.value) {
      modalToParent({
        id: wishToModal.id,
        text: inputEditWish.current.value,
        done: checkEditWish.current.checked,
      });
    }
  }

  return (
    <>
      <Modal
        show={showModal}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Wish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="list-group-item d-flex align-items-center">
            <label className="label me-2">
              <input
                type="checkbox"
                defaultChecked={wishToModal.done}
                id={wishToModal.id}
                ref={checkEditWish}
              />
              <span className="checkbox"></span>
            </label>
            <div className="search">
              <input
                className="input"
                type="text"
                placeholder="Edit your wish..."
                defaultValue={wishToModal.text}
                ref={inputEditWish}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleEditWish()}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

WishEditModal.propTypes = {
  newwish: PropTypes.func,
};
WishEditModal.defaultProps = {
  newwish: () => {},
};

export default WishEditModal;
