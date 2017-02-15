import React from 'react';
import { connect } from 'react-redux';
import {fetchEntities} from '../../../actions/entityActions';
import moment from 'moment';


@connect((store) => { //injects props into the layout, first param gives store to props, 2nd param
	return {
		entity: store.entity.homeTableEntities
	};
})

export default class EntityTable extends React.Component {

	componentDidMount() {
		this.props.dispatch(fetchEntities());
	}

  render() { 
  	const entities = this.props.entity; 	
  	const mappedEntities = entities.map(entity =>           	
  				<tr >
	                <td className="home-index-table-body-title"><a>{entity.name}</a></td>
	                <td className="home-index-table-body-website"><a href="http://">{entity.website}</a></td>                        
	                <td className="home-index-table-body-location">{entity.location}</td>
	                <td className="home-index-table-body-year">{entity.yearFounded}</td>
	                <td className="home-index-table-body-created">{entity.createdAt ? moment(entity.createdAt).fromNow() : ''}</td>
                </tr>)
  	return( 
  		<div className="row">
		    <table className="table table-striped table-hover home-index-table">
		        <thead>
		            <tr>
		                <th className="home-index-table-head-title">Name</th>
		                <th className="home-index-table-head-website">Website</th>
		                <th className="home-index-table-head-location">Location</th>
		                <th className="home-index-table-head-year">Year Founded</th>
		                <th className="home-index-table-head-created">Submitted</th>
		            </tr>
		        </thead>
		        <tbody>
		        	{mappedEntities}
		        </tbody>
		    </table>
		 </div>	
	 	)  	
	}
}