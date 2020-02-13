import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker";

import Swal from "sweetalert2";

import jQuery from "jquery";
import "popper.js";
import "bootstrap";
window.$ = window.jQuery = jQuery;

window.Swal = Swal;

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});

window.Toast = Toast;

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();
