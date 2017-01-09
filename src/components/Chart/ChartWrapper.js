import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/ChartWrapper.css'

class ChartWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 1000,
      height: 500,
    };

  }
  componentDidMount() {
    let node = ReactDOM.findDOMNode(this);

    this.setState({
      width:node.getBoundingClientRect().width,
      height:node.getBoundingClientRect().height
    });
  }
  componentWillReceiveProps(nextProps){
    let node = ReactDOM.findDOMNode(this);

    this.setState({
      width:node.getBoundingClientRect().width,
      height:node.getBoundingClientRect().height
    });
  }

  render() {


    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {...this.props, width: this.state.width, height: this.state.height})
    );

    return (
      <section className="ChartWrapper" >
        <h3>{this.props.chartId}</h3>
        {childrenWithProps}
      </section>
    );
  }
}

export default ChartWrapper;
