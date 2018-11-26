import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-responsive-modal';
//aaaa
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            componentData: '',
            shapeData: '',
            redirect:''
        };


    }
    
    
    handleOnClickHadoob = () => {
        var TF_Var_Instance_Title_Hadoob=document.getElementById("TF_Var_Instance_Title_Hadoob").value;
        var masterShape=document.getElementById("TF_Var_MASTER_Shape").value;
        var Master_instance=document.getElementById("TF_Var_Master_instance").value;
        var TF_Var_BASTON_Shape=document.getElementById("TF_Var_BASTON_Shape").value;
        var TF_Var_BASTON_Instance=document.getElementById("TF_Var_BASTON_Instance").innerHTML;
        var TF_Var_UTILITY_Shape=document.getElementById("TF_Var_UTILITY_Shape").innerHTML;
        var TF_Var_UTILITY_Instance=document.getElementById("TF_Var_UTILITY_Instance").innerHTML;
        var TF_Var_WORKER_Shape=document.getElementById("TF_Var_WORKER_Shape").value;
        var TF_Var_WORKER_Instance=document.getElementById("TF_Var_WORKER_Instance").value;
        if(TF_Var_Instance_Title_Hadoob==''){
            alert('Please Enter Title');
            document.getElementById("TF_Var_Instance_Title_Hadoob").focus();
            return false;
        }
        else if ( TF_Var_Instance_Title_Hadoob.indexOf(' ') !== -1) {
            alert("Spaces in the Inastance name is not allowed");
            document.getElementById("TF_VAR_InstanceTitle").focus();
            return false;
        }
        else if(masterShape==0){
            alert('Please Select Master Shape');
            document.getElementById("TF_Var_MASTER_Shape").focus();
            return false;
        }else if(Master_instance==0){
            alert('Please Select Master Instance');
            document.getElementById("TF_Var_Master_instance").focus();
            return false;
        }else if(TF_Var_BASTON_Shape==0){
            alert('Please Select BASTION Shape');
            document.getElementById("TF_Var_BASTON_Shape").focus();
            return false;
        }
       
     
        else if(TF_Var_WORKER_Shape==0){
            alert('Please Select Worker Shape');
            document.getElementById("TF_Var_WORKER_Shape").focus();
            return false;
        }else if(TF_Var_WORKER_Instance==0){
            alert('Please Select Worker Instance');
            document.getElementById("TF_Var_WORKER_Instance").focus();
            return false;
        }else{
            var count=parseInt(document.getElementById("TF_Var_WORKER_Instance").value) + parseInt(document.getElementById("TF_Var_Master_instance").value) +2;

        var reqdata = {
            TF_VAR_tenancy_ocid: "ocidv1:tenancy:oc1:phx:1458169512456:aaaaaaaaqftfib54gijpqwckj3uvudp234",
            TF_VAR_user_ocid: "ocid1.user.oc1..aaaaaaaarzwt3kq7z7cjs4yr3hwlgeqf2c6lcfzq2ai2un2zsfcjbnlm2knq",
            TF_VAR_fingerprint: "73:06:26:e3:c9:eb:fd:aa:e0:ba:62:86:e2:8d:7c:57",
            TF_VAR_private_key_path: "/home/opc/Key/oci_api_key.pem",
            TF_VAR_region: "us-phoenix-1",
            TF_VAR_compartment_ocid: "ocid1.compartment.oc1..aaaaaaaa7el6uxvuyatge6nnsbox6ufirjeyecxvrlgflxmm4no5is55o6ua",
            TF_VAR_ssh_public_key: "/home/opc/Key/BDDS_Key.pub",
            TF_VAR_ssh_private_key: "/home/opc/Key/BDDS_Key",
            TF_VAR_image_ocid: "ocid1.image.oc1.phx.aaaaaaaazs4djfpanpbh7zwqjqe4enku3juqo6dntkj66u2vjx4p2k2oj5cq",
            TF_VAR_AD: "2",
            TF_VAR_InstanceTitle: document.getElementById("TF_Var_Instance_Title_Hadoob").value,
            TF_VAR_UserName: sessionStorage.getItem("username"),
            TF_VAR_MasterInstanceShape:document.getElementById("TF_Var_MASTER_Shape").value,
            TF_VAR_BastionInstanceShape:document.getElementById("TF_Var_BASTON_Shape").value,
            TF_VAR_WorkerInstanceShape:document.getElementById("TF_Var_WORKER_Shape").value,
            TF_VAR_MasterNodeCount:document.getElementById("TF_Var_Master_instance").value,
            TF_VAR_nodecount:document.getElementById("TF_Var_WORKER_Instance").value,
            TF_Var_SolutionID:document.getElementById('PovaasId').value,
            TF_Var_InstanceCount:count+""
                  

        };
        //console.log(JSON.stringify(reqdata));
        axios({
            method: 'post',
            url: global.prodIp+':'+global.prodPort+'/createclouderadev/',
            data: JSON.stringify(reqdata)

        });
        this.setState({ redirect: true });
    }

    }

    handleOnSwitch =() => {
        var masterSahpeValue=document.getElementById("TF_Var_MASTER_Shape").value;
        var TF_Var_UTILITY_ShapeValue=document.getElementById('TF_Var_UTILITY_Shape').innerHTML=masterSahpeValue;
        document.getElementById('TF_Var_UTILITY_Instance').innerHTML=1;
    }

    handleOnClickCompany =() => {
        var companyname = document.getElementById("companyName").value;
        if(companyname==''){
            alert('please enter Company Name');
            document.getElementById("companyName").focus();
            return false;
        }
        var companyata = {
            TF_Company_Name: companyname
         }
        //  axios({
        //     method: 'post',
        //     url: 'http://129.146.98.101:8086/company_validation/',
        //     data: JSON.stringify(companyata)

        // });
        axios.post(global.prodIp+':'+global.prodPort+'/company_validation/', JSON.stringify(companyata))
        .then(res => {
           console.log(res.data["Oracle-Error-Message"]);

           if(res.data["Oracle-Error-Message"]=="FAILURE"){
                alert('Already existed');
                document.getElementById('SignUpCompanyProfile').classList.add('hide');
                document.getElementById("myModal").style.display = 'none';
           }
         else{
            alert('created successfully');
            document.getElementById('SignUpCompanyProfile').classList.add('hide');
            document.getElementById("myModal").style.display = 'none';
         }
            

        })


    }
    handleOnClickUserP =() => {
        var usrnm = document.getElementById("usrnm").value;
        var usremail = document.getElementById("usremail").value;
        var usrpassword = document.getElementById("usrpassword").value;
        if(usrnm==''){
            alert('Please Enter UserName');
            document.getElementById("usrnm").value();
            return false;
        }
        if(usremail==''){
            alert('Please Enter Email');
            document.getElementById("usremail").value();
            return false;
        }
        else if(usremail!=''){
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(usremail)){
     
           }else{
             alert('Please Enter Valid EmailId');
             document.getElementById('UserEmail').focus();
             return false;
           }
         }
        if(usrpassword==''){
            alert('Please Enter Password');
            document.getElementById("usrpassword").value();
            return false;
        }
        var UserCreation = {
            TF_User: usrnm,
            TF_Email: usremail,
            TF_usrpassword: usrpassword,
            TF_user_company: '',
            TF_user_role: ''

         }
         axios({
            method: 'post',
            url: global.prodIp+':'+global.prodPort+'/save_profile/',
            data: JSON.stringify(UserCreation)

        });



    }

    handleOnUserProfileEditClick= () => {
        if(document.getElementById('TF_VAR_edit_Name').value==''){
            alert("Please enter Name");
            document.getElementById('TF_VAR_edit_Name').focus();
            return false;
        }
        else if(document.getElementById('usr_profile_edit_Email').value==""){
            alert("Please enter Email");
            document.getElementById('usr_profile_edit_Email').focus();
            return false;
        }
       
        else if(document.getElementById('usr_profile_edit_Password').value==""){
            alert("Please enter Password");
            document.getElementById('usr_profile_edit_Password').focus();
            return false;
        }
        else if(document.getElementById('usr_profile_edit_CPassword').value==""){
            alert("Please enter confirm Password");
            document.getElementById('usr_profile_edit_CPassword').focus();
            return false;
        }
        else if(document.getElementById('usr_profile_edit_Password').value!=document.getElementById('usr_profile_edit_CPassword').value){
            alert("Password is not matching");
            document.getElementById('usr_profile_edit_CPassword').focus();
            return false;
        }else{
            var UserprofileMap = {
                TF_User_Id:document.getElementById("usr_profile_edit_ID").value,
                TF_User: document.getElementById('TF_VAR_edit_Name').value,
                TF_Email: document.getElementById('usr_profile_edit_Email').value,
                TF_usrpassword: document.getElementById('usr_profile_edit_Password').value ,
                TF_Status: 'Edit'
             }
            axios.post(global.prodIp+':'+global.prodPort+'/save_profile/', JSON.stringify(UserprofileMap))
            .then(res => {
                if(res.data['Oracle-Error-Message']=='SUCCESS'){
                    alert('Updated successfully');
                    document.getElementById('CreateProfile').classList.add('hide');
                    document.getElementById("myModal").style.display = 'none';
                   // alert(document.getElementById('usr_profile_edit_Prop').value);
                    if(document.getElementById('usr_profile_edit_Prop').value==""){
                        //alert('1');
                        localStorage.setItem("user_name", document.getElementById('TF_VAR_edit_Name').value);
                        window.location.href='/viewProfile';
                    }else{
                        //alert(document.getElementById('usr_profile_edit_ProfileStatus').value);
                        if(document.getElementById('usr_profile_edit_ProfileStatus').value=="Same")
                        {
                            localStorage.setItem("user_name", document.getElementById('TF_VAR_edit_Name').value);   
                           window.location.href='/Profile';
                        }
                       else{
                          window.location.href='/Profile';
                       }
                    }
                }else{
                    alert('Already existed');
                    document.getElementById('CreateProfile').classList.add('hide');
                    document.getElementById("myModal").style.display = 'none';
                }
                
                
              
    
            })
        }
        



    }





    handleOnUserProfileClick= () => {
        if(document.getElementById('TF_VAR_Name').value==''){
            alert("Please enter Name");
            document.getElementById('TF_VAR_Name').focus();
            return false;
        }
        else if(document.getElementById('usr_profile_Email').value==""){
            alert("Please enter Email");
            document.getElementById('usr_profile_Email').focus();
            return false;
        }
        else if(document.getElementById('usr_profile_Password').value==""){
            alert("Please enter Password");
            document.getElementById('usr_profile_Password').focus();
            return false;
        }
        else if(document.getElementById('usr_profile_Company').value==""){
            alert("Please select Company");
            document.getElementById('usr_profile_Company').focus();
            return false;
        }
        else if(document.getElementById('usr_profile_Role').value==""){
            alert("Please select Role");
            document.getElementById('usr_profile_Role').focus();
            return false;
        }
        else if(document.getElementById('TF_VAR_usr_Phone').value==""){
            alert("Please select Phone");
            document.getElementById('TF_VAR_usr_Phone').focus();
            return false;
        }
        else if(document.getElementById('TF_VAR_Idle_Time').value==""){
            alert("Please select Idle Time");
            document.getElementById('TF_VAR_Idle_Time').focus();
            return false;
        }else{
            var UserprofileMap = {
                TF_User: document.getElementById('TF_VAR_Name').value,
                TF_Email: document.getElementById('usr_profile_Email').value,
                TF_usrpassword: document.getElementById('usr_profile_Password').value,
                TF_user_company: document.getElementById('usr_profile_Company').value,
                TF_user_role: document.getElementById('usr_profile_Role').value,
                TF_user_Phone: document.getElementById('TF_VAR_usr_Phone').value,
                TF_VAR_Idle_Time: document.getElementById('TF_VAR_Idle_Time').value,
                TF_Status: 'New'  
             }
            axios.post(global.prodIp+':'+global.prodPort+'/save_profile/', JSON.stringify(UserprofileMap))
            .then(res => {
    
              
                if(res.data['Oracle-Error-Message']=='SUCCESS'){
                    alert('created successfully');
                    document.getElementById('CreateProfile').classList.add('hide');
                    document.getElementById("myModal").style.display = 'none';
                    window.location.href='/Profile';
                }else{
                    alert('Already existed');
                    document.getElementById('CreateProfile').classList.add('hide');
                    document.getElementById("myModal").style.display = 'none';
                }
                
                
              
    
            })
        }
        



    }
    handleOnClickAdwc=() =>{
        var TF_VAR_ADWC_InstanceTitle= document.getElementById('TF_VAR_ADWC_InstanceTitle').value;
        var TF_VAR_ADWC_DatabaseName= document.getElementById('TF_VAR_ADWC_DatabaseName').value;
        var TF_VAR_ADWC_CPU= document.getElementById('TF_VAR_ADWC_CPU').value;
        var TF_VAR_ADWC_STORAGE= document.getElementById('TF_VAR_ADWC_STORAGE').value;
        var TF_VAR_ADWC_PASSWORD= document.getElementById('TF_VAR_ADWC_PASSWORD').value;
        var TF_VAR_ADWC_CPASSWORD= document.getElementById('TF_VAR_ADWC_CPASSWORD').value;
        var TF_VAR_ADWC_CPASSWORD= document.getElementById('TF_VAR_ADWC_CPASSWORD').value;
        var TF_VAR_ADWC_OCID_TENANCY_NAME= document.getElementById('TF_VAR_ADWC_OCID_TENANCY_NAME').value;
        var TF_VAR_ADWC_USER_OCID= document.getElementById('TF_VAR_ADWC_USER_OCID').value;
        var TF_VAR_ADWC_USER_FingerPrint= document.getElementById('TF_VAR_ADWC_USER_FingerPrint').value;
        var TF_VAR_ADWC_PPK= document.getElementById('TF_VAR_ADWC_PPK').value;
        var TF_VAR_ADWC_Region_Name= document.getElementById('TF_VAR_ADWC_Region_Name').value;
        var TF_VAR_ADWC_Compartment_OCID= document.getElementById('TF_VAR_ADWC_Compartment_OCID').value;
        if(TF_VAR_ADWC_InstanceTitle==""){
            alert("Please enter title");
            document.getElementById('TF_VAR_ADWC_InstanceTitle').focus();
            return false;
        }else if(TF_VAR_ADWC_DatabaseName==""){
            alert("Please enter DatabaseName");
            document.getElementById('TF_VAR_ADWC_DatabaseName').focus();
            return false;
        }
        else if(TF_VAR_ADWC_CPU==""){
            alert("Please enter CPU");
            document.getElementById('TF_VAR_ADWC_CPU').focus();
            return false;
        }
        else if(TF_VAR_ADWC_STORAGE==""){
            alert("Please enter Storage");
            document.getElementById('TF_VAR_ADWC_STORAGE').focus();
            return false;
        }
        else if(TF_VAR_ADWC_PASSWORD==""){
            alert("Please enter Password");
            document.getElementById('TF_VAR_ADWC_PASSWORD').focus();
            return false;
        }
        else if(TF_VAR_ADWC_PASSWORD!=""){
            var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{12,30}$/;
            if(regex.test(TF_VAR_ADWC_PASSWORD)){
                //alert('matched');
            }else{
                alert('Not matched'); 
                document.getElementById('TF_VAR_ADWC_PASSWORD').focus();
                return false;
            }
            if(TF_VAR_ADWC_CPASSWORD==""){
                alert("Please enter  confirm Password");
                document.getElementById('TF_VAR_ADWC_CPASSWORD').focus();
                return false;
            }
            else if(TF_VAR_ADWC_PASSWORD!=TF_VAR_ADWC_CPASSWORD){
                alert("Password is not matching");
                document.getElementById('TF_VAR_ADWC_CPASSWORD').focus();
                return false;
            }
           
            else if(TF_VAR_ADWC_OCID_TENANCY_NAME==""){
                alert("Please enter  OCID Tenancy Name");
                document.getElementById('TF_VAR_ADWC_OCID_TENANCY_NAME').focus();
                return false;
            }
            else if(TF_VAR_ADWC_USER_OCID==""){
                alert("Please enter  User OCID");
                document.getElementById('TF_VAR_ADWC_USER_OCID').focus();
                return false;
            }
            else if(TF_VAR_ADWC_USER_FingerPrint==""){
                alert("Please enter  User Private Keys");
                document.getElementById('TF_VAR_ADWC_USER_FingerPrint').focus();
                return false;
            }
            else if(TF_VAR_ADWC_Region_Name==""){
                alert("Please enter ADWC region name");
                document.getElementById('TF_VAR_ADWC_Region_Name').focus();
                return false;
            }
            else if(TF_VAR_ADWC_Compartment_OCID==""){
                alert("Please enter ADWC Compartment OCID");
                document.getElementById('TF_VAR_ADWC_Compartment_OCID').focus();
                return false;
            }
            else{
                var reqdata = {
                    TF_VAR_InstanceTitle: TF_VAR_ADWC_InstanceTitle,
                    TF_VAR_DatabaseName: TF_VAR_ADWC_DatabaseName,
                    TF_VAR_CPU: TF_VAR_ADWC_CPU,
                    TF_VAR_STORAGE: TF_VAR_ADWC_STORAGE,
                    TF_VAR_PASSWORD: TF_VAR_ADWC_PASSWORD,
                    TF_VAR_CPASSWORD: TF_VAR_ADWC_CPASSWORD,
                    TF_VAR_ADWC_OCID_TENANCY_NAME :TF_VAR_ADWC_OCID_TENANCY_NAME,
                    TF_VAR_ADWC_USER_OCID:TF_VAR_ADWC_USER_OCID,
                    TF_VAR_ADWC_USER_FingerPrint:TF_VAR_ADWC_USER_FingerPrint,
                    TF_VAR_ADWC_PPK: TF_VAR_ADWC_PPK,
                    TF_VAR_ADWC_Region_Name: TF_VAR_ADWC_Region_Name,
                    TF_VAR_ADWC_Compartment_OCID: TF_VAR_ADWC_Compartment_OCID
 };
            // console.log(JSON.stringify(reqdata));
                axios({
                    method: 'post',
                    url: global.prodIp+':'+global.prodPort+'/create_adwc/',
                    data: JSON.stringify(reqdata)
    
                });
            }
        }
        
        
        

    }
    handleOnClick = () => {
        // some action...
        // then redirect
        var InstanceTitle = document.getElementById("TF_VAR_InstanceTitle").value;
       // var InstanceShape = document.getElementById("TF_VAR_MasterInstanceShape").value;
        if (InstanceTitle == '') {
            alert('Please enter POVaas Title');
            document.getElementById("TF_VAR_InstanceTitle").focus();
            return false;
        }
        else if ( InstanceTitle.indexOf(' ') !== -1) {
            alert("Spaces in the Inastance name is not allowed");
            document.getElementById("TF_VAR_InstanceTitle").focus();
            return false;
        }
        
         else if (InstanceTitle != '') { 
            // var url = 'http://129.146.111.65:3000/user/checkunique/?name='+InstanceTitle;
            // axios.get(url).then(response => {
            //     var json = response.data;
               // if (json.unique === true) {
                   // return true;

                    var reqdata = {
                        TF_VAR_tenancy_ocid: "ocidv1:tenancy:oc1:phx:1458169512456:aaaaaaaaqftfib54gijpqwckj3uvudp234",
                        TF_VAR_user_ocid: "ocid1.user.oc1..aaaaaaaarzwt3kq7z7cjs4yr3hwlgeqf2c6lcfzq2ai2un2zsfcjbnlm2knq",
                        TF_VAR_fingerprint: "73:06:26:e3:c9:eb:fd:aa:e0:ba:62:86:e2:8d:7c:57",
                        TF_VAR_private_key_path: "/home/opc/Key/oci_api_key.pem",
                        TF_VAR_region: "us-phoenix-1",
                        TF_VAR_compartment_ocid: "ocid1.compartment.oc1..aaaaaaaa7el6uxvuyatge6nnsbox6ufirjeyecxvrlgflxmm4no5is55o6ua",
                        TF_VAR_ssh_public_key: "/home/opc/Key/BDDS_Key.pub",
                        TF_VAR_ssh_private_key: "/home/opc/Key/BDDS_Key",
                        TF_VAR_image_ocid: "ocid1.image.oc1.phx.aaaaaaaazs4djfpanpbh7zwqjqe4enku3juqo6dntkj66u2vjx4p2k2oj5cq",
                        TF_VAR_AD: "2",
                        TF_VAR_MasterInstanceShape: document.getElementById("TF_VAR_MasterInstanceShape").value,
                        TF_VAR_InstanceTitle: document.getElementById("TF_VAR_InstanceTitle").value,
                        TF_VAR_UserName: sessionStorage.getItem("username"),
                        TF_Var_SolutionID: document.getElementById('PovaasId').value,
                        TF_Var_InstanceCount: "1"
            
                    };
                   // console.log(JSON.stringify(reqdata));
                    axios({
                        method: 'post',
                        url: global.prodIp+':'+global.prodPort+'/createspark/',
                        data: JSON.stringify(reqdata)
            
                    });
                    this.setState({ redirect: true });
                //}
            // });


        }
        
    }
    componentDidMount() {



    }
    render() {
        if(this.state.delete){
            return <Redirect push to="/" />; 
        }
        if (this.state.redirectToDAsh) {
            return <Redirect push to="/dash" />;
        }
        if (this.state.redirect) {
            //  return <Redirect push to="/Thanks" />;
            document.getElementById("ConfirmBox").classList.add("hide");
            document.getElementById("content_form").classList.add("hide");
            document.getElementById("adwc_form").classList.add("hide");
            
            document.getElementById("StatusPage").classList.remove("hide");
            document.getElementById("CreateProfile").classList.add("hide");
            document.getElementById("haddob_form").classList.add("hide");
            document.getElementById("close").classList.add("hide");
            document.getElementById("SignUpProfile").classList.add("hide");
            document.getElementById("SignUpCompanyProfile").classList.add("hide");
            if (this.state.position != 1) {
                setTimeout(function () {
                    document.getElementById("StatusPage").innerHTML = '<div class="loadingimg text-center">Instance creation will take more time. We are redirecting you to the Dashboard <br/><br/><img src="https://wgli.org/wp-content/plugins/fundlycrm/assets/images/npe-redirecting.gif" />';

                }, 7000);
                setTimeout(
                    function () {
                        this.setState({ position: 1 });
                    }.bind(this),
                    12000
                );

            }
        }
        if (this.state.position == 1) {
            return <Redirect push to="/dash" />;
        }
        function closePop() {
            document.getElementById("myModal").style.display = 'none';
            document.getElementById("content_form").classList.remove("hide");
            document.getElementById("adwc_form").classList.add("hide");
            document.getElementById("StatusPage").classList.add("hide");
            document.getElementById("ConfirmBox").classList.add("hide");
            document.getElementById("CreateProfile").classList.add("hide");
            document.getElementById("SignUpProfile").classList.add("hide");
            document.getElementById("SignUpCompanyProfile").classList.add("hide");
        }
        function YesPop() {
            // alert('api integration is pending')
            var reqDeldata = document.getElementById("hiddenData").value;
            // var url = 'http://129.146.111.65:3000/user/getrequestbytitle/?title=' + reqDeldata;
            // axios.get(url).then(response => {
            //     var json = response.data[0];
              // alert(JSON.stringify(json));
              var reqdataDeleteId = {TF_VAR_id: reqDeldata}
               
            //   axios({
            //     method: 'post',
            //     url: 'http://129.146.98.101:8086/deletesparknode/',
            //     data: JSON.stringify(reqdataDeleteId)
    
            // });
           //alert( document.getElementById('SparkhiddenId').value);
            if(document.getElementById('SparkhiddenId').value=="1"){
                var deleteUrl=global.prodIp+':'+global.prodPort+'/deletesparknode/';
            }else if(document.getElementById('SparkhiddenId').value=="2"){
                var deleteUrl=global.prodIp+':'+global.prodPort+'/deleteclouderadev/';
            }
            axios.post(deleteUrl,JSON.stringify(reqdataDeleteId))
            .then(response => {
                var json = response.data;
                if(json.Delete_Status=='1'){
                    //window.location.href="/";
                    // alert('deleted Successfully');
                    // setTimeout(
                    //     function () {
                    //         this.setState({ delete: 4 });
                    //     }.bind(this),
                    //     12000
                    // );

                }
            });

              //  axios.post('http://129.146.98.101:8086/deletesparknode/',JSON.stringify(json)).then(response => {alert (response.data)});


                document.getElementById("myModal").style.display = 'none';
                document.getElementById("content_form").classList.remove("hide");
                document.getElementById("adwc_form").classList.add("hide");
                document.getElementById("StatusPage").classList.add("hide");
                document.getElementById("ConfirmBox").classList.add("hide");
                document.getElementById("CreateProfile").classList.add("hide");
                document.getElementById("SignUpProfile").classList.add("hide");
                document.getElementById("SignUpCompanyProfile").classList.add("hide");
                

            // });
        }
        // function hasWhiteSpace(strInput)
        // {
        //     alert('test'+strInput);
        //     var retValue=false;
        // // Check for white space
        //     if (strInput.Contains(' '))
        //     {
        //         retValue=true;
        //         return retValue;
        //     }
        // return retValue;
        // }
        // function checkName(e){
        //   var PovaasTitle=  document.getElementById("TF_VAR_InstanceTitle").value;
        //   hasWhiteSpace(PovaasTitle);

        // }


        return (

            <div>
                <div id="myModal" class="modal">
                    <div class="modal-content">
                        <span class="close" id="close" onClick={closePop}>&times;</span>
                        <div id="StatusPage" class="hide text-center">
                            <img src="http://gifimage.net/wp-content/uploads/2018/04/loading-please-wait-gif.gif" />
                        </div>

                        <div id="SignUpProfile" class="hide text-center mt20">
                            <div class="input-container">
                               <input class="input-field" type="text" placeholder="Username" id ="usrnm" name="usrnm"/>
                            </div>

                            <div class="input-container">
                            <input class="input-field" type="text" placeholder="Email" id ="usremail" name="email"/>
                            </div>
                            
                            <div class="input-container">
                                <input class="input-field" type="password" id ="usrpassword"  placeholder="Password" name="psw"/>
                            </div>
                            
                            

                            <input type="button" className="submitBtn signBtn" value="Submit" onClick={this.handleOnClickUserP}/>
                        
                        </div>
                        <div id="SignUpCompanyProfile" class="hide text-center mt20">
                            <div class="input-container">
                               <input class="input-field" type="text" id="companyName" placeholder="Company Name" name="companyName"/>
                               <input type="button" className="submitBtn signBtn" value="Submit" onClick={this.handleOnClickCompany}/>
                            
                            </div>
                            
                        
                        </div>
                        <div id="EditProfile" class="hide text-center mt20">
                                
                                <div class="row">
                                        <div class="col-25">
                                            <label  >Name <sub>*</sub></label>
                                        </div>
                                        <div class="col-75">
                                            <input type="text"  id="TF_VAR_edit_Name" name="TF_VAR_edit_Name"   />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-25">
                                            <label>Email <sub>*</sub></label>
                                        </div>
                                        <div class="col-75">
                                            <input type="text"  id="usr_profile_edit_Email"  name="usr_profile_edit_Email" readOnly />
                                        </div>
                                    </div>
                                   
                                
                                    <div class="row">
                                        <div class="col-25">
                                            <label>Password <sub>*</sub></label>
                                        </div>
                                        <div class="col-75">
                                            <input type="password"  id="usr_profile_edit_Password"  name="TF_VAR_edit_Password"  />
                                        </div>
                                       
                                      
                                        <input type="hidden" name="usr_profile_edit_Prop" id="usr_profile_edit_Prop"/>
                                        <input type="hidden" name="usr_profile_edit_ID" id="usr_profile_edit_ID"/>

                                        <input type="hidden" name="usr_profile_edit_ProfileStatus" id="usr_profile_edit_ProfileStatus"/>
                                        
                                   
                                    </div>
                                     <div class="row">
                                        <div class="col-25">
                                            <label>Confirm Password <sub>*</sub></label>
                                        </div>
                                        <div class="col-75">
                                            <input type="password"  id="usr_profile_edit_CPassword"  name="TF_VAR_edit_CPassword"  />
                                        </div>
                                    </div>
         
                                   
                                <div class="row mt20">
                                    <input type="button" className="submitBtn" value="Update" onClick={this.handleOnUserProfileEditClick} />
                                </div>
                    </div>
                        <div id="CreateProfile" class="hide text-center mt20">
                                
                                    <div class="row">
                                            <div class="col-25">
                                                <label  >Name <sub>*</sub></label>
                                            </div>
                                            <div class="col-75">
                                                <input type="text"  id="TF_VAR_Name" name="TF_VAR_Name"  required />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-25">
                                                <label>Email <sub>*</sub></label>
                                            </div>
                                            <div class="col-75">
                                                <input type="text"  id="usr_profile_Email"  name="TF_VAR_Email" required />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-25">
                                                <label for="TF_VAR_usr_Phone">Phone Number<sub>*</sub></label>
                                            </div>
                                            <div class="col-75">
                                            <input type="text"  id="TF_VAR_usr_Phone"  name="TF_VAR_usr_Phone" required />

                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-25">
                                                <label>Password <sub>*</sub></label>
                                            </div>
                                            <div class="col-75">
                                                <input type="password"  id="usr_profile_Password"  name="TF_VAR_Password"  required />
                                            </div>
                                        </div>
                                        
                                        <div class="row">
                                            <div class="col-25">
                                                <label>Select Company <sub>*</sub></label>
                                            </div>
                                            <div class="col-75">
                                            <select id="usr_profile_Company">
                                                {/* <option value="1">Oracle</option>
                                                <option value="2">Oracle Cloud</option> */}
                                               
                                            </select>                                            
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-25">
                                                <label >Select Role <sub>*</sub></label>
                                            </div>
                                            <div class="col-75">
                                            <select id="usr_profile_Role">
                                                 <option value="0">SuperAdmin</option>
                                                <option value="1">Admin</option>
                                                <option value="2">User</option> 
                                                </select>             
                                            </div>
                                        </div>

                                        
                                        <div class="row">
                                            <div class="col-25">
                                                <label for="TF_VAR_Idle_Time">Idle Time<sub>*</sub></label>
                                            </div>
                                            <div class="col-75">
                                            <select id="TF_VAR_Idle_Time">
                                                <option value="1hr">1hr</option>
                                                <option value="2hr">2hr</option> 
                                            </select> 
                                            </div>
                                        </div>
                                       
                                    <div class="row mt20">
                                        <input type="button" className="submitBtn" value="Submit" onClick={this.handleOnUserProfileClick} />
                                    </div>
                        </div>
                        <div id="ConfirmBox" class="hide text-center">
                            Are you sure you want to delete?<br /><br />
                            <button class="inprogress Yes" onClick={YesPop}> Yes </button> &nbsp;&nbsp; <button class="inprogress No" onClick={closePop}> No </button>
                            <textarea id="hiddenData" class="hide"></textarea>
                            <textarea id="SparkhiddenId" class="hide"></textarea>
                        </div>
                        <form id="content_form"  class="hide">
                            <div class="row">
                                <div class="col-25">
                                    <label for="TF_VAR_InstanceTitle">Instance Title <sub>*</sub></label>
                                </div>
                                <div class="col-75">
                                    <input type="text" id="TF_VAR_InstanceTitle" name="TF_VAR_InstanceTitle" placeholder="PoVaaSRecommendation"/>
                                </div>
                            </div>
                            
                           
                            <div class="row">
                                <div class="col-25">
                                    <label for="TF_VAR_MasterInstanceShape">Master Instance Shape <sub>*</sub></label>
                                </div>
                                <div class="col-75">
                                <select id="TF_VAR_MasterInstanceShape">
                                    <option value="VM.Standard2.1">VM.Standard2.1</option>
                                    <option value="VM.Standard2.4">VM.Standard2.4</option>
                                {/* <input type="text" id="TF_VAR_MasterInstanceShape"   name="TF_VAR_MasterInstanceShape" placeholder="VM.Standard2.4" required /> */}
                                </select>
                                </div>
                            </div>
                            <div class="row mt20">
                                <input type="button" className="submitBtn" value="Submit" onClick={this.handleOnClick} />
                            </div>
                        </form>
                        <form id="adwc_form"  class="hide">
                            <div class="row">
                                <div class="col-25">
                                    <label for="TF_VAR_InstanceTitle">ADWC Instance Title <sub>*</sub></label>
                                </div>
                                <div class="col-75">
                                    <input type="text" id="TF_VAR_ADWC_InstanceTitle" name="TF_VAR_ADWC_InstanceTitle"/>
                                           
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label for="TF_VAR_DatabaseName">Database Name <sub>*</sub></label>
                                </div>
                                <div class="col-75">
                                    <input type="text" id="TF_VAR_ADWC_DatabaseName" name="TF_VAR_ADWC_DatabaseName"  maxlength ="14"/>
                                    <p><small>The name must contains only letters and numbers, starting with a letter. 14 characters max</small></p> 
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label for="TF_VAR_CPU_Core_ Count">CPU Core Count <sub>*</sub></label>
                                </div>
                                <div class="col-75">
                                    <input type="text" id="TF_VAR_ADWC_CPU" name="TF_VAR_ADWC_CPU"/>
                                    <p><small>The number of CPU cores to enable Maximum Cores per database. 128. Available cores are subject to your tenancy's service limit</small></p> 

                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label for="TF_VAR_STORAGE">STORAGE (TB)<sub>*</sub></label>
                                </div>
                                <div class="col-75">
                                    <input type="text" id="TF_VAR_ADWC_STORAGE" name="TF_VAR_ADWC_STORAGE"/>
                                    <p><small>The Available storage, upto 128 TB</small></p> 

                                </div>
                            
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label for="TF_VAR_PASSWORD">PASSWORD<sub>*</sub></label>
                                </div>
                                <div class="col-25">
                                    <input type="password" id="TF_VAR_ADWC_PASSWORD" name="TF_VAR_ADWC_PASSWORD"/>
                                    <p><small>Password expresion that requires one lower case letter, one upper case letter, one digit, 12-30 length, and no spaces.</small></p> 

                                </div>
                                <div class="col-25">
                                    <label for="TF_VAR_PASSWORD">CONFIRM PASSWORD<sub>*</sub></label>
                                </div>
                                <div class="col-25">
                                    <input type="password" id="TF_VAR_ADWC_CPASSWORD" name="TF_VAR_ADWC_CPASSWORD"/>
                                </div>
                            
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label for="TF_VAR_OCID_TENANCY_NAME">OCID Tenancy Name<sub>*</sub></label>
                                </div>
                                <div class="col-75">
                                    <input type="text" id="TF_VAR_ADWC_OCID_TENANCY_NAME" name="TF_VAR_ADWC_OCID_TENANCY_NAME"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label for="TF_VAR_ADWC_USER_OCID">User OCID<sub>*</sub></label>
                                </div>
                                <div class="col-75">
                                    <input type="text" id="TF_VAR_ADWC_USER_OCID" name="TF_VAR_ADWC_USER_OCID"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label for="TF_VAR_ADWC_USER_FingerPrint">User FingerPrint<sub>*</sub></label>
                                </div>
                                <div class="col-75">
                                    <input type="text" id="TF_VAR_ADWC_USER_FingerPrint" name="TF_VAR_ADWC_USER_FingerPrint"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label for="TF_VAR_ADWC_PPK">Upload Private/Public keys<sub>*</sub></label>
                                </div>
                                <div class="col-75">
                                    <input type="text" id="TF_VAR_ADWC_PPK" name="TF_VAR_ADWC_PPK"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label for="TF_VAR_ADWC_Region_Name">Region Name<sub>*</sub></label>
                                </div>
                                <div class="col-75">
                                    <input type="text" id="TF_VAR_ADWC_Region_Name" name="TF_VAR_ADWC_Region_Name"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label for="TF_VAR_ADWC_Compartment_OCID">Compartment OCID<sub>*</sub></label>
                                </div>
                                <div class="col-75">
                                    <input type="text" id="TF_VAR_ADWC_Compartment_OCID" name="TF_VAR_ADWC_Compartment_OCID"/>
                                </div>
                            </div>
                            <div class="row mt20">
                                <input type="button" className="submitBtn" value="Submit" onClick={this.handleOnClickAdwc} />
                            </div>
                        </form>
                        <form id="haddob_form" class="hide">
                         <div class="clusterBox">
                            <input class="filterSearch" id="TF_Var_Instance_Title_Hadoob" name="TF_Var_Instance_Title_Hadoob" type="text" placeholder="PoVaaS Title"/>
                            <div class="tupple">
                                <p>MASTER</p>
                                <select name="TF_Var_MASTER_Shape" id="TF_Var_MASTER_Shape" onChange={this.handleOnSwitch}>
                                    <option value="0">Select Shape</option>
                                    <option value="VM.Standard2.8">VM.Standard2.8</option>
                                    <option value="VM.Standard2.16">VM.Standard2.16</option>
                                </select>

                                <select name="TF_Var_Master_instance" id="TF_Var_Master_instance">
                                        <option value="0">Select Instance</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                </select>
                            </div>

                            <div class="tupple">
                                    <p>BASTION</p>
                                    <select name="TF_Var_BASTON_Shape" id="TF_Var_BASTON_Shape">
                                        <option value="0">Select Shape</option>
                                        <option value="VM.Standard2.4">VM.Standard2.4</option>
                                        <option value="VM.Standard2.8">VM.Standard2.8</option>
                                        <option value="VM.Standard2.16">VM.Standard2.16</option>
                                    </select>
                                    <span  class="utility" readoly title="disabled" name="TF_Var_BASTON_Instance" id="TF_Var_BASTON_Instance">1</span>
                                
                                </div>

                                <div class="tupple">
                                    
                                    <p>UTILITY</p>
                                    <span  class="utility" readoly title="disabled" name="TF_Var_UTILITY_Shape" id="TF_Var_UTILITY_Shape">Select Shape</span>
                                    <span  class="utility" readoly title="disabled" name="TF_Var_UTILITY_Instance" id="TF_Var_UTILITY_Instance">Select Instance</span>
                                </div>

                                <div class="tupple">
                                        <p>WORKER</p>
                                        <select name="TF_Var_WORKER_Shape" id="TF_Var_WORKER_Shape">
                                            <option value="0">Select Shape</option>
                                            <option value="BM.DenseIO2.52">BM.DenseIO2.52</option>
                                            <option value="VM.Standard2.4">VM.Standard2.4</option>
                                        </select>
                            
                                        <select name="TF_Var_WORKER_Instance" id="TF_Var_WORKER_Instance">
                                                <option value="0">Select Instance</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                        </select>
                                    </div>
                                    <div class="row mt20">
                                        <input type="button" className="submitBtn submitHadoop" value="Submit" onClick={this.handleOnClickHadoob} />
                                    </div>
                                    <input type="hidden" id="PovaasId" value=""/>
                        </div>
                 </form>
                    </div>
                </div>
            </div>
        );
    }
}