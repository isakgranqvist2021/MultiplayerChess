/** @format */

import { Auth0Provider } from '@auth0/auth0-react';

import RouterComponent from 'Components/RouterComponent';

export default function OutletComponent(): JSX.Element {
	return (
		<Auth0Provider
			domain='dustiastheguy.eu.auth0.com'
			clientId='0l8mZ1xs6bhJMJkl5JujoNv4aiGipxJo'
			redirectUri={process.env.REACT_APP_CLIENT_ADDR}>
			<RouterComponent />
		</Auth0Provider>
	);
}
