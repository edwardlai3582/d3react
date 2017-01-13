import React, { Component } from 'react';

class StackedBars extends Component{

  render(){
    let StackedBars = [];
    let h = []

    this.props.datas.forEach((data,i)=>{
      StackedBars.push(data.map((d,index)=>{
        h[index] = (typeof h[index] === 'number') ? h[index] : 0;
        return (
          <rect
            width={this.props.x.bandwidth()*0.8}
            height={this.props.h - this.props.y(d.value)}
            x={this.props.x(d.date)+this.props.x.bandwidth()*0.1}
            y={this.props.y(d.value)-(h[index])}
            fill={this.props.colors[i]}
            onMouseOver={this.props.showToolTip}
            onMouseOut={this.props.hideToolTip}
            key={index}
            data-key={d.time}
            data-value={d.value}
          />
        );
      }));

      data.forEach((d,index)=>{
          h[index] += this.props.h - this.props.y(d.value);
      })
    });

    return(
      <g>
        {StackedBars}
      </g>
    );
  }
}

export default StackedBars;
