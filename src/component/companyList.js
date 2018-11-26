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
  class ShowList extends Component { 
    constructor() {
        super();
        this.state = {
            componentData: ''
        }; 
    }
   
    componentDidMount() {
      document.getElementById("showList").classList.remove("hide");
      document.getElementById("logout").classList.remove("hide");
      var n, m = '';
      var povVariable={
        TF_user_id:localStorage.getItem("user_id"),
        TF_user_role:localStorage.getItem("user_role"),
        TF_company_ID:localStorage.getItem("COMPANY_ID")
       
     }
      axios.post(global.prodIp+':'+global.prodPort+'/company_list/',JSON.stringify(povVariable))
      .then(res => {
          var myObj = res.data;
          var n, m = '';
         // console.log(myObj.length);
          m += "<tr><th>Company Name</th><th>Action</th></tr>";
          for(n=0;n<myObj.length-1;n++){
              if(myObj[n].COMPANY_STATUS==1){
                  var Companyclass="checked";
              }else{
                var Companyclass="";  
              }
            m += '<tr><td>'+myObj[n].COMPANY_NAME+'</td><td> <label class="switchcompanyStatus switch" type="'+myObj[n].COMPANY_ID+'" alt="'+myObj[n].COMPANY_STATUS+'"><input type="checkbox" '+Companyclass+'><span class="slider round"></span></label></td><td name="User1" class="edit-company-profile " type="'+myObj[n].COMPANY_ID+'" title="Edit Company"> &#x270D; </td></tr>';
          }
          
        //   m += '<td> <label class="switchcompanyStatus"><input type="checkbox"><span class="slider round"></span></label></td><tr><td>User1</td><td><button name="User1" class="delete-profile "> &times; </button></td></tr>';
        //   m += '<tr><td>User2</td><td><button name="User1" class="delete-profile "> &times; </button></td></tr>';
        //   m += '<tr><td>User3</td><td><button name="User1" class="delete-profile "> &times; </button></td></tr>';
         
          this.setState({
              componentData: m
          })

        });
    }
    render() {
        setTimeout(function() {
            var classname = document.getElementsByClassName("switchcompanyStatus");
            var switchCompanyStatus = function() {
                var Id = this.getAttribute("type");
                var status = this.getAttribute("alt");
                var reqstatus;
                if(status==1){
                    reqstatus=0;
                }else{
                    reqstatus=1;
                }
               var reqdata = {
                   TF_VAR_ID:Id,
                    TF_VAR_Status: reqstatus,
               }
            //    axios({
            //     method: 'post',
            //     url: global.prodIp+':'+global.prodPort+'/edit_company_status/',
            //     data: JSON.stringify(reqdata)
    
            // });


            axios.post(global.prodIp+':'+global.prodPort+'/edit_company_status/', JSON.stringify(reqdata))
            .then(res => {
            if(res.data['Oracle-Error-Message']=='SUCCESS'){
                  //  alert('updated successfully');
                    window.location.href='/Company';
                }
             })
                
            };

            for (var i = 0; i < classname.length; i++) {
                classname[i].addEventListener('click', switchCompanyStatus, false);
            }
        }, 2000);


        setTimeout(function() {
            var classname = document.getElementsByClassName("edit-company-profile");
            var EditCompanyProfile = function() {
              //  alert('test');
                var Id = this.getAttribute("type");
                var status = this.getAttribute("alt");
                var Name = this.getAttribute("name");
                document.getElementById("TF_VAR_Name").value =Name;
                document.getElementById("myModal").style.display = 'block';
                document.getElementById("CreateProfile").classList.add("hide");
                document.getElementById("content_form").classList.add("hide");
                document.getElementById("StatusPage").classList.add("hide");
                document.getElementById("close").classList.remove("hide");
                document.getElementById("ConfirmBox").classList.add("hide");
                document.getElementById("SignUpProfile").classList.add("hide");
                document.getElementById("SignUpCompanyProfile").classList.remove("hide");
                
            };

            for (var i = 0; i < classname.length; i++) {
                classname[i].addEventListener('click', EditCompanyProfile, false);
            }
        }, 2000);
         setTimeout(function() {
              var classname = document.getElementsByClassName("deleteYes");
              var myFunction = function() {
                  var attribute = this.getAttribute("type");
                 // if(attribute==='column red'){
                   // var el = document.getElementById('content-box').getElementsByTagName('button');
                    document.getElementById("myModal").style.display = 'block';
                    document.getElementById("hiddenData").value =attribute;
                    document.getElementById("ConfirmBox").classList.remove("hide");
                    document.getElementById("content_form").classList.add("hide");
                    document.getElementById("StatusPage").classList.add("hide");
                    document.getElementById("close").classList.remove("hide");
                 // }
                  
              };

              for (var i = 0; i < classname.length; i++) {
                  classname[i].addEventListener('click', myFunction, false);
              }
          }, 2000);
          setTimeout(function() {
            var classname = document.getElementsByClassName("edit-profile");
            

            var createProfilePop = function() {
              // alert('create Profile');
              var Name = this.getAttribute("name");
                document.getElementById("TF_VAR_Name").value =Name;
                document.getElementById("myModal").style.display = 'block';
                document.getElementById("CreateProfile").classList.remove("hide");
                document.getElementById("content_form").classList.add("hide");
                document.getElementById("StatusPage").classList.add("hide");
                document.getElementById("close").classList.remove("hide");
                document.getElementById("ConfirmBox").classList.add("hide");
               
                
            };

            for (var i = 0; i < classname.length; i++) {
                classname[i].addEventListener('click', createProfilePop, false);
            }
        }, 2000);
        

        function signUpCick(){
            //alert('1');
            document.getElementById("myModal").style.display = 'block';
            document.getElementById("CreateProfile").classList.add("hide");
            document.getElementById("content_form").classList.add("hide");
            document.getElementById("StatusPage").classList.add("hide");
            document.getElementById("close").classList.remove("hide");
            document.getElementById("ConfirmBox").classList.add("hide");
            document.getElementById("SignUpProfile").classList.remove("hide");

        }
        function signUpCompanyCick(){
            //alert('1');
            document.getElementById("myModal").style.display = 'block';
            document.getElementById("CreateProfile").classList.add("hide");
            document.getElementById("content_form").classList.add("hide");
            document.getElementById("StatusPage").classList.add("hide");
            document.getElementById("close").classList.remove("hide");
            document.getElementById("ConfirmBox").classList.add("hide");
            document.getElementById("SignUpProfile").classList.add("hide");
            document.getElementById("SignUpCompanyProfile").classList.remove("hide");

        }
             return (
                <div>
                    <div className="userProfilestruc" >
                    <span  onClick={signUpCompanyCick}>
                       Create Company
                    </span> &nbsp;
                    
                    </div>
                    <div className="listingContent">
                        <table dangerouslySetInnerHTML={ { __html:  this.state.componentData } }>
                        
                        
                        </table>
                    </div>
                 </div>
               
            );
            }
            
        }
        
export default ShowList;
  

  