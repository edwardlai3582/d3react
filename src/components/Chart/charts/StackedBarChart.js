import React, { Component } from 'react';
import StackedBars from './elements/StackedBars';
import PlainChart from './PlainChart';

class StackedBarChart extends Component{
  render(){
    //get Y max
    const YMax = (datas) => {
      let YMax=0;
      for(let i=0;i<datas[0].length;i++){
        let temp=0;
        for(let j=0;j<datas.length;j++){
          temp+=datas[j][i].value
        }
        if(temp > YMax) YMax=temp;
      }

      return  YMax;
    }

    return (
        <PlainChart YMax={YMax} xAxis={true} yAxis={true} xGrid={false} yGrid={true} {...this.props} >
              <StackedBars />
        </PlainChart>
    );
  }
}

export default StackedBarChart;
