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
class ContentBox extends Component {

  constructor() {
      super();
      this.state = {
          componentData: '',
          loggedinStatus:''
      };

  }

  componentDidMount() {

      axios.post(global.prodIp+':'+global.prodPort+'/get_povaas_solutions/')
          .then(res => {
              var myObj = res.data;
              var j, x = '';
            //  console.log(myObj.length);
              for (j in myObj) {
                var sessionName=localStorage.getItem("user_name");
                var img="";
                if(myObj[j].IMAGE_PATH==null){
                    img="deafult-images.png";
                }else{
                    img=myObj[j].IMAGE_PATH;
                }
                  if(((JSON.stringify(sessionName)) != "null")){
                     // document.getElementById('dashPova').classList.remove('hide');
                     
                    if (myObj[j].IMPLEMENTED === 0) {
                        var cl = "column blue";
                        var msg = '<b class=" gray-light">Coming Soon.....</b>';
                        var btn="" + msg + "";
                    } else {
                        var cl = "column red";
                       // msg = "<b class='bord-cl mt20  btnClick'>Click Here &rarr;</b>";
                       var msg="";
                       var btn=msg;
                       
                    }
                    x += '<div class="' + cl + '" type="'+myObj[j].ID+'" >' +
                    "<div class='inline imagebox'><img src='./img/"+img+"'/></div><div class='inline'><h3>" + myObj[j].NAME + "</h3>" +
                      "<p class='gray-light'>" + myObj[j].DESCRIPTION + "</p>" + btn + "</div></div>";

                  }else{
                    cl = "logincolumn red";
                    var msg = "<a href='/login'><b class='bord-cl  loginbtn'>Login &rarr;</b></a>"; 
                   var btn="<p class='btn-align'>" + msg + "</p>";



                   
                  // btn="";
                    //document.getElementById('dashPova').classList.add('hide');
                    x += '<div class="' + cl + '" type="'+myObj[j].ID+'" >' +
                    "<div class='inline imagebox'><img src='./img/"+img+"'/></div><div class='inline'><h3>" + myObj[j].NAME + "</h3>" +
                      "<p class='gray-light'>" + myObj[j].DESCRIPTION + "</p>" + btn + "</div></div>";

                  }
                  
                  //<img src='https://cloud.oracle.com/opc/iaas/images/Jenkins-Logo-185x103.jpg'/>
                 
              }
              this.setState({
                  componentData: x
              })
          })
  }

  render() {
    //   var loggedinStatus;
    //   if(loggedinStatus=='true'){
    //     return <Redirect push to="/login" />; 
    //   }
    // setTimeout(function() {
    //     var loginclassname = document.getElementsByClassName("loginbtn");
    //     var loginFunction = function() {
           
    //         loggedinStatus='true';
    //     }
    //     for (var i = 0; i < loginclassname.length; i++) {
    //         loginclassname[i].addEventListener('click', loginFunction, false);
    //     }
    // }, 3000);

          setTimeout(function() {
              var classname = document.getElementsByClassName("column");
              var myFunction = function() {
                  var attribute = this.getAttribute("class");
                  var Id = this.getAttribute("type");
                  if(attribute==='column red'){
                    var el = document.getElementById('content-box').getElementsByTagName('button');
                    document.getElementById("myModal").style.display = 'block';
                    document.getElementById('PovaasId').value=Id;
                    if(Id=="1"){
                        document.getElementById("content_form").classList.remove("hide");
                        document.getElementById("haddob_form").classList.add("hide"); 
                        document.getElementById("adwc_form").classList.add("hide");
                    }else if(Id=="8"){
                        document.getElementById("content_form").classList.add("hide");
                        document.getElementById("haddob_form").classList.add("hide"); 
                        document.getElementById("adwc_form").classList.remove("hide");

                    }else{
                        document.getElementById("content_form").classList.add("hide");
                        document.getElementById("haddob_form").classList.remove("hide"); 
                        document.getElementById("adwc_form").classList.add("hide");
                    }
                   
                  }
                  
              };

              for (var i = 0; i < classname.length; i++) {
                  classname[i].addEventListener('click', myFunction, false);
              }
          }, 3000);
     return (
        <div id="content-box">
          <div id="searchContent" class="searchContent" dangerouslySetInnerHTML={ { __html:  this.state.componentData } }></div>
          
        </div>
          
        
      );
    }
  }
  
  export default ContentBox;
  

  