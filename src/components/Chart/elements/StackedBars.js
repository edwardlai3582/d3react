import React, { Component } from 'react';

class StackedBars extends Component{
  render(){
//console.log(this.props.datas);
    let qq=[];
    let h=[];
    for(let i=0; i<this.props.datas.length;i++){
      if(i===0){
          qq.push(this.props.datas[i].map((d,index)=>{
            return (
              <rect
                width={this.props.x.bandwidth()*0.8}
                height={this.props.h - this.props.y(d.value)}
                x={this.props.x(d.date)+this.props.x.bandwidth()*0.1}
                y={this.props.y(d.value)}
                fill={this.props.colors[i]}
                onMouseOver={this.props.showToolTip}
                onMouseOut={this.props.hideToolTip}
                key={index}
                data-key={d.time}
                data-value={d.value}
              />
            );
          }));

          for(let j=0; j<this.props.datas[i].length;j++){
            h.push(this.props.h - this.props.y(this.props.datas[i][j].value));
          }
      }
      else{
        qq.push(this.props.datas[i].map((d,index)=>{
          return (
            <rect
              width={this.props.x.bandwidth()*0.8}
              height={this.props.h - this.props.y(d.value)}
              x={this.props.x(d.date)+this.props.x.bandwidth()*0.1}
              y={this.props.y(d.value)-h[index]}
              fill={this.props.colors[i]}
              onMouseOver={this.props.showToolTip}
              onMouseOut={this.props.hideToolTip}
              key={index}
              data-key={d.time}
              data-value={d.value}
            />
          );
        }));

        for(let j=0; j<this.props.datas[i].length;j++){
          h[j] += this.props.h - this.props.y(this.props.datas[i][j].value);
        }
      }
    }

    return(
      <g>
        {qq}
      </g>
    );
  }
}

export default StackedBars;
