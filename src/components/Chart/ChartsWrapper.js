import React, { Component } from 'react';

import LineChart from './LineChart';
import BarChart from './BarChart';
import StackedBarChart from './StackedBarChart';
import GroupedBarChart from './GroupedBarChart';
import GroupedLineChart from './GroupedLineChart';

class ChartsWrapper extends Component {

  render() {
    let header = this.props.response.header;
    let data = this.props.response.data;

    //let timestamp = [];
    let memory_usage = [];
    let memory_available = [];
    let cpu_usage = [];
    let network_throughputIn = [];
    let network_throughputOut = [];
    let network_packetIn = [];
    let network_packetOut = [];
    let errorsSystem = [];
    let errorsSensor = [];
    let errorsComponent = [];
    data.forEach((element)=> {
        memory_usage.push({time: element.timestamp, value: element.memory_usage});
        memory_available.push({time: element.timestamp, value: element.memory_available});
        cpu_usage.push({time: element.timestamp, value: element.cpu_usage});
        network_throughputIn.push({time: element.timestamp, value: element.network_throughput.in});
        network_throughputOut.push({time: element.timestamp, value: element.network_throughput.out});
        network_packetIn.push({time: element.timestamp, value: element.network_packet.in});
        network_packetOut.push({time: element.timestamp, value: element.network_packet.out});
        errorsSystem.push({time: element.timestamp, value: element.errors.system});
        errorsSensor.push({time: element.timestamp, value: element.errors.sensor});
        errorsComponent.push({time: element.timestamp, value: element.errors.component});
    });

    return (
      <div>
        <p>SERVER ID: {header.target_name}</p>
        <p>FROM: {Date(header.time_range.start)}</p>
        <p>TO: {Date(header.time_range.end)}</p>
        <p>RECORD COUNT: {header.recordCount}</p>
        <LineChart width={900} height={200} chartId={'testL'} data={cpu_usage}/>
        <BarChart  width={900} height={200} chartId={'testB'} data={memory_usage}/>
        <StackedBarChart  width={900} height={200} chartId={'testS'} colors={['teal','blue', 'red']} datas={[errorsSystem,errorsSensor,errorsComponent]}/>
        <GroupedBarChart  width={900} height={200} chartId={'testG'} colors={['salmon','blue']} datas={[network_throughputIn,network_throughputOut]}/>
        <GroupedLineChart width={900} height={200} chartId={'testG'} colors={['orange','purple']} datas={[network_packetIn,network_packetOut]}/>
      </div>
    );
  }
}

export default ChartsWrapper;
