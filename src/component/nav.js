// MyBarChart.js
import React from 'react';
import { Link } from "react-router-dom";

class Tab extends React.Component {
   
   
    render() {
        var valSelected=window.location.href;
        var filterTarget=valSelected.split("/");
        var filerTargertnew=filterTarget[filterTarget.length-1];
        var sessionName=localStorage.getItem("user_name");
        setTimeout(function() {
        if(((JSON.stringify(sessionName)) != "null")){
            document.getElementById('dashPova').classList.remove('hide');
            document.getElementById('viewProfileUser').classList.remove('hide');
        }else{
          document.getElementById('dashPova').classList.add('hide');
          document.getElementById('viewProfileUser').classList.add('hide');
        }
      }, 400);
        return (
            <ul class="NavBar" id="showList">
            <Link to="/">
                <li className={filerTargertnew=="" ? "active" : ""} >
                  Home
                </li>
            </Link>
              <Link id="dashPova" className="hide" to="/dash">
                <li  className={filerTargertnew=="dash" ? "active" :""} >
                  Dashboard
                </li>
              </Link>
              <Link id="viewProfileUser" className="hide pull-right" to="/viewProfile">
                <li  className={filerTargertnew=="viewProfile" ? "active" :""} >
                  View Profile
                </li>
              </Link>
              
            </ul>
      
        );
    }
}
export default Tab;