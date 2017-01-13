import React, { Component } from 'react';
import * as d3 from "d3";

class Line extends Component{

  render(){
    let line = d3.line()
      .x((d) => ( this.props.x(d.date) + this.props.x.bandwidth()/2 ))
      .y((d) => ( this.props.y(d.value) ));

    return(
        <g>
          <path d={line(this.props.data)} strokeLinecap="round" fill="none" stroke={this.props.color} strokeWidth="2"/>
        </g>
    );
  }
}

export default Line;
