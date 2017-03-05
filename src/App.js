import React, { Component } from 'react';
import './styles/App.css'
import Chart from './components/Chart';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>d3React</h2>
        </div>

        <Chart />

      </div>
    );
  }
}

export default App;
