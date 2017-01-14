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
    this.setState({ [e.target.value]: e.target.checked });
  }

  render() {
    let status = this.props.status;
    let header = this.props.response.header;
    let data = this.props.response.data;
    let thingToRender;

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

    if(status === 'initial') {
      thingToRender = " "
    }
    else if(status === 'loading') {
      thingToRender = "loading..."
    }
    else if(status === 'success') {
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

      thingToRender = (
        <div className="ChartsWrapper">
          <section className="noFlex">
            <h3>INFO</h3>
            <div>
              <p><strong>SERVER ID:</strong> {header.target_name}</p>
              <p><strong>FROM:</strong> {new Date(header.time_range.start).toUTCString()}</p>
              <p><strong>TO:</strong> {new Date(header.time_range.end).toUTCString()}</p>
              <p><strong>RECORD COUNT:</strong> {header.recordCount}</p>
            </div>
          </section>

          <section className="noFlex">
            <h3>FILTER</h3>
            <div>
              <label>
                <input type="checkbox" value="memoryChecked" checked={this.state.memoryChecked} onChange={this.onCheck} />
                  MEMORY
              </label>
              <label>
                <input type="checkbox" value="cpuChecked" checked={this.state.cpuChecked} onChange={this.onCheck} />
                  CPU
              </label>
              <label>
                <input type="checkbox" value="network_throughputChecked" checked={this.state.network_throughputChecked} onChange={this.onCheck} />
                  NETWORK THROUGHTPUT
              </label>
              <label>
                <input type="checkbox" value="network_packetChecked" checked={this.state.network_packetChecked} onChange={this.onCheck} />
                  NETWORK PACKET
              </label>
              <label>
                <input type="checkbox" value="errorsChecked" checked={this.state.errorsChecked} onChange={this.onCheck} />
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
            <CpuChart title={"cpu usage"} xLabel={"time"} yLabel={""} colors={["teal"]} datas={[cpu_usage]} svgWidth={this.state.svgWidth} />
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
      );
    }
    else if(status === 'fail') {
      thingToRender = "can't get the data"
    }
    else {
      thingToRender = " "
    }

    return (
      <div>
        {thingToRender}
      </div>
    );
  }
}
/*

*/
export default ChartsWrapper;
