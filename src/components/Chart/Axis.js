import * as d3 from "d3";
import React, { Component } from 'react';
//import ReactDOM from 'react-dom';

class Axis extends Component{
  componentDidUpdate() {
    this.renderAxis();
  }

  componentDidMount() {
    this.renderAxis();
  }

  renderAxis() {
    //var node = ReactDOM.findDOMNode(this);
    d3.select(this.gNode).call(this.props.axis);
  }

  render() {
    var translate = "translate(0,"+(this.props.h)+")";

    return (
        <g ref={(g) => { this.gNode = g; }} className="axis" transform={this.props.axisType==='x'?translate:""} >
        </g>
    );
  }

}

export default Axis;
