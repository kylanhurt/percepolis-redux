import React, { Component } from 'react';

class App extends Component {  
  constructor(props) {
    super(props);
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
                      <a className="navbar-brand" href="/">Percepol.is</a>
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

  headerItems(state) {
    if (!state.auth.authenticated) {
      return (
            <ul className="nav navbar-nav navbar-right"> 
              <li className="nav-item">
                <a className="nav-link" href="#/signup">Sign Up</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/login">Login</a>
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