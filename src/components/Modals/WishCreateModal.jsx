import React, { useRef } from 'react';
import { v4 as Uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

/**
 * 
 * Callback to create the new wish.
 * @callback newWish - Callback send the new wish.
 * @param {object} wish - Wish with values.
 * @param {string} wish.id - Identifier for wish.
 * @param {string} wish.text - Text of wish to do.
 * @param {boolean} wish.done - Boolean of wish to know if it is done.
 */

/**
 * 
 * Callback to hide the modal view.
 * @callback onHide - Callback to hide the modal view.
 */

/**
 * 
 * Callback to show the modal view.
 * @callback showModal - Callback to show the modal view.
 * @param {boolean} showModal - Set at true Modal tag to make it visible.
 */

/**
 * 
 * Show a Modal page to create a wish.
 * @param {onHide} Callback - Callback to hide the modal view.
 * @param {showModal} Callback - Callback to show the modal view.
 * @param {newWish} Callback - Callback to send data from modal to WishInput.
 * @returns HTML with modal page to create a wish.
 */
function WishCreateModal({ newWish, showModal, onHide }) {
  // Text from the search imput
  const inputNewWish = useRef();

  function handleNewWish() {
    const text = inputNewWish.current.value;
    if (text !== '' && text !== ' ') {
      newWish({
        id: Uuidv4(),
        text: inputNewWish.current.value,
        done: false,
      });
    } else {
      // alert('Introduce text for a new wish.');
    }
  }

  return (
    <Modal show={showModal} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Create a new Wish</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="search">
          <input
            className="input"
            type="text"
            placeholder="Enter your wish..."
            ref={inputNewWish}
            onKeyUp={(event) => {
              if (event.key === 'Enter' && event.target.value !== null) {
                handleNewWish();
              }
            }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => handleNewWish()}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

WishCreateModal.propTypes = {
  onHide: PropTypes.func,
  showModal: PropTypes.bool,
  newWish: PropTypes.func,
};
WishCreateModal.defaultProps = {
  newWish: () => {},
  onHide: () => {},
  showModal: true,
};

export default WishCreateModal;
