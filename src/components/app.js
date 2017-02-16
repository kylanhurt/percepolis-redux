import React, { Component } from 'react';
import {Link} from 'react-router';
import {store} from '../index.js';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';

@connect((store) => { //injects props into the layout, first param gives store to props, 2nd param
  return {
    auth: store.auth
  };
})

class App extends Component {  
  constructor(props) {
    super(props);
  }

  logout() {
    this.props.dispatch(logoutUser());
  }

  componentDidMount() {

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
                      <Link className="navbar-brand" to="/" >Percepol.is</Link>
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
    if (!this.props.auth.authenticated) {
      return (
            <ul className="nav navbar-nav navbar-right"> 
              <li className="nav-item">
                <Link className="nav-link" to="/">Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Login</Link>
              </li>         
            </ul>     
            )
    } else {
      return (
          <ul className="nav navbar-nav navbar-right">         
            <li className="nav-item">
              <Link onClick={this.logout.bind(this)} to="/" style={{color:'white'}} className="nav-link">Logout</Link>
            </li>
          </ul>
      )
    }
  }  
}

export default App;  