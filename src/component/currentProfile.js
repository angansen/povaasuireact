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
  class CurrentProfileList extends Component { 
    constructor() {
        super();
        this.state = {
            componentData: ''
        }; 
    }
   
    componentDidMount() {
      document.getElementById("logout").classList.remove("hide");

      var povVariable={
        TF_user_id:localStorage.getItem("user_id"),
        TF_user_listby:"Single"
       
     }
      axios.post(global.prodIp+':'+global.prodPort+'/user_list/',JSON.stringify(povVariable))
      .then(res => {
          var myObj = res.data;
          var n, m = '';
          console.log(myObj.length);
          if(myObj.length>0){
           
          var m="<tr><th>Name</th><th>EmailId</th><th>Role</th><th>CompanyName</th><th>Action</th></tr>";
          for (var n=0;n<=myObj.length-1;n++) {
            var role="";
            if(myObj[n].USER_ROLE==0){
              role="super Admin";
             }
            if(myObj[n].USER_ROLE==1){
                role="Admin";
            }
            else if(myObj[n].USER_ROLE==2){
              role="User";
            }
            if(myObj[n].USERNAME == localStorage.getItem("user_name")){
                var status="Same";
            }else{
                var status="notSame";
            }
            m += '<tr><td>'+myObj[n].USERNAME+'</td><td>'+myObj[n].EMAIL+'</td><td>'+role+'</td><td>'+myObj[n].COMPANY_NAME+'</td><td class="EditCP" data-id="'+myObj[n].EMAIL+'" data-title="'+myObj[n].PASSWORD+'" type="'+myObj[n].USERNAME+'" data-type="'+status+'" data-num="'+myObj[n].USER_ID+'" title="Edit profile">&#x270D;</td></tr>';

          }

        }else{
            m += '<tr><td class="word-wrap text-center">No record yet.</td></tr>';
        }
          this.setState({
              componentData: m
          })
      })


    }
    render() {
        //document.getElementById("logout").classList.remove("hide");
        var sessionName=localStorage.getItem("user_name");
        var user_role=localStorage.getItem("user_role");
        
        if(user_role==0){
            var role='Super Admin';
        }else if(user_role==1){
          var role='Admin';
       }else if(user_role==2){
          var role='User';
       }
       // var password=localStorage.getItem("password");
        //var email=localStorage.getItem("EMAIL");
         setTimeout(function() {
            
              var classname = document.getElementsByClassName("EditCP");
              var myFunction = function() {
                  
                 var userName = this.getAttribute("type");
                var propID=this.getAttribute("data-num");
                 var password = this.getAttribute("data-title");
                 var Email = this.getAttribute("data-id");
                 var ProfileStatus = this.getAttribute("data-type");
                 document.getElementById("myModal").style.display = 'block';
                 document.getElementById("content_form").classList.add("hide");
                  document.getElementById("EditProfile").classList.remove('hide');
                  document.getElementById("TF_VAR_edit_Name").value=userName;
                  document.getElementById("usr_profile_edit_ID").value=propID;
                  document.getElementById("usr_profile_edit_Email").value=Email;
                  document.getElementById("usr_profile_edit_ProfileStatus").value=ProfileStatus;
                  document.getElementById("usr_profile_edit_Password").value=password;
                  document.getElementById("usr_profile_edit_CPassword").value=password;
                  document.getElementById("close").classList.remove("hide");
                
              };

              for (var i = 0; i < classname.length; i++) {
                  classname[i].addEventListener('click', myFunction, false);
              }
          }, 2000);
      
             return (
                 <div>
                    
                    <div className="listingContent">
                    <table dangerouslySetInnerHTML={ { __html:  this.state.componentData } }></table>
                    </div>
                </div>
               
            );
            }
            
        }
        
export default CurrentProfileList;
  

  