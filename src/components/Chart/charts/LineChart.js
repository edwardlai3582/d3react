import * as d3 from "d3";
import React, { Component } from 'react';
import * as chartMargin from './chartMargin';
import Dots from '../elements/Dots';
import Line from '../elements/Line';
import GridNAxis from '../elements/GridNAxis';
//import ToolTip from '../elements/ToolTip';

class LineChart extends Component{
  constructor() {
    super();
    this.state = {
      tooltip:{
        display:false,
        data:{key:'',value:''}
      }
    };
    this.showToolTip = this.showToolTip.bind(this);
    this.hideToolTip = this.hideToolTip.bind(this);
  }

  showToolTip(e){
    e.target.setAttribute('fill', 'green');
    this.setState({
      tooltip:{
        display:true,
        data: {
          key:e.target.getAttribute('data-key'),
          value:e.target.getAttribute('data-value')
        },
        pos:{
          x:e.target.getAttribute('cx'),
          y:e.target.getAttribute('cy')
        }
      }
    });
  }

  hideToolTip(e){
    e.target.setAttribute('fill', this.props.color);
    this.setState({
      tooltip:{
        display:false,
        data:{key:'',value:''}
      }
    });
  }

  render(){
    let data=this.props.data;

    let svgWidth = this.props.svgWidth;
    let svgHeight = this.props.svgWidth*0.5;
    let w = svgWidth - (chartMargin.LEFT + chartMargin.RIGHT);
    let h = svgHeight - (chartMargin.TOP + chartMargin.BOTTOM);

    data.forEach((d)=> {
        d.date = d3.isoParse(d.time);
    });

    let x = d3.scaleBand()
      .range([0, w], .1)
      .domain(data.map((d) => d.date ));

    let y = d3.scaleLinear()
      .domain([0,d3.max(data,(d)=>(d.value))])
      .range([h, 0]);

    let transform='translate(' + chartMargin.LEFT + ',' + chartMargin.TOP + ')';

    return (
      <svg width={svgWidth} height={svgHeight} >
        <g transform={transform}>
          <GridNAxis x={x} y={y} w={w} h={h} xAxis={true} yAxis={true} xGrid={false} yGrid={true} />

          <Line x={x} y={y} data={data} color={this.props.color} />
          <Dots data={data} x={x} y={y} color={this.props.color} showToolTip={this.showToolTip} hideToolTip={this.hideToolTip} xOffset={x.bandwidth()/2}/>
        </g>
        {(this.props.xLabel==="")?"":<g><text x={svgWidth - chartMargin.RIGHT} y={svgHeight} textAnchor="end" >{this.props.xLabel}</text></g>}
        {(this.props.yLabel==="")?"":<g><text x={chartMargin.LEFT - 5} y={chartMargin.TOP - 10} textAnchor="end" >{this.props.yLabel}</text></g>}
      </svg>
    );
  }
}


export default LineChart;
