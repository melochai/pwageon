import React, { Component } from "react";
import StatesMap from "../components/StatesMap";

import '../css/D3Container.css';

class D3Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }
  sampleMethod = () => {

  };

  render() {
    return (
      <svg width="1000" height="800">
        <StatesMap/>
      </svg>
    );
  }
}

export default D3Container;
