import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../styles/ChartsWrapper.css"
import LineChart from "./charts/LineChart";
import StackedBarChart from "./charts/StackedBarChart";
import GroupedBarChart from "./charts/GroupedBarChart";
import GroupedLineChart from "./charts/GroupedLineChart";

import ChartWrapper from "./ChartWrapper";

class ChartsWrapper extends Component {
  constructor() {
    super();
    this.state = {
      memoryChecked: true,
      cpuChecked: true,
      network_throughputChecked: true,
      network_packetChecked: true,
      errorsChecked: true,
      svgWidth: 500,
    };
    this.updateSize = this.updateSize.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }
  componentWillMount(){
      window.addEventListener("resize", (event)=>{
        this.updateSize();
      });
  }

  componentDidMount() {
      this.updateSize();
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.updateSize);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      memoryChecked: true,
      cpuChecked: true,
      network_throughputChecked: true,
      network_packetChecked: true,
      errorsChecked: true
    });
  }

  updateSize(){
      let node = ReactDOM.findDOMNode(this);
      let width = node.getBoundingClientRect().width;
      let svgWidth = 0;
      //console.log(width);
      if(width <= 575) {
        svgWidth = width;
      }
      else{
        svgWidth = width*0.48;
      }

      this.setState({
        svgWidth: svgWidth
      });
  }

  onCheck(e) {
    let checkedValue = e.target.value;

    if(checkedValue === "memory"){
      this.setState({memoryChecked: !this.state.memoryChecked});
    }
    else if(checkedValue === "cpu"){
      this.setState({cpuChecked: !this.state.cpuChecked});
    }
    else if(checkedValue === "network_throughput"){
      this.setState({network_throughputChecked: !this.state.network_throughputChecked});
    }
    else if(checkedValue === "network_packet"){
      this.setState({network_packetChecked: !this.state.network_packetChecked});
    }
    else if(checkedValue === "errors"){
      this.setState({errorsChecked: !this.state.errorsChecked});
    }
  }

  render() {
    let header = this.props.response.header;
    let data = this.props.response.data;

    //create chart with HOC ChartWrapper
    let MemoryChart = ChartWrapper(StackedBarChart);
    let CpuChart = ChartWrapper(LineChart);
    let NetworkThroughputChart = ChartWrapper(GroupedBarChart);
    let NetworkPacketChart = ChartWrapper(GroupedLineChart);
    let ErrorsChart = ChartWrapper(StackedBarChart);

    //data array for chart
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

    if(data){
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
    }


    return (
      <div>
        {(data)?(
          <div className="ChartsWrapper">
            <section className="noFlex">
              <h3>INFO</h3>
              <div>
                <p><strong>SERVER ID:</strong> {header.target_name}</p>
                <p><strong>FROM:</strong> {new Date(header.time_range.start).toString()}</p>
                <p><strong>TO:</strong> {new Date(header.time_range.end).toString()}</p>
                <p><strong>RECORD COUNT:</strong> {header.recordCount}</p>
              </div>
            </section>

            <section className="noFlex">
              <h3>FILTER</h3>
              <div>
                <label>
                  <input type="checkbox" value="memory" checked={this.state.memoryChecked} onChange={this.onCheck} />
                    MEMORY
                </label>
                <label>
                  <input type="checkbox" value="cpu" checked={this.state.cpuChecked} onChange={this.onCheck} />
                    CPU
                </label>
                <label>
                  <input type="checkbox" value="network_throughput" checked={this.state.network_throughputChecked} onChange={this.onCheck} />
                    NETWORK THROUGHTPUT
                </label>
                <label>
                  <input type="checkbox" value="network_packet" checked={this.state.network_packetChecked} onChange={this.onCheck} />
                    NETWORK PACKET
                </label>
                <label>
                  <input type="checkbox" value="errors" checked={this.state.errorsChecked} onChange={this.onCheck} />
                    ERRORS
                </label>
              </div>
            </section>

            {this.state.memoryChecked ? (
              <MemoryChart title={"memory"} xLabel={"time"} yLabel={"KB"} legend={["usage","available"]} colors={["#7B4A12","#E49135"]} datas={[memory_usage,memory_available]} svgWidth={this.state.svgWidth}/>
            ) : (
              ""
            )}
            {this.state.cpuChecked ? (
              <CpuChart title={"cpu usage"} xLabel={"time"} yLabel={""} color={"teal"} data={cpu_usage} svgWidth={this.state.svgWidth} />
            ) : (
              ""
            )}
            {this.state.network_throughputChecked ? (
              <NetworkThroughputChart  title={"network throughput"} xLabel={"time"} yLabel={"KB"} legend={["in","out"]} colors={["salmon","navy"]} datas={[network_throughputIn,network_throughputOut]} svgWidth={this.state.svgWidth} />
            ) : (
              ""
            )}
            {this.state.network_packetChecked ? (
              <NetworkPacketChart title={"network packet"} xLabel={"time"} yLabel={""} legend={["in","out"]} colors={["orange","purple"]} datas={[network_packetIn,network_packetOut]}  svgWidth={this.state.svgWidth} />
            ) : (
              ""
            )}
            {this.state.errorsChecked ? (
              <ErrorsChart title={"errors"} xLabel={"time"} yLabel={""} legend={["system","sensor", "component"]} colors={["#5D4EA8","#3187C2", "#67C2A3"]} datas={[errorsSystem,errorsSensor,errorsComponent]} svgWidth={this.state.svgWidth} />
            ) : (
              ""
            )}
          </div>
      ):(<div>no data</div>)}
    </div>
    );
  }
}
/*

*/
export default ChartsWrapper;
