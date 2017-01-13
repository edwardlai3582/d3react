import * as d3 from "d3";
import React, { Component } from 'react';
import * as chartMargin from './chartMargin';
import GridNAxis from '../elements/GridNAxis';
import Line from '../elements/Line';

class GroupedLineChart extends Component{

  render(){
    let svgWidth = this.props.svgWidth;
    let svgHeight = this.props.svgWidth*0.5;
    let w = svgWidth - (chartMargin.LEFT + chartMargin.RIGHT);
    let h = svgHeight - (chartMargin.TOP + chartMargin.BOTTOM);

    let datas=this.props.datas;
    datas.forEach((data)=>{
      data.forEach((d) => {
          d.date = d3.isoParse(d.time);
      });
    });

    let x = d3.scaleBand()
      .range([0, w])
      .domain(datas[0].map((d) => d.date ));

    //get maximum
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

    let lines = datas.map((data, index)=>{
      return <Line key={index} x={x} y={y} data={data} color={this.props.colors[index]} />
    });

    let transform='translate(' + chartMargin.LEFT + ',' + chartMargin.TOP + ')';

    return (
        <div className="svgWrapper">
          <svg width={svgWidth} height={svgHeight} >
            <g transform={transform}>
              <GridNAxis x={x} y={y} w={w} h={h} xAxis={true} yAxis={true} xGrid={true} yGrid={true} />
              {lines}
            </g>
            {(this.props.xLabel==="")?"":<g><text x={svgWidth - chartMargin.RIGHT} y={svgHeight} textAnchor="end" >{this.props.xLabel}</text></g>}
            {(this.props.yLabel==="")?"":<g><text x={chartMargin.LEFT - 5} y={chartMargin.TOP - 10} textAnchor="end" >{this.props.yLabel}</text></g>}
          </svg>
        </div>
    );
  }
}

export default GroupedLineChart;
