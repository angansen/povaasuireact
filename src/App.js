import React, { Component } from 'react';
import './App.css';
import RouterHeader from './component/route';
//let jsonData=[{"_id":"5b6dc63ba2de353768592a33","name":"Recommendation","description":"Decription related to recommendation","implemented":"0","link":"https://www.google.co.in/search?q=how+to+create+record+using+mongodb+compass+community&rlz=1C1CHBD_enIN790IN790&oq=how+to+create+record+using+mongodb+compass+community&aqs=chrome..69i57.14511j0j7&sourceid=chrome&ie=UTF-8"},{"_id":"5b6dc691a2de353768592a34","name":"Recomendation with spark","description":"Description spark recomendation engine","implemented":"0","link":"https://docs.mongodb.com/manual/core/capped-collections/"},{"_id":"5b6dc71396f1e23768de5e60","name":"Autonomous database","description":"Decription related to autonomous database","implemented":"1","link":"https://www.guru99.com/installation-configuration-mongodb.html#1"},{"_id":"5b6dc74196f1e23768de5e61","name":"Mobile cloud service","description":"Decription related to mobile cloud service","implemented":"1","link":"https://cloud.oracle.com/mobile"}]
class App extends Component {
  constructor() {
    super();
    this.state = {
        apiTest: ''
    }; 
}

  render() {
    var ip = window.location.hostname;
    // alert(ip);
     if(ip=='povaas.oracledatagroup.com'){
         global.prodIp='http://129.146.98.101';
         global.prodPort='8086';
     }else if(ip=='129.146.54.182'){
         global.prodIp='http://129.146.103.103';
         global.prodPort='8000'; 
     }else{
      global.prodIp='http://129.146.98.101';
      global.prodPort='8086';
     }
    return (
      <div className="App">
       
        <RouterHeader/>
           
      </div>
    );
  }
}

export default App;
