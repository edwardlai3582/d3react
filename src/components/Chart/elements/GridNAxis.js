import React, { Component } from 'react';
import * as d3 from "d3";

import Axis from './Axis';
import Grid from './Grid';

// <GridNAxis x={x} y={y} w={w} h={h} xAxis={true} yAxis={true} xGrid={true} yGrid={true} />
class GridNAxis extends Component{
  render() {
    let {x, y, w, h, ...display} = this.props;

    let xAxis = d3.axisBottom(x)
      .tickSize(4)
      .tickSizeOuter(0)
      .tickFormat(d3.timeFormat(""));

    let yAxis = d3.axisLeft(y)
      .tickSize(3)
      .tickSizeOuter(0);

    let xGrid = d3.axisBottom(x)
      .tickSize(-h, 0, 0)
      .tickSizeOuter(0)
      .tickFormat("");

    let yGrid = d3.axisLeft(y)
      .ticks()
      .tickSize(-w, 0, 0)
      .tickSizeOuter(0)
      .tickFormat("");

    return (
      <g>
        {(display.xAxis)? <Axis h={h} axis={xAxis} axisType="x" /> : ""}
        {(display.yAxis)? <Axis h={h} axis={yAxis} axisType="y" /> : ""}
        {(display.xGrid)? <Grid h={h} grid={xGrid} gridType="x" /> : ""}
        {(display.yGrid)? <Grid h={h} grid={yGrid} gridType="y" /> : ""}
      </g>
    );
  }
}

export default GridNAxis;
