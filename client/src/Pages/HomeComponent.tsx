/** @format */

import { useAuth0 } from '@auth0/auth0-react';

export default function HomeComponent(): JSX.Element {
	const { loginWithRedirect } = useAuth0();

	return (
		<div>
			<button
				onClick={() =>
					loginWithRedirect({
						redirectUri: process.env.REACT_APP_CLIENT_ADDR,
					})
				}>
				Log In
			</button>
		</div>
	);
}
