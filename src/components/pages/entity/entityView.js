import React from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { preSubmit, skip, save } from '../../../actions/entityNewActions';
import { Field, reduxForm } from 'redux-form';
import classNames from 'classnames';
import {store} from '../../../store';

@connect((store) => { //injects props into the layout, first param gives store to props, 2nd param
	return {
		auth: store.auth,
	};
})


class EntityView extends React.Component {

	constructor( props ) {
		super(props);
	}

  render() { 

    	return(

			<div className="col-lg-12">
				<h1>{this.props.params.entityName}</h1>
			</div>
		)
    }
}

function mapStateToProps(state) {  
  return {  };
}

EntityView.propTypes = {
	
}

export default connect(mapStateToProps, actions)(EntityView);  