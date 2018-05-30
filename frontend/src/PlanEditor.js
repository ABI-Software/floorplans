import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BaseMap from './BaseMap';
import './PlanEditor.css';
import PersonEditor from './PersonEditor';
import PersonLabel from './PersonLabel';

export default class PlanEditor extends Component {

    constructor(props){
	super(props);
	this.state = {
	    selectedPerson: null
	}
	this.floorMapCallbacks = {
	    onClick: this.dismissPersonEditor.bind(this)
	}
	this.personEditorCallbacks = {
	    onNameChanged: this.changeSelectedPersonValue.bind(this,"annotations"),
	    onReset: this.unselectPerson.bind(this),
	    onUsernameChanged: this.changeSelectedPersonValue.bind(this,"username"),
	    onProfileUrlChanged: this.changeSelectedPersonValue.bind(this,"profileUrl")
	}
    }

    findPersonById(people,id){
	var result = people.filter((person) => (person.id === id));
	if (result.length === 0){
	    return null;
	}
	return result[0];
    }
    
    selectExistingPerson(id){
	// Select an existing person for editing.
	const allPeople = this.props.planSpec.people,
	      selectedPerson = this.state.selectedPerson;
	if (!!selectedPerson && selectedPerson.id === id){
	    // If we have already selected the same person, do not reselect as this will lose the changes we've made locally.
	    return;
	}
	const person = this.findPersonById(allPeople,id),
	    // Duplicate the person data so we can have a copy for local, unsaved changes to the data.
	    duplicatedPerson = Object.assign({},person);
	this.setState({selectedPerson:duplicatedPerson});
    }

    unselectPerson(){
	this.setState({selectedPerson:null});
    }

    handleAnnotationClicked(event){
	event.stopPropagation(); // This is so the floor map handler doesn't get the event too.
	var target = event.target;
	if (target.nodeName === "tspan"){
	    target = event.target.parentNode;
	}
	this.selectExistingPerson(target.id);
    }

    dismissPersonEditor(){
	this.unselectPerson();
    }

    renderPersonLabel(person){
	return (<PersonLabel person={person}
		onClick={this.handleAnnotationClicked.bind(this)}
		className="edit" />);
    }

    renderLabels(people){
	return people.map(person => (<PersonLabel
				     person={person}
				     onClick={this.handleAnnotationClicked.bind(this)}
				     className="edit"
				     key={person.id} />));
    }

    renderCurrentLabels(people, selectedPerson){
	const hasSelectedPerson = !!selectedPerson,
	      isSelectedPersonNew = hasSelectedPerson && !selectedPerson.id;
	if (!hasSelectedPerson || isSelectedPersonNew){
	    // If no one is selected for editing, or if the selected person is a new one that doesn't yet exist, then we just render all people from server state.
	    return this.renderLabels(people);
	}
	console.log("Rendering selected person from local state");
	// Otherwise, we render all except the selected person from server state, and render selected person from local state.
	const allWithLocalSelected = people.filter((person) => (!(person.id === selectedPerson.id)));
	allWithLocalSelected.push(selectedPerson);
	return this.renderLabels(allWithLocalSelected);
    }

    changeSelectedPersonValue(key,newValue){
	const currentPersonState = this.state.selectedPerson;
	var newKVPair = {};
	newKVPair[key] = newValue;
	this.setState({selectedPerson: Object.assign({},currentPersonState,newKVPair)});
    }

    renderEditor(planSpec,selectedPerson){
	const baseMap = planSpec.baseMapImage,
	      hasSelectedPerson = !!selectedPerson,
	      people = planSpec.people,
	      renderedPeople = this.renderCurrentLabels(people,selectedPerson);
	return (<div>
		<BaseMap map={baseMap} callbacks={this.floorMapCallbacks}>
		{renderedPeople}
		{hasSelectedPerson ?
		 <PersonEditor person={selectedPerson} callbacks={this.personEditorCallbacks} /> :
		 null }
		</BaseMap>
		</div>);
    }
    
    renderLoading(){
	return (<div>Loading...</div>)
    }

    renderError(){
	console.log(this.props.error);
	return (<div>An error occurred while displaying this floor plan. <p>{this.props.error ? this.props.error : null}</p> </div>);
    }

    resetAnnotationEditState(newProps){
	// This checks if we have switched to a different floor plan. If we have, then reset our annotation edit state as the old state does not apply to the new floor.
	// We check if there is a current floor plan, if not then we return. This is because users can't edit annotation until we've loaded a plan.
	if (!this.props || !this.props.planSpec || !this.props.planSpec.plan){
	    return;
	}
	// We then check if the new props has a floor plan. If it doesn't it indicates a new one might be being fetched. If it does have a floor plan, we check if it has the same map URL as our current one.
	if (!newProps.planSpec || !newProps.planSpec.plan || (this.props.planSpec.plan && this.props.planSpec.plan.mapSrc !== newProps.planSpec.plan.mapSrc)){
	    this.setState({selectedPerson: null});
	}

    }

    componentWillReceiveProps(newProps){
	this.resetAnnotationEditState(newProps);
    }

    render(){
	var planSpec = this.props.planSpec,
	    isFetching = this.props.isFetching,
	    error = this.props.error;
	if (error){
	    return this.renderError();
	}
	if (isFetching){
	    return this.renderLoading();
	}
	if (!planSpec){
	    return this.renderError();
	}
	var selectedPerson = this.state.selectedPerson;
	return this.renderEditor(planSpec, selectedPerson);
    }
}

PlanEditor.propTypes = {
    planSpec: PropTypes.object,
    callbacks: PropTypes.object
};
