import * as d3 from "d3";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Axis from './Axis';
import Grid from './Grid';
import GroupedBars from './GroupedBars';

class GroupedBarChart extends Component{
  constructor() {
    super();
    this.state = {
      width: 800,
      tooltip:{
        display:false,
        data1:{key:'',value:''},
        data2:{key:'',value:''}
      }
    };

  }

  componentWillMount(){

  }

  componentDidMount() {

  }

  componentWillUnmount(){

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
    let data1=this.props.datas[0];
    let data2=this.props.datas[1];

    let margin = {top: 10, right: 50, bottom: 20, left: 100},
        w = this.state.width - (margin.left + margin.right),
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

    let yAxis = d3.axisLeft(y)//.ticks(5);

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

            <GroupedBars h={h} datas={[data1,data2]} x={x} y={y} colors={this.props.colors}/>
          </g>
        </svg>
      </div>
    );
  }
}
//

GroupedBarChart.defaultProps = {
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

export default GroupedBarChart;
