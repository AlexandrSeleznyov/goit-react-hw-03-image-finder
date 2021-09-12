import React, { Component } from "react";
import toast, { Toaster } from "react-hot-toast";

export default class App extends Component {
  state = {};

  render() {
    const notify = () => toast("Here is your toast.");
    return (
      <>
        <Toaster />
        <button onClick={notify}>Make me a toast</button>
      </>
    );
  }
}
