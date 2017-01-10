import React, { Component } from 'react';

class Dots extends Component{

  render(){
    var circles=this.props.data.map((d,i)=>{
      return (
        <circle
          className="dot"
          r="5"
          cx={this.props.x(d.date)+this.props.xOffset}
          cy={this.props.y(d.value)}
          fill={this.props.color}
          key={i}
          onMouseOver={this.props.showToolTip} onMouseOut={this.props.hideToolTip}
          data-key={d.time} data-value={d.value}
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
