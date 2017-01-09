import React, { Component } from 'react';

class Bars extends Component{

  render(){
    let rects=this.props.data.map((d,i)=>{
      return (
        <rect
          width={this.props.x.bandwidth()*0.8}
          height={this.props.h - this.props.y(d.value)}
          x={this.props.x(d.date)+this.props.x.bandwidth()*0.1}
          y={this.props.y(d.value)}
          fill={this.props.color}
          onMouseOver={this.props.showToolTip}
          onMouseOut={this.props.hideToolTip}
          key={i}
          data-key={d.time}
          data-value={d.value}
        />
      );
    });

    return(
      <g>
        {rects}
      </g>
    );
  }
}

export default Bars;
