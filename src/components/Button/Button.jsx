import { Component } from "react";
import PropTypes from "prop-types";
import s from "./Button.module.css";

export default class Button extends Component {
  handleSumbit = (e) => {
    e.preventDefault();
    this.props.onSubmit({ page: this.props.currentPage + 1, hits: 0 });
  };
  render() {
    const totalHits = this.props.totalHits;
    return (
      totalHits !== 0 && (
        <button type="submit" className={s.Button} onClick={this.handleSumbit}>
          Load more
        </button>
      )
    );
  }
}
Button.propTypes = {
  totalHits: PropTypes.number,
  onSubmit: PropTypes.func,
  currentPage: PropTypes.number,
};
