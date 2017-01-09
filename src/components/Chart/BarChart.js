import * as d3 from "d3";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Axis from './Axis';
import Grid from './Grid';
import Bars from './Bars';
import ToolTip from './ToolTip';

class BarChart extends Component{
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
      let node = ReactDOM.findDOMNode(this);
      let parentWidth=node.getBoundingClientRect().width;//$(node).width();
      //console.log('parentWidth='+parentWidth)
      if(parentWidth<this.props.width){
          this.setState({width:parentWidth-20});
      }else{
          this.setState({width:this.props.width});
      }
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
    let data=this.props.data;

    let margin = {top: 10, right: 50, bottom: 20, left: 100},
        w = this.state.width - (margin.left + margin.right),
        h = this.props.height - (margin.top + margin.bottom);

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
      <div>
        <svg id={this.props.chartId} width={this.state.width} height={this.props.height}>
          <g transform={transform}>
            <Grid h={h} grid={yGrid} gridType="y"/>
            <Axis h={h} axis={yAxis} axisType="y" />

            <Bars h={h} data={data} x={x} y={y} color={"teal"} showToolTip={this.showToolTip} hideToolTip={this.hideToolTip} />
            <ToolTip tooltip={this.state.tooltip}/>
          </g>
        </svg>
      </div>
    );
  }
}
//

BarChart.defaultProps = {
  width: 800,
  height: 300,
  chartId: 'v1_chart',
  data: [
      {time:'2016-12-09T04:41:52.000Z',value:100},
      {time:'2016-12-11T14:04:04.000Z',value:150}
  ]
};

export default BarChart;
