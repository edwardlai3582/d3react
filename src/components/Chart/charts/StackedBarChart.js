import * as d3 from "d3";
import React, { Component } from 'react';

import GridNAxis from '../elements/GridNAxis';
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

    //get maximum
    let YMax=0;
    for(let i=0;i<datas[0].length;i++){
      let temp=0;
      for(let j=0;j<datas.length;j++){
        temp+=datas[j][i].value
      }
      if(temp > YMax) YMax=temp;
    }

    let x = d3.scaleBand()
        .range([0, w])
        .domain(datas[0].map((d) => d.date ));

    let y = d3.scaleLinear()
      .domain([0,YMax])
      .range([h, 0]);

    let transform='translate(' + margin.left + ',' + margin.top + ')';

    return (
      <div className="svgWrapper">
        <svg width={svgWidth} height={svgHeight} preserveAspectRatio="xMinYMin meet">
          <g transform={transform}>
            <GridNAxis x={x} y={y} w={w} h={h} xAxis={true} yAxis={true} xGrid={false} yGrid={true} />

            <StackedBars h={h} colors={this.props.colors} datas={datas}  x={x} y={y} />
          </g>
          {(this.props.xLabel==="")?"":<g><text x={svgWidth/2} y={svgHeight}>{this.props.xLabel}</text></g>}
          {(this.props.yLabel==="")?"":<g><text x={15} y={svgHeight/2} >{this.props.yLabel}</text></g>}
        </svg>
      </div>
    );
  }
}

export default StackedBarChart;
