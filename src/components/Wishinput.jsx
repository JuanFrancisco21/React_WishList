import React, { useRef } from "react";
import PropTypes from "prop-types";
import WishCreateModal from "./Modals/WishCreateModal";

function WishInput({ oncreateNewWish, onSearchWish }) {
  //Text from the search imput
  const inputSearchWish = useRef();

  //Var to show modal view
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <fieldset className="form-group">
      <legend>Store all your Wishes</legend>
      <div className="search-bar">
        <div className="search">
          <input
            className="input"
            type="text"
            placeholder="Search your wish..."
            ref={inputSearchWish}
            onChange={(event) => {
              if (event.target.value.length > 0) {
                onSearchWish({ text: event.target.value });
              } else {
                onSearchWish({ text: "" });
              }
            }}
          />
        </div>

        <div className="create">
          <button className="create-btn" onClick={() => setModalShow(true)}>
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">
                <svg
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  width="24px"
                  height="24px"
                >
                  <path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 15 10 L 15 15 L 10 15 L 10 17 L 15 17 L 15 22 L 17 22 L 17 17 L 22 17 L 22 15 L 17 15 L 17 10 Z" />
                </svg>
              </div>
            </div>
            <span className="span">Create</span>
          </button>

          <WishCreateModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            newwish={(wish) => {
              oncreateNewWish(wish);
              setModalShow(false);
            }}
          />
        </div>
      </div>
    </fieldset>
  );
}

WishInput.propTypes = {
  oncreateNewWish: PropTypes.func,
  onSearchWish: PropTypes.func,
};

WishInput.defaultProps = {
  oncreateNewWish: () => {},
  onSearchWish: () => {},
};

export default WishInput;
