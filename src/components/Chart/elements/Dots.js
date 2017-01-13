import React, { Component } from 'react';

class Dots extends Component{

  render(){
    let circles=this.props.data.map((d,i)=>{
      return (
        <circle
          className="dot"
          r="4"
          cx={this.props.x(d.date)+this.props.x.bandwidth()/2}
          cy={this.props.y(d.value)}
          fill={this.props.color}
          key={i}
        />
      );
    });

    return(
        <g>
          {circles}
        </g>
    );
  }
}

export default Dots;
