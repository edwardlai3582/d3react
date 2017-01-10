import * as d3 from "d3";
import React, { Component } from 'react';

import Axis from '../elements/Axis';
import Grid from '../elements/Grid';
import StackedBars from '../elements/StackedBars';

class StackedBarChart extends Component{
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
    let svgWidth = this.props.svgWidth;
    let svgHeight = this.props.svgWidth*0.5;
    let margin = {top: 10, right: 30, bottom: 20, left: 80},
        w = svgWidth - (margin.left + margin.right),
        h = svgHeight - (margin.top + margin.bottom);

    data1.forEach(function (d) {
        d.date = d3.isoParse(d.time);
    });

    let totalDatas=[]
    this.props.datas.forEach((element)=> {
        totalDatas.push(element.map((d)=> {
            d.date = d3.isoParse(d.time);
            return d;
        }));
    });

    let x = d3.scaleBand()
        .range([0, w])
        .domain(data1.map((d) => d.date ));

    let totalMax=0;
    for(let i=0;i<this.props.datas[0].length;i++){
      let temp=0;
      for(let j=0;j<this.props.datas.length;j++){
        temp+=this.props.datas[j][i].value
      }
      if(temp > totalMax) totalMax=temp;
    }

    let y = d3.scaleLinear()
      .domain([0,totalMax])
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
            <StackedBars h={h} colors={this.props.colors} data={data1} datas={totalDatas}  x={x} y={y} />
          </g>
        </svg>
      </div>
    );
  }
}

export default StackedBarChart;
