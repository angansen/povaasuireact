import React, { Component } from 'react';
import ReactSignupLoginComponent from 'react-signup-login-component';
import axios from 'axios';
const LoginPage = (props) => {
        var userName= sessionStorage.getItem("username");
        var password= sessionStorage.getItem("password");
       
        var ip = window.location.hostname;
       // alert(ip);
        if(ip=='povaas.oracledatagroup.com'){
            global.prodIp='http://129.146.98.101';
            global.prodPort='8086';
        }else if(ip=='129.146.54.182'){
            global.prodIp='http://129.146.103.103';
            global.prodPort='8000'; 
        }else{
            global.prodIp='http://129.146.103.103';
            global.prodPort='8000'; 
        }
        

         if(userName!=undefined && password!=undefined){
            global.username=userName; 
            setTimeout(function(){ 
            document.getElementById("loginForm").classList.add("hide");
            document.getElementById("searchPanel").classList.remove("hide");
            document.getElementById("logout").classList.remove("hide");
            document.getElementById("showList").classList.remove("hide");
        }, 10);
            
        
    }
    const loginWasClickedCallback = (data) => {
        if(userName==undefined && password==undefined){
            var usr=data.username;
            var pwd=data.password;
        }
        var userVariable={
            TF_VAR_user_name:data.username,
            TF_VAR_password:data.password
        }
        //alert(global.prodIp+':'+global.prodPort);
    axios.post(global.prodIp+':'+global.prodPort+'/login_details/',JSON.stringify(userVariable))
      .then(response => {
        var json = response.data;
        //console.log(json[0]);
          if(json[0]){
                document.getElementById("loginForm").classList.add("hide");
                document.getElementById("searchPanel").classList.remove("hide");
                document.getElementById("logout").classList.remove("hide");
                document.getElementById("showList").classList.remove("hide");
            if (typeof(Storage) !== "undefined") {
                 if(userName!=undefined && password!=undefined){
                 }
                 else{
                    var userName= sessionStorage.setItem("username", data.username);
                    var password= sessionStorage.setItem("password", data.password);    
                    global.username=data.username; 
                    alert(global.username);
                }
            } 

          }else{
            alert('Please try again you are not authorized user');
            return false;
          }  
      });
      
    };
    
    return (
        <div id="loginForm">
            <ReactSignupLoginComponent
                title="Admin"
                handleLogin={loginWasClickedCallback}
            />
        </div>
    );
};
 
export default LoginPage;

  