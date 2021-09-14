import { Component } from "react";
import PropTypes from "prop-types";
import s from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

export default class SearchBar extends Component {
  state = {
    image: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const Data = {
      image: this.state.image,
      page: 1,
      hits: 0,
    };
    this.state.image.trim() === ""
      ? toast.error("Please, type a word!")
      : this.props.qwe(Data);
  };

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      image: e.target.value,
    });
  };

  render() {
    return (
      <>
        <Toaster />
        <header className={s.Searchbar}>
          <form className={s.SearchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={s.SearchFormButton}>
              <span className={s.SearchFormButtonLabel}>Search</span>
            </button>

            <input
              className={s.SearchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleChange}
            />
          </form>
        </header>
      </>
    );
  }
}
SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
