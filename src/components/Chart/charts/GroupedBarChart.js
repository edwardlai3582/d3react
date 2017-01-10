import * as d3 from "d3";
import React, { Component } from 'react';

import Axis from '../elements/Axis';
import Grid from '../elements/Grid';
import GroupedBars from '../elements/GroupedBars';

class GroupedBarChart extends Component{
  constructor() {
    super();
    this.state = {
      tooltip:{
        display:false,
        data1:{key:'',value:''},
        data2:{key:'',value:''}
      }
    };
  }

  render(){
    let data1=this.props.datas[0];
    let data2=this.props.datas[1];
    let svgWidth = this.props.svgWidth;
    let svgHeight = this.props.svgWidth*0.5;
    let margin = {top: 10, right: 30, bottom: 25, left: 120},
        w = svgWidth - (margin.left + margin.right),
        h = svgHeight - (margin.top + margin.bottom);

    data1.forEach((d) => {
        d.date = d3.isoParse(d.time);
    });

    this.props.datas.forEach((element) => {
        element.map((d) =>{
            d.date = d3.isoParse(d.time);
            return d;
        });
    });

    let x = d3.scaleBand()
      .range([0, w])
      .domain(data1.map((d) => d.date ));

    let Max= this.props.datas.reduce((accumulator, currentValue)=>{
      let submax = currentValue.reduce((accumulator, currentValue)=>{
          if(currentValue.value > accumulator) accumulator= currentValue.value;
          return accumulator;
      }, 0);
      if(submax > accumulator) accumulator= submax;
      return accumulator;
    }, 0);

    let y = d3.scaleLinear()
      .domain([0, Max])
      .range([h, 0]);

    let yAxis = d3.axisLeft(y);
    let xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat(""));

    let yGrid = d3.axisLeft(y).ticks()
      .tickSize(-w, 0, 0)
      .tickFormat("");

    let transform='translate(' + margin.left + ',' + margin.top + ')';

    return (
      <div className="svgWrapper">
        <svg width={svgWidth} height={svgHeight} preserveAspectRatio="xMinYMin meet">
          <g transform={transform}>
            <Grid h={h} grid={yGrid} gridType="y"/>
            <Axis h={h} axis={yAxis} axisType="y" />
            <Axis h={h} axis={xAxis} axisType="x" />
            <GroupedBars h={h} datas={[data1,data2]} x={x} y={y} colors={this.props.colors}/>
          </g>
          {(this.props.xLabel==="")?"":<g><text x={svgWidth/2} y={svgHeight}>{this.props.xLabel}</text></g>}
          {(this.props.yLabel==="")?"":<g><text x={15} y={svgHeight/2}>{this.props.yLabel}</text></g>}
        </svg>
      </div>
    );
  }
}

export default GroupedBarChart;
