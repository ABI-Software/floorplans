import React from 'react';
import ReactDOM from 'react-dom';
import PlanEditor from './PlanEditor';

it('renders without crashing',()=> {
    const div = document.createElement('div');
    ReactDOM.render(<PlanEditor />, div);
});
