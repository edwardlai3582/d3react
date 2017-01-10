import React from 'react';
import '../../styles/ChartWrapper.css'

class ChartWrapper extends React.Component {
  render() {
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {...this.props})
    );


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
          {childrenWithProps}
        </div>
        <div className="legends">
          {legend}
        </div>
      </section>
    );
  }
}

export default ChartWrapper;
