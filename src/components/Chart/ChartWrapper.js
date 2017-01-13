import React, { Component } from 'react';
import '../../styles/ChartWrapper.css'

const ChartWrapper = (Chart)=> class extends Component {
  render() {
    let legend = (this.props.legend)? this.props.legend.map((legend, index)=>{
      return (
        <div key={legend} className="legend">
          <div className="box" style={{backgroundColor:this.props.colors[index]}}></div>
          <span>{legend}</span>
        </div>
      );
    }) : "";

    return (
      <section className="ChartWrapper" >
        <h3>{this.props.title}</h3>
        <div className="svgWrapper">
          <Chart {...this.props}/>
        </div>
        <div className="legends">
          {legend}
        </div>
      </section>
    );
  }
}

export default ChartWrapper;
