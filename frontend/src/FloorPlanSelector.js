import React from 'react';

function renderLoadingList(){
    
}

function renderFloorList(floors){
    return floors.map((floor,index) =>
		      (<option key={index} value={index}>{floor}</option>));
}

export default function FloorPlanSelector(props){
    const floors = props.floors,
	  areFloorsAvailable = !!floors && floors instanceof Array && floors.length > 0 ;
    return (
	    <select value={props.currentFloor} onChange={props.handlePlanChange} disabled={!areFloorsAvailable}>
	    { areFloorsAvailable ? renderFloorList(floors) : null }
	    </select>);
}
