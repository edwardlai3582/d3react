import React, { Component } from 'react';
import Lines from '../elements/Lines';
import PlainChart from './PlainChart';

class GroupedLineChart extends Component{
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
          <Lines />
        </PlainChart>
    );
  }
}

export default GroupedLineChart;
