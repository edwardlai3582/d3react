import * as d3 from "d3";
import React, { Component } from 'react';


import PlainChart from './PlainChart';

class test extends Component{
  constructor() {
    super();
    this.state = {
      tooltip:{
        display:false,
        data:{key:'',value:''}
      }
    };
  }

  render(){


    let margin = {top: 10, right: 30, bottom: 25, left: 80};
    let w = svgWidth - (margin.left + margin.right);
    let h = svgHeight - (margin.top + margin.bottom);

    let datas=this.props.datas;
    datas.forEach((data)=>{
      data.forEach((d) => {
          d.date = d3.isoParse(d.time);
      });
    });

    let x = d3.scaleBand()
      .domain(datas[0].map((d) => d.date ))
      .range([0, w]);

    let YMax= datas.reduce((accumulator, currentValue)=>{
      let submax = currentValue.reduce((accumulator, currentValue)=>{
          if(currentValue.value > accumulator) accumulator= currentValue.value;
          return accumulator;
      }, 0);
      if(submax > accumulator) accumulator= submax;
      return accumulator;
    }, 0);

    let y = d3.scaleLinear()
      .domain([0, YMax])
      .range([h, 0]);

    let line = d3.line()
      .x((d) => ( x(d.date) + x.bandwidth()/2 ))
      .y((d) => ( y(d.value) ));

      let lines = datas.map((data, index)=>{
        return <path key={index} d={line(data)} strokeLinecap="round" fill="none" stroke={this.props.colors[index]} strokeWidth="2"/>
      });


    return (
        <PlainChart YMax={YMax} svgWidth={this.props.svgWidth} svgHeight={this.props.svgHeight} datas={datas} >
              {lines}
        </PlainChart>
    );
  }
}

export default test;
