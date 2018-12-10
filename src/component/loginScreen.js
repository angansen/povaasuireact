// MyBarChart.js
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import Nav from "./nav";
import axios from 'axios';
class loginScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        LoginSuccess: '',
       
    };
    }
    componentDidMount() {

        var userName= localStorage.getItem("username");
         if(userName!=undefined){
            localStorage.setItem("user_name", userName);
            this.setState({ LoginSuccess: true });
    
         }
           

    }
    


    
    Userlogin = () => {

        var username=document.getElementById('uname').value;
        var psw=document.getElementById('psw').value;
        if(username==''){
            alert('Please enter UserName');
            document.getElementById('uname').focus();
            return false;
        }else if(psw==''){
            alert('Please enter Password');
            document.getElementById('psw').focus();
            return false;
        }
        else{
            var userVariable={
                TF_VAR_user_name:username,
                TF_VAR_password:psw
            }
            axios.post(global.prodIp+':'+global.prodPort+'/login_details/',JSON.stringify(userVariable))
            .then(response => {
              var json = response.data;
              
                    if(json[0]){
                          
                           if (typeof(Storage) !== "undefined") {
                            if(userName!=undefined){
                            }
                            else{
                               var userName= localStorage.setItem("username", document.getElementById('uname').value);
                             //  var password= localStorage.setItem("password", document.getElementById('psw').value); 
                               localStorage.setItem("user_name", document.getElementById('uname').value);
                               localStorage.setItem("user_role", json[0].USER_ROLE);
                               localStorage.setItem("user_id", json[0].USER_ID);
                               localStorage.setItem("COMPANY_ID", json[0].COMPANY_ID);
                               localStorage.setItem("COMPANY_NAME", json[0].COMPANY_NAME);
                               localStorage.setItem("USER_PHONE", json[0].USER_PHONE);
                               
                               localStorage.setItem("EMAIL", json[0].EMAIL);
                               
                           }
                       }
                         this.setState({ LoginSuccess: true });
                    }
                    
                    else{
                        alert('You are not authorized user, Please contact your administrator.');
                        return false;
                    }
                    
                    
                 
      
            
          }).catch((error) => {
            alert(error.message);
              //alert('Please try again you are not authorized user');
              // console.log('Error', error.message);
              return false;
          })
        }
      //  this.setState({ the_message: value, btn_nav:value });

      }
      
     
   
    render() {
        if(this.state.LoginSuccess){
            return <Redirect push to="/" />; 
        }
       
        return (
            <div class="container loginScreen ">
               
            <div  class="loginDiv">
            <label for="uname"><b>Username</b></label>
            <input type="text" id="uname" placeholder="Enter Username" name="uname" required/>
        
            <label for="psw"><b>Password</b></label>
            <input type="password" id="psw" placeholder="Enter Password" name="psw" required/>
                
            <button type="submit" onClick={this.Userlogin}>Login</button>
          
            </div>
          </div>
        );
    }
}
export default loginScreen;