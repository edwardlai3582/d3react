import * as d3 from "d3";
import React, { Component } from 'react';

import GridNAxis from '../elements/GridNAxis';

class PlainChart extends Component{
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

    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       w: w,
       h: h
     })
    );

    let data1=this.props.datas[0];
    data1.forEach(function (d) {
        d.date = d3.isoParse(d.time);
    });

    //add iso formate date
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

    let y = d3.scaleLinear()
      .domain([0,this.props.YMax])
      .range([h, 0]);

    let transform='translate(' + margin.left + ',' + margin.top + ')';

    return (
      <div className="svgWrapper">
        <svg width={svgWidth} height={svgHeight} preserveAspectRatio="xMinYMin meet">
          <g transform={transform}>
            <GridNAxis x={x} y={y} w={w} h={h} xAxis={true} yAxis={true} xGrid={false} yGrid={true} />
            {this.props.children}
          </g>
          {(this.props.xLabel==="")?"":<g><text x={svgWidth/2} y={svgHeight}>{this.props.xLabel}</text></g>}
          {(this.props.yLabel==="")?"":<g><text x={15} y={svgHeight/2} >{this.props.yLabel}</text></g>}
        </svg>
      </div>
    );
  }
}
//<StackedBars h={h} colors={this.props.colors} datas={totalDatas}  x={x} y={y} />
export default PlainChart;
