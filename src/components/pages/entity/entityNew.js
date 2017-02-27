import React from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { preSubmit, skip } from '../../../actions/entityNewActions';
import { Field, reduxForm } from 'redux-form';
import { asyncValidate } from '../../../actions/homeBannerActions';
import classNames from 'classnames';
import {store} from '../../../store';


@connect((store) => { //injects props into the layout, first param gives store to props, 2nd param
	return {
		auth: store.auth,
		form: store.form,
		entityNew: store.entityNew
	};
})


class EntityNew extends React.Component {

	constructor( props ) {
		super(props);
	}

  componentWillMount() {

  }

  componentDidMount() {

  }

  render() { 
  	console.log('rendering, this.props is: ', this.props)
	const { error, asyncValidating, handleSubmit, pristine, reset, submitting } = this.props;  	
	const required = value => value ? undefined : 'Required'
	const maxLength = max => value =>
	  value && value.length > max ? `Must be ${max} characters or less` : undefined
	const maxLength200 = maxLength(200)

    	return(

			<div className="col-lg-12 main-form">
				<h2>Entity Submission</h2>
				<p>To start the creation and submission of a new entity, please fill out the form below:</p>
			        <form>			            
		                <Field validate={[required, maxLength200]} className="form-control" name="entityName" label="Entity Name" component={renderField} type="text"  placeholder="eg McDonald's" disabled={this.preSubmitted} />		                
						<div className="has-error form-feedback">{error}</div>
						{!this.props.entityNew.preSubmitted ? (
			            	<button type="submit" className="btn btn-success" disabled={pristine || submitting} onClick={this.props.handleSubmit(preSubmit)}>Submit New Entity</button>
						) : (
							<button type="submit" className="btn btn-info" onClick={this.props.handleSubmit(skip)}>Skip this Step</button>
						)}

			            {this.props.entityNew.preSubmitted && (
			            	<p>PreSubmitted is true</p>
			            )}
			            <input type="hidden" name="_token" value="{{_token}}"></input>
			        </form>
			</div>
		)
    }
}

const renderField = ({ input, type, label,  placeholder, className, meta: { touched, error, warning } }) => (
  <div className={classNames('form-group', {'has-error': touched && error}, {'has-warning': touched && warning})}>
    <label htmlFor={label}>{label}:</label> {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span className="text-warning">{warning}</span>))}
    <div>
      <input type={type} placeholder={placeholder} className={className} {...input} />
    </div>
  </div>
)

EntityNew = reduxForm({
	form: 'entityNew'
})(EntityNew);

function mapStateToProps(state) {  
	console.log('in mapStateToProps, state is: ', state);
  return { content: state.auth.content, email: state.auth.email };
}

export default connect(mapStateToProps, actions)(EntityNew);  