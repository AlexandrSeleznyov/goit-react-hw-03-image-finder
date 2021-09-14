import { Component } from "react";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

export default class Modal extends Component {
  handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.togleModal(false);
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.togleModal(false);
    }
  };
  render() {
    const modalSrc = this.props.modalSrc;
    return (
      <div className={s.Overlay} onClick={this.handleBackdropClick}>
        <div className={s.Modal}>
          <img src={modalSrc} alt="" />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  modalSrc: PropTypes.string,
  togleModal: PropTypes.func,
};
