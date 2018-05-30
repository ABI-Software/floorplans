import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BaseMap from './BaseMap';
import './PlanViewer.css';
import PersonLabel from './PersonLabel';

export default class PlanViewer extends Component {
    renderViewer(planSpec){
	const people = planSpec.people;
	return (<BaseMap map={planSpec.baseMapImage}>
		{people.map(person => (<PersonLabel person={person} key={person.id} />))}
		</BaseMap>);
    }

    renderLoading(){
	return (<div>Loading...</div>)
    }

    renderError(){
	return (<div>An error occurred while displaying this floor plan.</div>);
    }

    render(){
	var planSpec = this.props.planSpec;
	if (this.props.error){
	    return this.renderError();
	}
	if (this.props.isFetching){
	    return this.renderLoading();
	}
	if (!planSpec){
	    return this.renderError();
	}
	return this.renderViewer(planSpec);
    }
}

PlanViewer.propTypes = {
    planSpec: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.object
};

