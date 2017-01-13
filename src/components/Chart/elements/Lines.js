import React, { Component } from 'react';
import Line from './Line'

class Lines extends Component{
  render(){
    let lines = this.props.datas.map((data, index)=>{
      return <Line key={index} data={data} color={this.props.colors[index]} x={this.props.x} y={this.props.y} />
    });

    return(
      <g>
        {lines}
      </g>
    );
  }
}

export default Lines;
