import React, { useState } from 'react';
import { v4 as Uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MdDelete } from 'react-icons/md';
import Button from 'react-bootstrap/Button';


function WishItem({ wish, onChangeWish, onDeleteWish }) {
  const [d_btn, setd_btn] = useState('none');
  return (
    <li className="list-group-item" onMouseOver={() => { setd_btn('') }} onMouseOut={() => { setd_btn('none') }}>
      <input
        type="checkbox"
        defaultChecked={wish.done}
        id={wish.id}
        onChange={(event) => {
          onChangeWish({
            id: wish.id,
            text: wish.text,
            done: event.target.checked,
          });
        }}
      />

      <label
        className={classNames(
          { 'text-decoration-line-through': wish.done },
        )}
        htmlFor={wish.text}>
        {wish.text}
      </label>

      <Button style={{ display: d_btn }} variant='info' onClick={() => {
        onDeleteWish({id: wish.id,
          text: wish.text,
          done: wish.done});
       }}><MdDelete /></Button>

    </li>
  );
}

WishItem.propTypes = {
  wish:
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }),
  onChangeWish:
    PropTypes.func,
};

WishItem.defaultProps = {
  wish: { id: Uuidv4(), text: 'First Wish', done: true },
  onChangeWish: () => { },
};

export default WishItem;
