import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loader = () => (
  <Spinner
    className="loader"
    animation="border"
    role="status"
  >
    <span className="visually-hidden">Loading...</span>
  </Spinner>

);

export default Loader;
