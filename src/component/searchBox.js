import React, {
    Component
} from 'react';
import axios from 'axios';
class SearchBox extends Component {
    constructor() {
        super();
        this.state = {
            noRecord: ''
        };

    }
    render() {
            function handleKeyPress(e) {
                e.preventDefault();
                var a = e.target.value;
                
                var filter = e.target.value.toUpperCase();
                var div = document.getElementById("searchContent");
                var h4 = div.getElementsByTagName("h3");
                
                for (var i = 0; i < h4.length; i++) {
                    a = h4[i];
                    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        h4[i].parentElement.classList.remove("hide");
                    } else {
                        h4[i].parentElement.classList.add("hide");

                    }
                   
                    
                }
                let parent1 = document.querySelector("#searchContent");
                if (parent1.children.length === parent1.querySelectorAll(".hide").length) {
                    var isMobileVersion = document.getElementsByClassName('noRecord');
                    if (isMobileVersion.length <= 0) {
                        var node = document.createElement("b");
                        node.id = "noRecord";
                        node.className = "noRecord";
                        var textnode = document.createTextNode("No Record Found");
                        node.appendChild(textnode);
                        document.getElementById("error").appendChild(node);
                    }
                    
                } else {
                    var isMobileVersion = document.getElementsByClassName('noRecord');
                    if (isMobileVersion.length > 0) {
                        var parent = document.getElementById("error");
                        var child = document.getElementById("noRecord");
                        parent.removeChild(child);
                    }
                }

                // if(e.target.value==''){
                //     var h2 = div.getElementsByTagName("h2");
                
                // for (var i = 0; i < h2.length; i++) {
                //     h2[i].parentElement.classList.add("hide");
                // }
                    
                // }
               
            }
     
            return (
                <div className="Search text-center">
                <input type="text" id="search" name="search" placeholder={this.props.placeholder}  onKeyUp={(event) => {
            handleKeyPress(event);
        }}/>
            <div id="error" className="mt20"></div>
            </div>
            );
            }
        }
        
export default SearchBox;
  

  