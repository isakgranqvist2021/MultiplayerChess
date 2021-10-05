/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Outlet from 'Components/Outlet/Outlet';

import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<Outlet />
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
