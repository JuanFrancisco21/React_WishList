import React, { useState } from 'react';
import { v4 as Uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import Button from 'react-bootstrap/Button';
import { Draggable } from 'react-beautiful-dnd';
import WishEditModal from './Modals/WishEditModal';

/**
 * Callback to update a wish when it changes.
 * @callback onChangeWish - Callback to run when a wish is updated.
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
 * Manage a wish information to show it in a list.
 * @param {Object[]} wish - Wish object.
 * @param {String} wish.id - Indentifier for wish.
 * @param {String} wish.text - Text of the wish.
 * @param {boolean} wish.done - Indentifier for checked wish.
 * @param {Number} index - Wish position at the list.
 * @param {onChangeWish} Callback - Callback to run when some wish is modified.
 * @param {onDeleteWish} Callback - Callback to run when a click on delete.
 * @returns HTML with html tags to show wishes information (checkbox, inputtext, buttons).
 */
function WishItem({
  wish, index, onChangeWish, onDeleteWish,
}) {
  // State to show delete and edit button
  const [dbtn, setdbtn] = useState('none');

  // Var to show modal view, and the wish send to the modal
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({});

  const wishToModal = () => {
    setModalData({ id: wish.id, text: wish.text, done: wish.done });
  };

  return (
    <Draggable key={wish.id} draggableId={wish.id} index={index}>
      {(dragableProvided) => (
        <li
          {...dragableProvided.draggableProps}
          ref={dragableProvided.innerRef}
          {...dragableProvided.dragHandleProps}
          className="list-group-item d-flex align-items-center"
          onMouseOver={() => {
            setdbtn('inline-flex');
          }}
          onFocus={() => undefined}
          onMouseOut={() => {
            setdbtn('none');
          }}
          onBlur={() => undefined}
        >
          <label htmlFor={wish.id} className="label">
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
            <span className="checkbox" />
          </label>

          <label
            className={classNames({
              'text-decoration-line-through': wish.done,
            })}
            htmlFor={wish.text}
          >
            {wish.text}
          </label>

          <div className="item-btn" style={{ display: dbtn }}>
            <Button
              variant="edit"
              onClick={() => {
                if (wish.text !== 'Wish not found...') {
                  setModalShow(true);
                  wishToModal();
                }
              }}
            >
              <MdModeEdit size="24px" />
            </Button>
            <Button
              variant="info"
              className="ms-2"
              onClick={() => {
                onDeleteWish({
                  id: wish.id,
                  text: wish.text,
                  done: wish.done,
                });
              }}
            >
              <MdDelete size="24px" />
            </Button>

            <WishEditModal
              showModal={modalShow}
              onHide={() => setModalShow(false)}
              wishToModal={modalData}
              modalToParent={(editWish) => {
                onChangeWish({
                  id: editWish.id,
                  text: editWish.text,
                  done: editWish.done,
                });
                setModalShow(false);
              }}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
}

// Proptypes for all component functions, objects and variables

WishItem.propTypes = {
  wish: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }),
  index: PropTypes.number,
  onChangeWish: PropTypes.func,
  onDeleteWish: PropTypes.func,
};

WishItem.defaultProps = {
  wish: { id: Uuidv4(), text: 'First Wish', done: true },
  index: 0,
  onChangeWish: () => {},
  onDeleteWish: () => {},
};

export default WishItem;
