import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class PersonEditor extends Component {

    handleNameInputChanged(event){	
	const nameChangedCallback = this.props.callbacks.onNameChanged;
	if (!nameChangedCallback){
	    console.log("Name change not handled!");
	    return;
	}
	const newNameVal = event.target.value,
	      person = this.props.person,
	      firstAnnotationX = person.annotations[0].x,
	      firstAnnotationY = person.annotations[0].y,
	      nameLabels = newNameVal.split('\n'),
	      newName = nameLabels.map(
		  (label,index) => {
		      const x = index === 0 ? firstAnnotationX : 0,
			    y = index === 0 ? firstAnnotationY : 0;
		      return { x: x,
			       y: y,
			       label: label}
		  }
	      );
	nameChangedCallback(newName);
    }

    handleValueChanged(callback,event){
	if (!callback){
	    return;
	}
	callback(event.target.value);
    }

    render(){
	var person = this.props.person,
	    callbacks = this.props.callbacks,
	    name = person.annotations.map((annotation) => (annotation.label)).join('\n'),
	    firstNameLabel = person.annotations[0],
	    editorX = firstNameLabel.x,
	    editorY = firstNameLabel.y+20;
    return (<foreignObject onClick={event => {event.stopPropagation()}} x={editorX} y={editorY} width="300" height="500">
	    <div xmlns="http://www.w3.org/1999/xhtml" className="card annotation-editor">
	    <div className="card-divider">
	    Edit this person
	    </div>
	    <div className="card-section">
	    <label>Name
            <textarea rows="2" value={name} onChange={this.handleNameInputChanged.bind(this)} />
	    </label>
	    <label>University username
            <input type="text" placeholder="(e.g. phun025)" onChange={this.handleValueChanged.bind(this,callbacks.onUsernameChanged)} value={person.username} />
            </label>
	    <label>Directory link
	    <input type="text" value={person.profileUrl} onChange={this.handleValueChanged.bind(this,callbacks.onProfileUrlChanged)} />
            </label>
	    <div className="grid-x">
	    <div className="small-6 cell"><button type="button" className="success button">Save</button></div>
	    <div className="small-6 cell"><button type="button" onClick={callbacks.onReset ? callbacks.onReset : null} className="button">Cancel</button></div>
	    </div>
	    <button type="button" className="button alert">Delete</button>
	    </div>
	    </div>
	    </foreignObject>);
    }
}

PersonEditor.propTypes = {
    person: PropTypes.object,
    callbacks: PropTypes.object
};
