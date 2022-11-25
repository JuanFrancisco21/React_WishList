import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import WishItem from './WishItem';

/**
 * Callback to update a wish when it changes.
 * @callback onUpdateWish - Callback to run when a wish changes.
 * @param {object} updatewish - Wish with new values.
 * @param {string} updatewish.id - Identifier for wish.
 * @param {string} updatewish.text - Text of wish to do.
 * @param {boolean} updatewish.done - Boolean of wish to know if it is done.
 */

/**
 * Callback to run when a wish need to be eliminated.
 * @callback onDeleteWish - Callback to run to delete a wish.
 * @param {object} onDeleteWish - Wish with the values to delete.
 * @param {string} onDeleteWish.id - Identifier for wish to delete.
 * @param {string} onDeleteWish.text - Text of wish to delete.
 * @param {boolean} onDeleteWish.done - Boolean of wish to delete.
 */

/**
 * Manage a wish List.
 * @param {Object[]} wishes - List of wishes.
 * @param {String} wishes[].id - Indentifier for wish.
 * @param {String} wishes[].text - Text od the wish.
 * @param {boolean} wishes[].done - Indentifier for checked wish.
 * @param {onUpdateWish} Callback - Callback to run when a wish changes.
 * @param {onDeleteWish} Callback - Callback to run when a click on delete.
 * @returns HTML with a wish list.
 */
function WishList({ wishes, onUpdateWish, onDeleteWish }) {
  return (
    <Droppable droppableId="wishes">
      {(droppableProvided) => (
        <ul
          {...droppableProvided.droppableProps}
          ref={droppableProvided.innerRef}
          className="list-group"
        >
          {wishes.map(({ id, text, done }, index) => (
            <WishItem
              wish={{ id, text, done }}
              index={index}
              key={`wishItem-${id}`}
              onChangeWish={(updateWish) => {
                onUpdateWish(updateWish);
              }}
              onDeleteWish={(deleteWish) => {
                onDeleteWish(deleteWish);
              }}
            />
          ))}
          {droppableProvided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}

// Proptypes for all component functions, objects and variables

WishList.propTypes = {
  wishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }),
  ),
  onUpdateWish: PropTypes.func,
  onDeleteWish: PropTypes.func,
};

WishList.defaultProps = {
  wishes: [],
  onUpdateWish: () => {},
  onDeleteWish: () => {},
};

export default WishList;
