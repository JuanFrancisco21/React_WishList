import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

/**
 * Callback to set the data to modify.
 * @callback wishToModal - Callback recive a wish from wishitem.
 * @param {object} wish - Wish with values.
 * @param {string} wish.id - Identifier for wish.
 * @param {string} wish.text - Text of wish to do.
 * @param {boolean} wish.done - Boolean of wish to know if it is done.
 */

/**
 * Callback to send the data modified.
 * @callback modalToParent - Callback send a wish to wishitem.
 * @param {object} wish - Wish modified with values.
 * @param {string} wish.id - Identifier for wish.
 * @param {string} wish.text - Text of wish to do.
 * @param {boolean} wish.done - Boolean of wish to know if it is done.
 */

/**
 * Callback to hide the modal view.
 * @callback onHide - Callback to hide the modal view.
 */

/**
 * Callback to show the modal view.
 * @callback showModal - Callback to show the modal view.
 * @param {boolean} showModal - Set at true Modal tag to make it visible.
 */

/**
 * Show a Modal page to edit the click wish.
 * @param {onHide} Callback - Callback to hide the modal view.
 * @param {showModal} Callback - Callback to show the modal view.
 * @param {wishToModal} Callback - Callback to send data from wishitem to Modal.
 * @param {modalToParent} Callback - Callback to send data from Modal to wishitem.
 * @returns HTML with modal page to edit a wish.
 */
function WishEditModal({
  wishToModal, onHide, showModal, modalToParent,
}) {
  // Text from the search imput and the ckeckbox
  const inputEditWish = useRef();
  const checkEditWish = useRef();

  // Function to send from modal to search bar data(wish modified).
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
    <Modal show={showModal} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Wish</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="list-group-item d-flex align-items-center">
          <label htmlFor={wishToModal.id} className="label me-2">
            <input
              type="checkbox"
              defaultChecked={wishToModal.done}
              id={wishToModal.id}
              ref={checkEditWish}
            />
            <span className="checkbox" />
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
  );
}

// Proptypes for all component functions, objects and variables

WishEditModal.propTypes = {
  wishToModal: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    done: PropTypes.bool,
  }),
  onHide: PropTypes.func,
  showModal: PropTypes.bool,
  modalToParent: PropTypes.func,
};

WishEditModal.defaultProps = {
  wishToModal: { id: 1, text: 'default', done: false },
  onHide: () => {},
  showModal: true,
  modalToParent: () => {},
};

export default WishEditModal;
