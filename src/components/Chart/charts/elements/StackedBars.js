import React, { Component } from 'react';

class StackedBars extends Component{
  render(){
    let StackedBars = [];
    let h = [];

    this.props.datas.forEach((data,i)=>{
      data.forEach((d,index)=>{
        h[index] = (typeof h[index] === 'number') ? h[index] : 0;
        let temp = (
          <rect
            width={this.props.x.bandwidth()*0.8}
            height={this.props.h - this.props.y(d.value)}
            x={this.props.x(d.date)+this.props.x.bandwidth()*0.1}
            y={this.props.y(d.value)-(h[index])}
            fill={this.props.colors[i]}
            key={`${i}has${index}has${d.value}`}
            data-value={d.value}
            data-date={d.date}
          />
        );

        if(!StackedBars[index]){
            StackedBars.push([temp])
        }
        else{
          StackedBars[index].push(temp)
        }
      });

      data.forEach((d,index)=>{
          h[index] += this.props.h - this.props.y(d.value);
      })
    });

    let allStackedBars = StackedBars.map((StackedBar, index)=>{
      return (
        <g key={index} >
          {StackedBar}
        </g>
      );
    })

    return(
      <g>
        {allStackedBars}
      </g>
    );
  }
}

export default StackedBars;
