import React, { Component } from "react";
import StatesMap from "../components/StatesMap";

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
      <svg width="960" height="600">
        <StatesMap />
      </svg>
    );
  }
}

export default D3Container;
