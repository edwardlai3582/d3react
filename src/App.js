import React, { Component } from 'react';

import Chart from './components/Chart';

class App extends Component {


  render() {


    return (
      <div className="App">
        <div className="App-header">
          <h2>Juniper Networks UI Coding Challenge</h2>
        </div>

        <Chart />

      </div>
    );
  }
}

export default App;
