import React, { Component } from 'react';

class GroupedBars extends Component{

  render(){
    let rects=[];
    this.props.datas.forEach((data, index, array)=>{
      let temprects=data.map((d,i)=>{
        return (
          <rect
            width={this.props.x.bandwidth()*0.6/array.length}
            height={this.props.h - this.props.y(d.value)}
            x={this.props.x(d.date)+this.props.x.bandwidth()*0.2+this.props.x.bandwidth()*0.6*index/array.length}
            y={this.props.y(d.value)}
            fill={this.props.colors[index]}
            onMouseOver={this.props.showToolTip}
            onMouseOut={this.props.hideToolTip}
            key={i}
            data-key={d.time}
            data-value={d.value}
          />
        );
      });
      rects.push(temprects);
    });

    return(
      <g>
        {rects}
      </g>
    );
  }
}

export default GroupedBars;
