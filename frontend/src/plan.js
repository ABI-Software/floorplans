
// Code for loading and managing state of the floor plans

export function prefetchImage(imageSrc){
    
    var image = new Image();
    return new Promise((resolve,reject) => {
	if (!imageSrc){
	    reject(new Error("No image specified"));
	}
	image.addEventListener('load',function(){
	    resolve(image);
	});
	image.addEventListener('error',function(errorEvt){
	    reject(errorEvt);
	});
	image.src = imageSrc;
    });

}

export function fetchJSON(url){
    return fetch(url).then(
	((response) => {
	    if (!response.ok){
		throw response.error();
	    }
	    return response.json();
	}));
}

export function loadPlan(floorId){
    return fetchJSON(process.env.PUBLIC_URL + '/floors/level-'+floorId+'.json');
}

export function fetchFloors(){
    return fetchJSON('/api/floors/');
}

export function fetchFloor(url){
    return fetchJSON(url).then(
	(responseJSON) => {
	    return new Promise(
		(resolve,reject) =>
		    {
			// Prefetch the base map image, so we can work out its height and width, and also control when the floor becomes visible.
			prefetchImage(responseJSON.baseMap).then(
			    (image) => {
				responseJSON.baseMapImage = image;
				resolve(responseJSON);
			    }).catch((error) => {
				reject(error);
			    });
		    }
	    );
	});
}
