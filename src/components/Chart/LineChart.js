import * as d3 from "d3";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Dots from './Dots';
import Axis from './Axis';
import Grid from './Grid';
import ToolTip from './ToolTip';

class LineChart extends Component{
  constructor() {
    super();
    this.state = {
      width: 800,
      tooltip:{
        display:false,
        data:{key:'',value:''}
      }
    };
    this.showToolTip = this.showToolTip.bind(this);
    this.hideToolTip = this.hideToolTip.bind(this);
  }
////////////////
componentWillMount(){
    window.addEventListener('resize', (event)=>{
      this.updateSize();
    });
    this.setState({width:this.props.width});
}

componentDidMount() {
    this.updateSize();
}

componentWillUnmount(){
    //$(window).off('resize');
}

updateSize(){
    var node = ReactDOM.findDOMNode(this);
    var parentWidth=node.getBoundingClientRect().width;//$(node).width();
    //console.log('parentWidth='+parentWidth)
    if(parentWidth<this.props.width){
        this.setState({width:parentWidth-20});
    }else{
        this.setState({width:this.props.width});
    }
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
      var data=this.props.data;
      //console.log(data);
      var margin = {top: 10, right: 50, bottom: 20, left: 100},
          w = this.state.width - (margin.left + margin.right),
          h = this.props.height - (margin.top + margin.bottom);


      data.forEach(function (d) {
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

      var y = d3.scaleLinear()
          .domain([0,d3.max(data,function(d){
              return d.value;
          })])
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
      /*
      var xGrid = d3.axisBottom(x)
          .ticks(5)
          .tickSize(-h, 0, 0)
          .tickFormat("");
      */
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
          <div>
              <svg id={this.props.chartId} width={this.state.width} height={this.props.height}>

                  <g transform={transform}>
                    <Grid h={h} grid={yGrid} gridType="y"/>

                    <Axis h={h} axis={yAxis} axisType="y" />

                    <path className="line shadow" d={line(data)} strokeLinecap="round" fill="none" stroke="black"/>
                    <Dots data={data} x={x} y={y} showToolTip={this.showToolTip} hideToolTip={this.hideToolTip} xOffset={x.bandwidth()/2}/>
                    <ToolTip tooltip={this.state.tooltip}/>
                  </g>
              </svg>
          </div>
      );
  }
}
//

LineChart.defaultProps = {
  width: 800,
  height: 300,
  chartId: 'v1_chart',
  data: [
      {time:'2016-12-09T04:41:52.000Z',value:100},
      {time:'2016-12-11T14:04:04.000Z',value:150}
  ]
};

export default LineChart;
