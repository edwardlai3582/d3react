import React, { Component } from 'react';
import Dots from './Dots'

class GroupedDots extends Component{
  render(){
    let lines = this.props.datas.map((data, index)=>{
      return <Dots key={index} data={data} color={this.props.colors[index]} x={this.props.x} y={this.props.y} />
    });

    return(
      <g>
        {lines}
      </g>
    );
  }
}

export default GroupedDots;
