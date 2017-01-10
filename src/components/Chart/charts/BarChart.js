import * as d3 from "d3";
import React, { Component } from 'react';
//import ReactDOM from 'react-dom';

import Axis from '../elements/Axis';
import Grid from '../elements/Grid';
import Bars from '../elements/Bars';
import ToolTip from '../elements/ToolTip';

class BarChart extends Component{
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
//console.log("From Barchart:"+this.props.width)
//console.log("From Barchart:"+this.props.height)

    let data=this.props.data;

    let svgWidth = this.props.svgWidth;
    let svgHeight = this.props.svgWidth*0.5;
    //console.log("h: "+this.props.height);
    let margin = {top: 10, right: 30, bottom: 20, left: 80},
        w = svgWidth - (margin.left + margin.right),
        h = svgHeight - (margin.top + margin.bottom);

    data.forEach(function (d) {
        d.date = d3.isoParse(d.time);
    });
    //console.log(data);

    let x = d3.scaleBand()
        .range([0, w], .1)
        .domain(data.map((d) => d.date ));
    /*
    d3.scaleTime()
        .range([0, w], .1)
        .domain(d3.extent(data, function (d) {
            return d.date;
        }))
    */


    let y = d3.scaleLinear()
        .domain([0,d3.max(data,function(d){
            return d.value;
        })])
        .range([h, 0]);

    let yAxis = d3.axisLeft(y)//.ticks(5);

    //let xAxis = d3.axisBottom(x).ticks(1);

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

            <Bars h={h} data={data} x={x} y={y} color={this.props.color} showToolTip={this.showToolTip} hideToolTip={this.hideToolTip} />
            <ToolTip tooltip={this.state.tooltip}/>
          </g>
        </svg>
      </div>
    );
  }
}

export default BarChart;
