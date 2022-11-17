import React from 'react';
import PropTypes from 'prop-types';
import WishItem from './WishItem';

/**
 * Callback to run when a wish changes.
 * @callback onUpdateWish - Callback to run when a wish changes.
 * @param {object} updatewish - Wish with new values.
 * @param {string} updatewish.id - Identifier for wish.
 * @param {string} updatewish.text - Text of wish.
*/

/**
 * Manage a wish List.
 * @param {Object[]} wishes - List of wishes. 
 * @param {String} wishes[].id - Indentifier for wish.
 * @param {String} wishes[].text - Text od the wish.
 * @param {boolean} wishes[].done - Indentifier for checked wish.
 * @param {onUpdateWish} Callback - Callback to run when a wish changes.
 * @returns HTML with a wish list.
 */
function WishList({ wishes, onUpdateWish, onDeleteWish }) {
  return (
    <ul className="list-group">
      {wishes.map(({ id, text, done }) => (
        <WishItem
          wish={{ id, text, done }}
          key={`wishItem-${id}`}
          onChangeWish = {(updateWish) => {
            onUpdateWish(updateWish);
          }}
          onDeleteWish = {(deleteWish) => {
            onDeleteWish(deleteWish);
          }}
        />
      ))}
    </ul>
  );
}

WishList.propTypes = {
  wishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }),
  ),
  onUpdateWish:
    PropTypes.func,
};

WishList.defaultProps = {
  wishes: [],
  onUpdateWish: () => {},
};

export default WishList;
