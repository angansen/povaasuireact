import React, {
    Component
  } from 'react';
  import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
  } from "react-router-dom";
  import axios from 'axios';
  import Logout from './logout';
  class logoHeader extends Component {
  
    constructor() {
        super();
        this.state = {
            loggedInUser:  localStorage.getItem("user_name")
        };
       
  
    }
   
    componentDidMount() {
  
    }
  
    render() {
       // alert(sessionStorage.getItem("user_name"));
        var sessionName=localStorage.getItem("user_name");
       
       //alert(sessionName);
        setTimeout(function(){ 
          //  alert(typeof(JSON.stringify(sessionName))+"-"+typeof("null"));
         // alert(JSON.stringify(sessionName)==null+"");
             if(((JSON.stringify(sessionName)) != "null")){
                
                document.getElementById("Login").classList.add("hide");
                document.getElementById("LoggedIn").classList.remove("hide");
        }else{
           
            document.getElementById("Login").classList.remove("hide");
            document.getElementById("LoggedIn").classList.add("hide");
        } }, 500);

       
        // if((sessionStorage.getItem("user_name"))!= null){
        //     alert('1');
        //    document.getElementById("Login").classList.add("hide");
        // //     document.getElementById("LoggedIn").classList.remove("hide");
        // }else{
        //     alert('2');
        // //     document.getElementById("Login").classList.remove("hide");
        // //     document.getElementById("LoggedIn").classList.add("hide");
        // }
  
       return (
        <div class="LogoHeader">
        <Link to="/"><span>POVaaS</span></Link>
        <Link to="/login"><font id="Login" className="rightsec-pull-right">Login</font></Link>
        
        <font id="LoggedIn" className="rightsec-pull-right hide"> <span>Welcome {sessionName},</span> <Logout/></font>
     </div> 
            
          
        );
      }
    }
    
    export default logoHeader;
    
  
    