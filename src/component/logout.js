import React, {
    Component
} from 'react';

class Logout extends Component {
    constructor() {
        super();
        
    }
    
    logout(){
        this.setState({redirectHome: true});
        //console.log("came here");
        localStorage.clear();
        window.location.href='/';
        
      }
    render() {
             return (
                <span id="logout" className="logout" onClick={this.logout.bind(this)}>Logout</span>
            );
            }
        }
        
export default Logout;
  

  