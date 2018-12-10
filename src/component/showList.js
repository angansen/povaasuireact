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
      var povVariable={
        TF_user_id:localStorage.getItem("user_id"),
        TF_user_role:localStorage.getItem("user_role"),
        TF_company_ID:localStorage.getItem("COMPANY_ID")
       
     }
      axios.post(global.prodIp+':'+global.prodPort+'/dashboard/',JSON.stringify(povVariable))
      .then(res => {
          console.log(res.status);
          if(res.status==401){
            localStorage.clear();
            window.location.href='/';
          }
          var myObj = res.data;
          var n, m = '';
          console.log(myObj);
          if(myObj.length>0){
          m= "<tr><th>Instance Title</th><th>Solution Name</th><th>Instance IP</th><th>Instance Count</th><th>Status</th><th>Action</th></tr>";
          for (var n=0;n<=myObj.length-1;n++) {
            //alert(myObj[n].TF_VAR_Ip);&& myObj[n].TF_VAR_StatusMsg=='RUNNING'
            // if( myObj[n].TF_VAR_StatusMsg=='RUNNING'){myObj[n].TF_VAR_HTTPStatus=='1'
            //     var actionBtn='<a href="http://'+myObj[n].TF_VAR_Ip+':9160/notebooks/EDA.ipynb" target="_blank"><button  class="launchbtn Yes"> Launch </button></a>&nbsp;&nbsp;<button class="deletebtn No deleteYes" type="'+myObj[n].TF_VAR_InstanceTitle+'"> Delete </button>';
            // }
            if(myObj[n].TF_VAR_Ip!='' ){
                    if(myObj[n].TF_VAR_StatusMsg=='RUNNING'){
                        if(myObj[n].TF_Var_SolutionID=="8"){
                        var actionBtn='<button  class="launchbtnADWC Yes" alt="'+myObj[n].TF_Var_SolutionID+'"> Launch </button>&nbsp;&nbsp;<button class="deletebtn No deleteYes" type="'+myObj[n].TF_VAR_id+'" alt="'+myObj[n].TF_Var_SolutionID+'"> Delete </button>';
                        }else{
                            var actionBtn='<a href="'+myObj[n].TF_VAR_HTTPPath+'" target="_blank"><button  class="launchbtn Yes"> Launch </button></a>&nbsp;&nbsp;<button class="deletebtn No deleteYes" type="'+myObj[n].TF_VAR_id+'" alt="'+myObj[n].TF_Var_SolutionID+'"> Delete </button>';
                        }                
                    
                    }else{
                        var actionBtn = '<button class="inprogress" title="disabled"> Launch </button>&nbsp;&nbsp;<button class="deletebtn  No deleteYes"  type="'+myObj[n].TF_VAR_id+'" alt="'+myObj[n].TF_Var_SolutionID+'"> Delete </button><br/><small>Jupiter notebook is not ready yet</small>';  
                    }
            }
            else if(myObj[n].TF_VAR_Ip===''){
                              var actionBtn = '<button class="inprogress" title="disabled"> Launch </button>&nbsp;&nbsp;<button class="deletebtn " title="disabled" type="'+myObj[n].TF_VAR_id+'" alt="'+myObj[n].TF_Var_SolutionID+'"> Delete </button>';

            }
            else{
               // if(myObj[n].TF_VAR_StatusMsg=='TERMINATING'){
                                var actionBtn = '<button class="inprogress" title="disabled"> Launch </button>&nbsp;&nbsp;<button class="deletebtn " title="disabled" type="'+myObj[n].TF_VAR_id+'" alt="'+myObj[n].TF_Var_SolutionID+'"> Delete </button>'; 
                      //      }
            }
           var Count= "";
           //alert(myObj[n].TF_Var_InstanceCount);
           if(myObj[n].TF_Var_InstanceCount==undefined){
            Count=0; 
           }else{
            Count=myObj[n].TF_Var_InstanceCount;
              
           }
            var SolutionName=myObj[n].TF_VAR_Solution;
            if(myObj[n].TF_VAR_SSH_Ip!=undefined && myObj[n].TF_VAR_SSH_Ip!=''){
                if(myObj[n].TF_VAR_Ip!=''){
                    var Ip= '<small>Master IP: </small>'+myObj[n].TF_VAR_Ip+'<br/><small>SSH IP: </small>'+myObj[n].TF_VAR_SSH_Ip;
                }else{
                    var Ip= '<small>SSH IP: </small>'+myObj[n].TF_VAR_SSH_Ip;
                }
            }else if(myObj[n].TF_VAR_Ip!=undefined && myObj[n].TF_VAR_Ip!=''){
                var Ip= '<small>Master IP: </small>'+myObj[n].TF_VAR_Ip;
            }else{
                var Ip='-';
            }
           
          
              m += '<tr><td class="word-wrap">'+myObj[n].TF_VAR_InstanceTitle+'</td><td>'+SolutionName+'</td><td>'+Ip+'</td><td class="text-center">'+Count+'</td><td>'+myObj[n].TF_VAR_StatusMsg+'</td><td>'+actionBtn+'</td></tr>';

          }

        }else{
            m += '<tr><td class="word-wrap text-center">No Instance created yet.</td></tr>';
        }
          this.setState({
              componentData: m
          })
      })
    

    }
    render() {
        
        setTimeout(function() {
        if(localStorage.getItem("user_role")==0){
            document.getElementById('companyList').classList.remove('hide'); 
            document.getElementById('userList').classList.remove('hide');
         }
        else if(localStorage.getItem("user_role")==1){
            // document.getElementById('companyList').classList.remove('hide');
                document.getElementById('userList').classList.remove('hide');
        }else{
            document.getElementById('companyList').classList.add('hide');
            document.getElementById('userList').classList.add('hide'); 
        }
    }, 500);
         setTimeout(function() {
            
              var classname = document.getElementsByClassName("deleteYes");
              var myFunction = function() {
                  var attribute = this.getAttribute("type");
                  var ClouteraAttribute = this.getAttribute("alt");
                 // if(attribute==='column red'){
                   // var el = document.getElementById('content-box').getElementsByTagName('button');
                    document.getElementById("myModal").style.display = 'block';
                    document.getElementById("hiddenData").value =attribute;
                    document.getElementById("SparkhiddenId").value =ClouteraAttribute;
                    document.getElementById("ConfirmBox").classList.remove("hide");
                    document.getElementById("content_form").classList.add("hide");
                    document.getElementById("StatusPage").classList.add("hide");
                    document.getElementById("close").classList.remove("hide");
                 // }
                  
              };

              for (var i = 0; i < classname.length; i++) {
                  classname[i].addEventListener('click', myFunction, false);
              }
          }, 400);
          setTimeout(function() {
            var classname = document.getElementsByClassName("launchbtnADWC");
           
            var launchbtnADWC = function() {
                    document.getElementById("myModal").style.display = 'block';
                    document.getElementById("ADWC_LAunch_form").classList.remove("hide");
                    var ClouteraAttribute = this.getAttribute("alt");
                    document.getElementById("PovaasId").value =ClouteraAttribute;
                    axios.post(global.prodIp+':'+global.prodPort+'/get_object_store_list/')
                    .then(res => {
                        var myObj = res.data;
                        var j, x = '',y='',k;
                       //console.log(myObj.length);
                       x='<option value="">Select</option>';
                        for (j=0;j< myObj.length; j++) {
                           if(myObj[j].etag){
                            //<img src='https://cloud.oracle.com/opc/iaas/images/Jenkins-Logo-185x103.jpg'/>
                            x += '<option value="'+myObj[j].etag+'Name'+myObj[j].name+'">'+myObj[j].name+'</option>';
                           }
                        }
                       
                        document.getElementById("Osbpath").innerHTML =x;
                        
                    })
                    document.getElementById("ConfirmBox").classList.add("hide");
                    document.getElementById("content_form").classList.add("hide");
                    document.getElementById("StatusPage").classList.add("hide");
                    document.getElementById("close").classList.remove("hide");
                
            };

            for (var i = 0; i < classname.length; i++) {
                classname[i].addEventListener('click', launchbtnADWC, false);
            }
        }, 400);

        var handleRefresh =function(){
            window.location.href="";
        }

             return (
                 <div>
                    
                    <div className="userProfilestruc" >
                            <Link  to="/Company" className="hide" id="companyList">
                                Company List
                            </Link>
                            
                            <Link  to="/Profile" className="hide" id="userList">
                                 User List
                            </Link>
                           <Link  to="/dash" name="refresh" onClick={handleRefresh}>Refresh</Link>
                           
                            
                        </div>
                    <div className="listingContent">
                        <table dangerouslySetInnerHTML={ { __html:  this.state.componentData } }></table>
                    </div>
                </div>
               
            );
            }
            
        }
        
export default ShowList;
  

  