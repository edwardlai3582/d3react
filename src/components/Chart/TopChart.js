import React, { Component } from 'react';
import fetchMock from 'fetch-mock';
import mockResponse from '../../mockResponse';
import '../../styles/TopChart.css';
import ChartsWrapper from './ChartsWrapper';


class TopChart extends Component {
  constructor() {
    super();
    this.state = { response: {}};
    this.mockGet = this.mockGet.bind(this);
  }

  componentDidMount() {
    this.mockGet();
  }

  mockGet() {
    fetchMock.get(/server_stat\/.*?.*/i, mockResponse.get);

    let fromString = "2016-12-10T00:56:11.000Z";
    let toString =   "2017-01-05T00:56:11.000Z";
    let serverid = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);

    return fetch(`/server_stat/${serverid}?from=${fromString}&to=${toString}`)
      .then((response) => {
        return response.json()
      })
      .then((data)=>{
        console.log(data)
        this.setState({response: data});
      })
  }

  render() {
    return (
      <div id="TopChart">
        <section>
          <button onClick={this.mockGet}>
            REFRESH
          </button>
        </section>
        <section>
          {this.state.response.header? <ChartsWrapper response={this.state.response}/> : 'LOADING...'}
        </section>
      </div>
    );
  }
}

export default TopChart;
