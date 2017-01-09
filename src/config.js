export const TIME_INTERVAL = 150000;
export const MEMORY_TOTAL = 1000000000;
export const CPU_USAGE = 100;
export const NETWORK_TRAFFIC = 1000000000;
export const NETWORK_PACKET = 100000;
export const ERROR = 1000;

export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getSimpleArray = (data, property) => {
  let dataArray = [];

  dataArray = data.map(function(object){
    let temp={};
    temp.time = object.timestamp;
    temp.value = object[property];
    return temp;
  });

  return dataArray;
}
