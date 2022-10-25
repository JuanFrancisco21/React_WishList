import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function WishItem({ wish }) {
  return (
    <li className="list-group-item">
      <input type="checkbox" defaultChecked={wish.done} id={wish.text} />
      <label className={classNames(
        {'text-decoration-line-through': wish.done}
      )} htmlFor={wish.text}>{wish.text}</label>
    </li>
  );
}

WishItem.propTypes = {
  wish:
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }),
};

WishItem.defaultProps = {
  wish: {text: 'First Wish', done: true},
};

export default WishItem;
