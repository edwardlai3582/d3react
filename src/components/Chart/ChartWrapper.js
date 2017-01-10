import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/ChartWrapper.css'

class ChartWrapper extends React.Component {
  constructor() {
    super();

  }



  render() {


    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {...this.props})
    );

    return (
      <section className="ChartWrapper" >
        <h3>{this.props.chartId}</h3>
        <div className="svgWrapper">
          {childrenWithProps}
        </div>
      </section>
    );
  }
}

export default ChartWrapper;
