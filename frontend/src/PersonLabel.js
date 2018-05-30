import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PersonLabel extends Component {
    renderTextNode(person,onClick){
	const className = this.props.className;
	return (<text x="0" y="0" className={className ? className : null} onClick={onClick ? onClick : null} id={person.id} key={person.id}>
		{
		    person.annotations.map((labelSpec,index) =>
				    {
					const dy = index === 0 ? "0" : "1.2em";
					return (<tspan x="0" dy={dy} key={index}>
						{labelSpec.label}
						</tspan>);
				    })
		}
		</text>);
    }

    renderLinkedTextNode(person){
	return (<a xlinkHref={person.profileUrl} key={person.url} target="personalbio">
		{this.renderTextNode(person)}
		</a>);
    }
    
    render(){
	var person = this.props.person,
	    onClick = this.props.onClick,
	    isLinked = !onClick,
	    annotations = person.annotations,
	    personX = annotations[0].x,
	    personY = annotations[0].y;
	return (
		<g transform={"translate("+personX+" "+personY+")"}>
		// If there is no custom click handler, then we show a linked tag. If there is a custom click handler, then we run that instead.
		{isLinked ? this.renderLinkedTextNode(person) : this.renderTextNode(person,onClick)}
		</g>
	);
    }
}

PersonLabel.propTypes = {
    person: PropTypes.object.required,
    onClick: PropTypes.func,
    className: PropTypes.string
}
