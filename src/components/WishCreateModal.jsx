import React, { useRef } from 'react';
import { useState } from 'react';
import { v4 as Uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function WishCreateModal( props ) {
  //Text from the search imput
  const inputNewWish = useRef();


  function handleNewWish(){
    const text = inputNewWish.current.value;
    if (text != '' && text != ' ' ) {
      props.newwish({id: Uuidv4(), text: inputNewWish.current.value, done:false});
      props.onHide;
    }
  };

  return (
    <>
      <Modal
        {...props}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new Wish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='search'>
            <input
              className="input"
              type="text"
              placeholder="Enter your wish..."
              ref={inputNewWish}
              onKeyUp={(event) => {
                if (event.key=='Enter' && event.target.value != null) {
                  handleNewWish();
                }
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() =>handleNewWish()}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

WishCreateModal.propTypes = {
  newwish: PropTypes.func,
};
WishCreateModal.defaultProps = {
  newwish: () => { },
};

export default WishCreateModal;