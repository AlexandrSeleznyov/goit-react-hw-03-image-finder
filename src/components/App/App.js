import React, { Component } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import ImageGallery from "../ImageGallery/ImageGallery";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Load from "../Loader/Loader";
import axios from "axios";
import s from "./App.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default class App extends Component {
  state = {
    images: [],
    name: "",
    page: null,
    showLoader: false,
    hits: 0,
    showModal: false,
    modalSrc: "",
  };

  writeToState = (data) => {
    data.image
      ? this.setState({
          images: [],
          name: data.image,
          page: data.page,
          hits: data.hits,
        })
      : this.setState({
          page: data.page,
          hits: data.hits,
        });
  };

  scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const API_KEY = "22627688-af3fb051bb8ec0acdb27de44f";
    const API = `https://pixabay.com/api/?q=${this.state.name}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    if (
      prevState.name !== this.state.name ||
      this.state.page !== prevState.page
    ) {
      axios
        .get(API)
        .then((images) => {
          this.togleLoader(true);
          if (images.data.hits.length === 0) {
            toast.error(
              "Sorry, there are no images matching your search query. Please try again."
            );
          }
          this.setState((prevState) => {
            return {
              images: [...prevState.images, ...images.data.hits],
              hits: prevState.hits + images.data.hits.length,
            };
          });

          if (this.state.hits >= images.data.totalHits) {
            this.setState({ hits: 0 });
          }
          this.scrollToBottom();
        })
        .catch((error) => {
          alert("error");
        })
        .finally(this.togleLoader(false));
    }
  }

  onClick = (data1, data2) => {
    this.setState({
      modalSrc: data1,
      showModal: data2,
    });
  };

  togleModal = (data) => {
    this.setState({
      showModal: data,
    });
  };

  togleLoader = (data) => {
    this.setState({ showLoader: data });
  };

  render() {
    return (
      <div className={s.App}>
        <Toaster />
        <SearchBar qwe={this.writeToState} />
        {this.state.showLoader && <Load />}
        <ImageGallery>
          <ImageGalleryItem
            imageGallery={this.state.images}
            onClick={this.onClick}
          />
        </ImageGallery>
        <Button
          onSubmit={this.writeToState}
          currentPage={this.state.page}
          totalHits={this.state.hits}
        />
        {this.state.showModal && (
          <Modal modalSrc={this.state.modalSrc} togleModal={this.togleModal} />
        )}
        {this.state.showLoader && <Load />}
      </div>
    );
  }
}
