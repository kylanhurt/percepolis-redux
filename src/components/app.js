import React, { Component } from 'react';
import {Link} from 'react-router';
import {store} from '../index.js';

class App extends Component {  
  constructor(props) {
    super(props);

    this.state = { 
      authenticated: false
    };
  }

  render() {
    return (
        <div className="row" style={{clear: "both"}}>
          <nav className="navbar navbar-inverse navbar-fixed-top" >
              <div className="container">
                  <div className="navbar-header">
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                          <span className="sr-only">Toggle navigation</span>
                      </button>
                      <Link className="navbar-brand" href="/">Percepol.is</Link>
                  </div>                       
                  {this.headerItems}
                </div>
        </nav>

        <div className="container">
          {this.props.children}
        </div>

        <div className="container col-lg-8 col-lg-offset-2">
          <footer>
              <p>&copy; Percepol.is 2016</p>
          </footer>
        </div>

      </div>
    );
  }

  get headerItems() {    
    if (!this.state.authenticated) {
      return (
            <ul className="nav navbar-nav navbar-right"> 
              <li className="nav-item">
                <Link className="nav-link" to="/register">Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>         
            </ul>     
            )
    } else {
      return (
          <ul className="nav navbar-nav navbar-right">         
            <li><a href="#" onClick="" style={{color:'white'}}>Logout</a></li>
          </ul>
      )
    }
  }  
}

export default App;  