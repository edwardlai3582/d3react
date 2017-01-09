import * as config from './config';

const mockResponse = {
  get: (url, opts) => {
    console.log(url);
    let response = {};
    let serverID, starttime, endtime;
    let recordCount = 0;
    let data = [];

    let splitUrl = url.toLowerCase().split("/")[2].split("?");
    //get serverID
    serverID = splitUrl[0];
    //get starttime and endtime
    let queries = splitUrl[1].split("&");
    queries.forEach((element)=>{
      let splitElement = element.split("=");
      if(splitElement[0] === "from"){
        starttime = splitElement[1].toUpperCase();
      }
      if(splitElement[0] === "to"){
        endtime = splitElement[1].toUpperCase();
      }
    });

    //validate variables
    let startDate = new Date(starttime);
    let endDate = new Date(endtime);
    if(serverID.length <= 0) {
      return {error: "invalid serverID"}
    }
    if((startDate === "Invalid Date") || (endDate === "Invalid Date") || (startDate >= endDate)) {
      return {error: "invalid time"}
    }
    //get time difference in seconds
    let time_diff = Math.floor((endDate - startDate) /1000);

    //create data elements
    for(let i = config.getRandomIntInclusive(0, config.TIME_INTERVAL); i < time_diff; i+= config.getRandomIntInclusive(1, config.TIME_INTERVAL)) {
        recordCount++;
        //set element
        let element = {};
        let d = new Date(starttime);
        d.setSeconds(d.getSeconds() + i);
        element.timestamp = d.toISOString();
        element.memory_usage = config.getRandomIntInclusive(0, config.MEMORY_TOTAL);
        element.memory_available = config.MEMORY_TOTAL - element.memory_usage;
        element.cpu_usage = config.getRandomIntInclusive(0, config.CPU_USAGE) / 100;
        element.network_throughput = {
          in: config.getRandomIntInclusive(0, config.NETWORK_TRAFFIC),
          out: config.getRandomIntInclusive(0, config.NETWORK_TRAFFIC)
        }
        element.network_packet = {
          in: config.getRandomIntInclusive(0, config.NETWORK_PACKET),
          out: config.getRandomIntInclusive(0, config.NETWORK_PACKET)
        }
        element.errors = {
          system: config.getRandomIntInclusive(0, config.ERROR),
          sensor: config.getRandomIntInclusive(0, config.ERROR),
          component: config.getRandomIntInclusive(0, config.ERROR)
        }

        data.push(element);
    }


    //set response
    response.header = {
        target_name: serverID,
        time_range: {
          start: starttime,
          end: endtime
        },
        recordCount: recordCount
    }
    response.data = data;

    //return response;
    return {
      body: response,
      statue: 200
    };
  },
  post: (url, opts) => {
    return {
      statue: 200
    };
  }
}

export default mockResponse
