import React, { useState } from "react";
import { v4 as Uuidv4 } from "uuid";
import PropTypes from "prop-types";
import classNames from "classnames";
import { MdDelete, MdModeEdit } from "react-icons/md";
import Button from "react-bootstrap/Button";
import WishEditModal from "./Modals/WishEditModal";

function WishItem({ wish, onChangeWish, onDeleteWish }) {
  //State to show delete and edit button
  const [d_btn, setd_btn] = useState("none");

  //Var to show modal view, and the wish send to the modal
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({});

  const wishToModal = () => {
    setModalData({ id: wish.id, text: wish.text, done: wish.done });
  };

  return (
    <li
      className="list-group-item d-flex align-items-center"
      onMouseOver={() => {
        setd_btn("inline-flex");
      }}
      onMouseOut={() => {
        setd_btn("none");
      }}
    >
      <label className="label">
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
        <span className="checkbox"></span>
      </label>

      <label
        className={classNames({ "text-decoration-line-through": wish.done })}
        htmlFor={wish.text}
      >
        {wish.text}
      </label>

      <div className="item-btn" style={{ display: d_btn }}>
        <Button
          variant="edit"
          onClick={() => {
            if (wish.text != "Wish not found...") {
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
  );
}

WishItem.propTypes = {
  wish: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }),
  onChangeWish: PropTypes.func,
};

WishItem.defaultProps = {
  wish: { id: Uuidv4(), text: "First Wish", done: true },
  onChangeWish: () => {},
};

export default WishItem;
