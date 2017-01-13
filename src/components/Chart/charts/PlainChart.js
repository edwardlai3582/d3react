import * as d3 from "d3";
import React, { Component } from 'react';
import { chartMargin } from './consts';
import GridNAxis from '../elements/GridNAxis';

class PlainChart extends Component{
  render(){
    let colors = this.props.colors;

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

    let y = d3.scaleLinear()
      .domain([0, this.props.YMax(datas)])
      .range([h, 0]);

    let transform='translate(' + chartMargin.LEFT + ',' + chartMargin.TOP + ')';

    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       x, y, h, datas, colors
     })
    );

    return (
      <div className="svgWrapper">
        <svg width={svgWidth} height={svgHeight} >
          <g transform={transform}>
            <GridNAxis x={x} y={y} w={w} h={h} xAxis={true} yAxis={true} xGrid={false} yGrid={true} />

            {childrenWithProps}
          </g>
          {(this.props.xLabel==="")?"":<g><text x={svgWidth - chartMargin.RIGHT} y={svgHeight} textAnchor="end" >{this.props.xLabel}</text></g>}
          {(this.props.yLabel==="")?"":<g><text x={chartMargin.LEFT - 5} y={chartMargin.TOP - 10} textAnchor="end" >{this.props.yLabel}</text></g>}
        </svg>
      </div>
    );
  }
}

export default PlainChart;
