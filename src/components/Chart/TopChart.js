import React, { Component } from 'react';
import fetchMock from 'fetch-mock';
import mockResponse from '../../mockResponse';

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

    return fetch(`/server_stat/123?from=${fromString}&to=${toString}`)
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
      <div>
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
