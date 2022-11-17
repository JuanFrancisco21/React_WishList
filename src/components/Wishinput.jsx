import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { v4 as Uuidv4 } from 'uuid';

function WishInput({ onNewWish }) {
  const inputText = useRef();
  return (
    <fieldset className="form-group">
      <legend>New Wish</legend>
      <input
        className="form-control"
        type="text"
        placeholder="Introduce tu deseo"
        ref={inputText}
        onKeyUp={(event) => {
          if (event.key === 'Enter' && event.target.value.length > 0) {
            onNewWish({ id: Uuidv4(), text: event.target.value, done: false });
            inputText.current.value = '';
          }
        }}
      />
    </fieldset>
  );
}

WishInput.propTypes = {
  onNewWish: PropTypes.func,
};

WishInput.defaultProps = {
  onNewWish: () => {},
};

export default WishInput;
