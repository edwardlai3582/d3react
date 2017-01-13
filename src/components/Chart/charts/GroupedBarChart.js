import * as d3 from "d3";
import React, { Component } from 'react';

import GridNAxis from '../elements/GridNAxis';
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
    let svgWidth = this.props.svgWidth;
    let svgHeight = this.props.svgWidth*0.5;
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
      .range([0, w])
      .domain(datas[0].map((d) => d.date ));

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

    let transform='translate(' + margin.left + ',' + margin.top + ')';

    return (
      <div className="svgWrapper">
        <svg width={svgWidth} height={svgHeight} >
          <g transform={transform}>
            <GridNAxis x={x} y={y} w={w} h={h} xAxis={true} yAxis={true} xGrid={false} yGrid={true} />

            <GroupedBars h={h} datas={datas} x={x} y={y} colors={this.props.colors}/>
          </g>
          {(this.props.xLabel==="")?"":<g><text x={svgWidth/2} y={svgHeight}>{this.props.xLabel}</text></g>}
          {(this.props.yLabel==="")?"":<g><text x={15} y={svgHeight/2}>{this.props.yLabel}</text></g>}
        </svg>
      </div>
    );
  }
}

export default GroupedBarChart;
