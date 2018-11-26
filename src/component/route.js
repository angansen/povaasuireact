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
 import LoginScreen from './loginScreen';
import Nav from './nav';
import Dialog from './dialogBox';
import SearchBox from './searchBox';
import ContentBox from './contentBox';
import ShowListing from './showList';
import ProfileListing from './profileList';
import CurrentProfileList from './currentProfile';
import CompanyListing from './companyList';
 import Logout from './logout';
import LogoHeader from './logoHeader';
const RouterApp = () => (
  <Router>
   
      <div>
      <Route exact path="/" component={Home} />
      <Route  path="/dash" component={Dash} />
      <Route  path="/profile" component={Profile} />
      <Route  path="/company" component={Company} />
      <Route  path="/login" component={Loginbox} />
      <Route  path="/viewProfile" component={viewProfilebox} />
      <Route  path="/#/administrator" component={Dash} />
      </div>
   
  </Router>
);

const Home = () => (
  <div>
  <header class="App-header">
  <LogoHeader/>
     <Nav/>
    </header>
  <div>
    {/* <LoginBox/> */}
    <div id="searchPanel">
        <SearchBox title="" placeholder="Please type here to search" /> 
        <Dialog/> 
        <ContentBox />  
        
    </div> 
  </div>
  </div>
);


const Dash = ({ match }) => (
  <div>
  <header class="App-header">
  <LogoHeader/>
     <Nav/>
    </header>
  <div>
     <ShowListing/>
     <Dialog/> 
  </div>
  </div>
);
const viewProfilebox = ({ match }) => (
  <div>
  <header class="App-header">
  <LogoHeader/>
     <Nav/>
    </header>
  <div>
     <CurrentProfileList/>
     <Dialog/> 
  </div>
  </div>
);


const Loginbox = ({ match }) => (
  <div>
  <header class="App-header">
      <div class="LogoHeader">
            <Link to="/"><span>POVaaS</span></Link>
      </div> 
  </header>
  <div>
     <LoginScreen/>
     <Dialog/> 
  </div>
  </div>
);
const Profile = ({ match }) => (
  <div>
  <header class="App-header">
  <LogoHeader/>
     <Nav/>
    </header>
  <div>
     <ProfileListing/>
     <Dialog/> 
  </div>
  </div>
);
const Company = ({ match }) => (
  <div>
  <header class="App-header">
  <LogoHeader/>
     <Nav/>
    </header>
  <div>
     <CompanyListing/>
     <Dialog/> 
  </div>
  </div>
);

export default RouterApp;