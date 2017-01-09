import * as d3 from "d3";
import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import './qq.css'
//import Dots from './Dots';
//import Axis from './Axis';
//import Grid from './Grid';
//import ToolTip from './ToolTip';

class BarChart extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  componentDidMount() {
    this.svg = d3.select(this.testdiv)
      .append('svg')
      //attr('width', this.props.w)
      //.attr('height', this.props.h);

    this._renderChart();
  }

  componentDidUpdate() {
    this.draw();
  }

  _renderChart() {
    /*
    const { w, h } = this.props;
    const dataset = this.props.dataset.map(function (d) {
        //d.date = d3.isoParse(d.time);
        //d.value = +d.value;
        return {
            date: d3.isoParse(d.time),
            value: d.value
        }
    });
    */


    var margin = {top: 10, right: 10, bottom: 10, left: 30};
        this.width = 600 - margin.left - margin.right;
        this.height = 200 - margin.top - margin.bottom;

    this.x = d3.scaleBand().range([0, this.width], .1);//d3.scale.ordinal().rangeRoundBands([0, width], .05);
    this.y = d3.scaleLinear().range([this.height, 0]);

    this.xAxis = d3.axisBottom(this.x).tickFormat(d3.timeFormat("%Y-%m"));
    this.yAxis = d3.axisLeft(this.y).ticks(10);

    this.svg.attr("width", this.width + margin.left + margin.right)
      .attr("height", this.height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    this.svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + this.height + ")")
              .call(this.xAxis)
            .selectAll("text")
              .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", "-.55em")
              .attr("transform", "rotate(-90)" );

    this.svg.append("g")
              .attr("class", "y axis")
              .call(this.yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Value ($)");

    this.draw();
  }

draw() {
  const data = this.props.dataset.map(function (d) {
      //d.date = d3.isoParse(d.time);
      //d.value = +d.value;
      return {
          date: d3.isoParse(d.time),
          value: d.value
      }
  });
  console.log(data)
  // measure the domain (for x, unique letters) (for y [0,maxFrequency])
  // now the scales are finished and usable
  this.x.domain(data.map(function(d) { return d.date; }));
  this.y.domain([0, d3.max(data, function(d) { return d.value; })]);

  // another g element, this time to move the origin to the bottom of the svg element
  // someSelection.call(thing) is roughly equivalent to thing(someSelection[i])
  //   for everything in the selection\
  // the end result is g populated with text and lines!
  this.svg.select('.x.axis').transition().duration(300).call(this.xAxis);

  // same for yAxis but with more transform and a title
  this.svg.select(".y.axis").transition().duration(300).call(this.yAxis)

  // THIS IS THE ACTUAL WORK!
  var bars = this.svg.selectAll(".bar").data(data, function(d) { return d.date; })

  // data that needs DOM = enter() (a set/selection, not an event!)
  bars.enter().append("rect")
    .classed("bar", true)
    .attr('x', this.width)
    .attr("y", this.y(0)) //d => yScale(d.value) this.y(0)
    .attr("height",  this.height - this.y(0));
    //this.height - this.y(0)
    //d => this.height - this.y(d.value)

  // the "UPDATE" set:
  this.svg.selectAll(".bar").transition().duration(300)
    .attr("x", d => this.x(d.date)) // (d) is one item from the data array, x is the scale object from above
    .attr("width", this.x.bandwidth()) // constant, so no callback function(d) here
    .attr("y", d => this.y(d.value) )
    .attr("height", d => this.height - this.y(d.value) ); // flip the height, because y's domain is bottom up, but SVG renders top down

    bars.exit()
      .transition()
        .duration(300)
      .attr("y", this.y(0))
      .attr("height", this.height - this.y(0))
      .style('fill-opacity', 1e-6)
      .remove();

}

  render() {
    return (
      <div>
        <div ref={(div) => { this.testdiv = div; }} className="chart"></div>
      </div>
    )
  }
}

BarChart.defaultProps = {
  w: 600,
  h: 250,
  dataset: [  ]
};

export default BarChart;
