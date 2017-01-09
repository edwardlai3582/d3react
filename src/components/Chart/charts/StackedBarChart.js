import * as d3 from "d3";
import React, { Component } from 'react';

import Axis from '../elements/Axis';
import Grid from '../elements/Grid';
import StackedBars from '../elements/StackedBars';
//import ToolTip from '../elements/ToolTip';

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
    //this.showToolTip = this.showToolTip.bind(this);
    //this.hideToolTip = this.hideToolTip.bind(this);
  }

  showToolTip(e){
      e.target.setAttribute('fill', '#7dc7f4');
      this.setState({
        tooltip:{
          display:true,
          data: {
            key:e.target.getAttribute('data-key'),
            value:e.target.getAttribute('data-value')
          },
          pos:{
            x:+e.target.getAttribute('x') + e.target.getAttribute('width')/2,
            y:e.target.getAttribute('y')
          }
        }
      });
  }

  hideToolTip(e){
      e.target.setAttribute('fill', 'teal');
      this.setState({
        tooltip:{
          display:false,
          data:{key:'',value:''}
        }
      });
  }

  render(){
    let data1=this.props.datas[0];

    let margin = {top: 10, right: 50, bottom: 20, left: 100},
        w = this.props.width - (margin.left + margin.right),
        h = this.props.height - (margin.top + margin.bottom);

    data1.forEach(function (d) {
        d.date = d3.isoParse(d.time);
    });
    //console.log(data);
    let popo=[]
    this.props.datas.forEach(function(element) {
        let yy=element.map(function(d) {
            d.date = d3.isoParse(d.time);
            return d;
        });
        popo.push(yy)
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

    let yAxis = d3.axisLeft(y)//.ticks(5);

    let yGrid = d3.axisLeft(y).ticks()
        .tickSize(-w, 0, 0)
        .tickFormat("");

    let transform='translate(' + margin.left + ',' + margin.top + ')';

    return (
      <div className="svgWrapper">
        <svg id={this.props.chartId} width={this.props.width} preserveAspectRatio="xMinYMin meet">
          <g transform={transform}>
            <Grid h={h} grid={yGrid} gridType="y"/>
            <Axis h={h} axis={yAxis} axisType="y" />

            <StackedBars h={h} colors={this.props.colors} data={data1} datas={popo}  x={x} y={y} />
          </g>
        </svg>
      </div>
    );
  }
}
//

StackedBarChart.defaultProps = {
  width: 800,
  height: 300,
  chartId: 'v1_chart',
  datas: [
    [
        {time:'2016-12-09T04:41:52.000Z',value:100},
        {time:'2016-12-11T14:04:04.000Z',value:150}
    ],
    [
        {time:'2016-12-09T04:41:52.000Z',value:100},
        {time:'2016-12-11T14:04:04.000Z',value:50}
    ]
  ]
};

export default StackedBarChart;
