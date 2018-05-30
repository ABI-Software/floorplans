import React, {Component} from 'react';
import PropTypes from 'prop-types';

function handleMapClicked(props,event){
    if (props.callbacks && props.callbacks.onClick){
	props.callbacks.onClick(event);
    }
}

export default function BaseMap(props){
    var map = props.map,
	mapSrc = map.src,
	height = map.height,
	width = map.width;
    return (<svg width={width}
	    height={height}
	    xmlns="http://www.w3.org/2000/svg"
	    xmlnsXlink="http://www.w3.org/1999/xlink" onClick={handleMapClicked.bind(this,props)}>
	    <defs>
	    {/* Filter for adding a background colour to the text annotations. */}
	    <filter x="0" y="0" width="1" height="1" id="solidbg">
	    <feFlood floodColor="pink"/>
	    <feComposite in="SourceGraphic"/>
	    </filter>
	    </defs>
	    <image xlinkHref={mapSrc} x="0" y="0" width={width} height={height} />
	    <g className="people-annotations">
	    {props.children}
	    </g>
	    </svg>);
}

BaseMap.propTypes = {
    map: PropTypes.object,
    callbacks: PropTypes.object
}
