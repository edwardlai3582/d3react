import * as d3 from "d3";
import React, { Component } from 'react';

class Grid extends Component{
  componentDidUpdate() {
    this.renderGrid();
  }

  componentDidMount() {
    this.renderGrid();
  }

  renderGrid() {
    d3.select(this.gNode).call(this.props.grid);
  }

  render() {
    let translate = "translate(0,"+(this.props.h)+")";
    return (
      <g ref={(g) => { this.gNode = g; }} className="gridx" transform={this.props.gridType==='x'?translate:""}>
      </g>
    );
  }
}

export default Grid;
