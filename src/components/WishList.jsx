import React from 'react';
import PropTypes from 'prop-types';
import { v4 as Uuidv4 } from 'uuid';
import WishItem from './WishItem';

function WishList({ wishes }) {
  return (
    <ul className="list-group">
      {wishes.map(({ text, done }) => (
        <WishItem wish={{ text, done }} key={`wishItem-${Uuidv4()}`} />
      ))}
    </ul>
  );
}

WishList.propTypes = {
  wishes: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }),
  ),
};

WishList.defaultProps = {
  wishes: [],
};

export default WishList;
