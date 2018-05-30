import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlanViewer from './PlanViewer.js';
import PlanEditor from './PlanEditor.js';
import {fetchFloors, fetchFloor } from './plan';
import FloorPlanSelector from './FloorPlanSelector';

class FloorPlanPage extends Component {
    constructor(props){
	super(props);
	this.state = {
	    floorIdx: null,
	    plan: null,
	    isFetching: false,
	    error: null
	};
    }

    componentDidMount(){
	//Load floors, then select first floor as the initial plan to load
	this.loadFloors().then(
	    floors =>
		{
		    if (floors.length > 0){
			this.loadPlan(0);
		    }
		}
	);
    }

    loadFloors(){
	return fetchFloors().then(
	    floors =>
		{
		    this.setState({floors:floors});
		    return floors;
		}
	);
    }

    loadPlan(floorIdx){
	const self = this,
	      newFloor = this.state.floors[floorIdx];
	self.setState({isFetching: true, floorIdx: floorIdx,error: null});
	return fetchFloor(newFloor.url).then((plan) => {
	    self.setState({isFetching:false,plan: plan});
	}).catch((error) => {
	    self.setState({error:error});
	});
    }
    
    handlePlanChange(event){
	var floorIdx = event.target.value;
	this.loadPlan(floorIdx);
    }

    renderFloor(isEditable){
	if (isEditable){
	    return (<PlanEditor planSpec={this.state.plan} isFetching={this.state.isFetching} error={this.state.error} />);
	} else {
	    return (<PlanViewer planSpec={this.state.plan} isFetching={this.state.isFetching} error={this.state.error} />);
	}
    }
    
    render() {
	const floors = this.state.floors ? this.state.floors : [],
	      isEditable = this.props.editable;
	return (<div className="App">
		<FloorPlanSelector currentFloor={this.state.floorIdx} handlePlanChange={this.handlePlanChange.bind(this)} floors={floors.map ( floor => (floor.name)) } />
		{this.renderFloor(isEditable)}
		</div>
	);
    }
}

FloorPlanPage.propTypes = {
    editable: PropTypes.bool
};

export default FloorPlanPage;
