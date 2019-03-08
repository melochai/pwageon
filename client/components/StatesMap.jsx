import React, { Component } from "react";
import * as topojson from "topojson";
import * as d3 from "d3";

import { Link } from "react-router-dom";

import "../css/D3Container.css";

class StatesMap extends Component {
  constructor() {
    super();
    this.state = {
      usData: null,
      usCongress: null
    };
  }

  componentWillMount() {
    d3.queue()
      .defer(
        d3.json,
        "https://raw.githubusercontent.com/Swizec/113th-congressional-districts/master/public/us.json"
      )
      .defer(
        d3.json,
        "https://raw.githubusercontent.com/Swizec/113th-congressional-districts/master/public/us-congress-113.json"
      )
      .await((error, usData, usCongress) => {
        this.setState({
          usData,
          usCongress
        });
      });
  }

  componentDidUpdate() {
    console.log(this.state.usData);
    const svg = d3
      .select(this.refs.anchor)
      .append("svg")
      .attr("width", 1000)
      .attr("height", 1000);

    const projection = d3
      .geoAlbers()
      .scale(1280)
      .translate([1000 / 2, 1000 / 2]);

    const path = d3.geoPath(projection);

    const us = this.state.usData,
      congress = this.state.usCongress;

    svg
      .append("defs")
      .append("path")
      .attr("id", "land")
      .data(topojson.feature(us, us.objects.land))
      .attr("d", path);

    svg
      .append("clipPath")
      .attr("id", "clip-land")
      .append("use")
      .attr("xlink:href", "#land");

    svg
      .selectAll("path")
      .data(topojson.feature(congress, congress.objects.districts).features)
      .enter()
      .append("path")
      .attr("class", "districts")
      .style("fill", "#236FEA")
      .attr("d", path)
      //  .append("title")
      //  .text(function(d) { return d.id; })
      .on("mouseover", function(d) {
        d3.select(this).style("fill", "#EA7775");
      })
      .on("mouseout", function(d) {
        d3.select(this).style("fill", "#EA7775");
      });
    svg
      .append("path")
      .attr("class", "district-boundaries")
      .datum(
        topojson.mesh(congress, congress.objects.districts, function(a, b) {
          return a !== b && ((a.id / 1000) | 0) === ((b.id / 1000) | 0);
        })
      )
      .attr("d", path);

    svg
      .append("path")
      .attr("class", "state-boundaries")
      .datum(
        topojson.mesh(us, us.objects.states, function(a, b) {
          return a !== b;
        })
      )
      .attr("d", path);
  }

  render() {
    const { usData, usCongress } = this.state;

    if (!usData || !usCongress) {
      return null;
    }

    return <g ref="anchor" />;
  }
}

export default StatesMap;
