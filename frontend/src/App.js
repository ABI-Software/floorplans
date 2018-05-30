import React, { Component } from 'react';
import logo from './logo.png';
import FloorPlanPage from './FloorPlanPage';
import { HashRouter as Router,
	 Route,
	 Link } from 'react-router-dom';
import 'foundation-sites/dist/css/foundation.css';
import  './App.css';

function Topbar(props){
    return (<div className="top-bar">
		<div className="top-bar-left">
		<ul className="dropdown menu" data-dropdown-menu>
		<li className="menu-text"><img src={logo} alt="ABI logo." className="logo" /> Floor Plans</li>
		</ul>
		</div>
	    </div>);
}


class App extends Component {
    render(){
	return <Router>
	    <div>
	    <Topbar />
	    <Route exact path="/" component={FloorPlanPage} />
	    <Route path="/admin" render={props => <FloorPlanPage editable />} />
	    </div>
	    </Router>
    }
}

export default App;
