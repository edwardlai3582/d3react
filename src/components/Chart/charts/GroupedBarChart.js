import React, { Component } from 'react';
import GroupedBars from './elements/GroupedBars';
import PlainChart from './PlainChart';

class GroupedBarChart extends Component{
  render(){
    //get Y max
    const YMax = (datas) => {
      return datas.reduce((accumulator, currentValue)=>{
        let submax = currentValue.reduce((accumulator, currentValue)=>{
            if(currentValue.value > accumulator) accumulator= currentValue.value;
            return accumulator;
        }, 0);
        if(submax > accumulator) accumulator= submax;
        return accumulator;
      }, 0);
    }

    return (
        <PlainChart YMax={YMax} {...this.props} >
          <GroupedBars />
        </PlainChart>
    );
  }
}

export default GroupedBarChart;
