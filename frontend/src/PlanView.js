import React, { Component } from 'react';
import PlanViewer from './PlanViewer.js';
import {fetchFloors, fetchFloor } from './plan';
import FloorPlanSelector from './FloorPlanSelector';

class PlanView extends Component {
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
	return fetchFloor(newFloor[floorIdx]).then((plan) => {
	    self.setState({isFetching:false,plan: plan});
	}).catch((error) => {
	    self.setState({error:error});
	});
    }
    
    handlePlanChange(event){
	var floorIdx = event.target.value;
	this.loadPlan(floorIdx);
    }
    
    render() {
	const floors = this.state.floors ? this.state.floors : [];
	return (<div className="App">
		<FloorPlanSelector currentFloor={this.state.floorIdx} handlePlanChange={this.handlePlanChange.bind(this)} floors={floors.map ( floor => (floor.name)) } />
		<PlanViewer planSpec={this.state.plan} isFetching={this.state.isFetching} error={this.state.error} />
		</div>
	);
    }
}

export default ViewPage;
