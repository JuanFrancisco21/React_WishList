import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { v4 as Uuidv4 } from 'uuid';

function WishInput({ onNewWish }) {
  const inputText = useRef();
  return (
    <fieldset className="form-group">
      <legend>New Wish</legend>
      <div className="search-bar">
        <div className='search'>
        <input
          className="input"
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
        </div>
        <div className="create">
        <button className="create-btn">
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
              </svg>
            </div>
          </div>
          <span className='span'>Send</span>
        </button>
        </div>

       
        
      </div>
    </fieldset>
  );
}

WishInput.propTypes = {
  onNewWish: PropTypes.func,
};

WishInput.defaultProps = {
  onNewWish: () => { },
};

export default WishInput;
