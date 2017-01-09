import * as d3 from "d3";
import React, { Component } from 'react';

import Dots from '../elements/Dots';
import Axis from '../elements/Axis';
import Grid from '../elements/Grid';
import ToolTip from '../elements/ToolTip';

class GroupedLineChart extends Component{
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

////////////////
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
      e.target.setAttribute('fill', '#7dc7f4');
      this.setState({
        tooltip:{
          display:false,
          data:{key:'',value:''}
        }
      });
  }

  render(){
      var data=this.props.datas[0];
      var data2=this.props.datas[1];
      //console.log(data);
      var margin = {top: 10, right: 50, bottom: 20, left: 100},
          w = this.props.width - (margin.left + margin.right),
          h = this.props.height - (margin.top + margin.bottom);


      data.forEach(function (d) {
          d.date = d3.isoParse(d.time);
      });

      data2.forEach(function (d) {
          d.date = d3.isoParse(d.time);
      });

      /*
      var x = d3.scaleTime()
          .domain(d3.extent(data, function (d) {
              return d.date;
          }))
          .rangeRound([0, w]);
      */
      var x = d3.scaleBand()
              .range([0, w], .1)
              .domain(data.map((d) => d.date ));

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

      var yAxis = d3.axisLeft(y)//.ticks(5);

      //var xAxis = d3.axisBottom(x).ticks(1);
      /*
      .tickValues(
        data.map(function(d,i){
          if(i>0) return d.date;
        }).splice(1))
      .ticks(4);
      */
      ///*
      var xGrid = d3.axisBottom(x)
          .ticks(5)
          .tickSize(-h, 0, 0)
          .tickFormat("");
      //*/
      var yGrid = d3.axisLeft(y).ticks()
          .tickSize(-w, 0, 0)
          .tickFormat("");

      var line = d3.line()
          .x(function (d) {
              return x(d.date) + x.bandwidth()/2;
          })
          .y(function (d) {
              return y(d.value);
          });
          //.curve(d3.curveCatmullRom.alpha(0))

      var transform='translate(' + margin.left + ',' + margin.top + ')';

      return (
          <div className="svgWrapper">
              <svg id={this.props.chartId} width={this.props.width} preserveAspectRatio="xMinYMin meet">

                  <g transform={transform}>
                    <Grid h={h} grid={yGrid} gridType="y"/>
                    <Grid h={h} grid={xGrid} gridType="x"/>

                    <Axis h={h} axis={yAxis} axisType="y" />

                    <path className="line shadow" d={line(data)} strokeLinecap="round" fill="none" stroke="black"/>
                    <path className="line shadow" d={line(data2)} strokeLinecap="round" fill="none" stroke="red"/>

                    <Dots data={data} x={x} y={y} showToolTip={this.showToolTip} hideToolTip={this.hideToolTip} xOffset={x.bandwidth()/2}/>
                    <ToolTip tooltip={this.state.tooltip}/>
                  </g>
              </svg>
          </div>
      );
  }
}
//

GroupedLineChart.defaultProps = {
  width: 800,
  height: 300,
  chartId: 'v1_chart',
  data: [
      {time:'2016-12-09T04:41:52.000Z',value:100},
      {time:'2016-12-11T14:04:04.000Z',value:150}
  ]
};

export default GroupedLineChart;
