import React from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import {fetchEntities} from '../../../actions/entityActions';
import { loginUser, registerUser } from '../../../actions';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import { asyncValidate } from '../../../actions/homeBannerActions';

@connect((store) => { //injects props into the layout, first param gives store to props, 2nd param
	return {
		auth: store.auth,
		form: store.form
	};
})



class HomeBanner extends React.Component {

	constructor( props ) {
		super(props);
		var state = {};	
	}

	loginUser(e) {
		e.preventDefault();
		this.props.dispatch(loginUser({email: this.state.email, password: this.state.password}));
	}

	registerUser(e) {
		e.preventDefault();
		this.props.dispatch(registerUser({email: this.state.email, password: this.state.password}));
	}

  _onInputChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  }	

  validateEmail() {
  	this.props.dispatch(asyncValidate({ email: this.props.form.userRegister.values.email }))
  }

  componentWillMount() {

  }

  componentDidMount() {

  }


  render() { 
	const { asyncValidating, handleSubmit, pristine, reset, submitting } = this.props;  	
    if (!this.props.auth.authenticated) {

    	return(
			<div className="jumbotron" style={{overflow: 'hidden'}}>
			    <div className="col-lg-4 col-sm-12" id="home-signup-form">
			        <form>
			            <p>Please fill out the fields below to create an account:</p>
			            <div className="form-group">
			                <label htmlFor="login-email">Email:</label>
			                <Field name="email" onBlur={this.validateEmail.bind(this)} component="input" className="form-control" id="login-email" type="email"  placeholder="user@example.com" />
			            </div>
			            <div className="form-group">
			                <label htmlFor="login-password">Password:</label>
							<Field name="password" component="input" type="password" className="form-control"  id="login-password" placeholder="*******" />			                
			            </div>
			            <button className="btn btn-primary" disabled={this.pristine || this.submitting}>Login</button>
			            <button className="btn btn-secondary" disabled={this.pristine || this.submitting}>Register</button>
			            <input type="hidden" name="_token" value="{{_token}}"></input>
			        </form>
			    </div>
			    <div className="col-lg-6 col-lg-offset-2">
			        <p>Become a dataGo member and you will be given access to the following features:</p>
			            <ul>
			                <li>Submit new entities for consideration and review by other users.</li>
			                <li>Rate and review entities submitted by other users.</li>
			                <li>Participate in discussions regarding organizations and current events.</li>
			                <li>Begin accruing credibility as a user, giving your account more influence.</li>
			            </ul>
			    </div>   
			</div>
		)
	} else {
		return(
				<div id="home-logged-in-content" className="jumbotron">
				    <h1>Welcome to dataGo<span>, </span>!</h1>
				    <p>To submit a new entity to our database, please click the button below...</p>
				    <p><Link className="btn btn-primary btn-large" to="/entity/new">Submit New Entity</Link></p>
				</div>
			)
		}
	}
}

HomeBanner = reduxForm({
	form: 'userRegister',
	fields: ['email', 'password'],
	asyncValidate,
	asyncBlurFields: []
})(HomeBanner);


export default HomeBanner;