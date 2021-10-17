/** @format */

import { BrowserRouter, Switch } from 'react-router-dom';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import { useAuth0 } from '@auth0/auth0-react';

import HomeComponent from 'Pages/HomeComponent';
import PlayComponent from 'Pages/PlayComponent';
import NotFoundComponent from 'Pages/NotFoundComponent';
import LoadingComponent from './LoadingComponent';

const requireLogin = (to: any, from: any, next: any) => {
	const loggedIn = to.meta.loggedIn;

	if (to.meta.auth === undefined) return next();
	if (to.meta.auth && !loggedIn) return next.redirect('/');
	if (!to.meta.auth && loggedIn) return next.redirect('/play');

	return next();
};

export default function RouterComponent(): JSX.Element {
	const { isAuthenticated, isLoading } = useAuth0();

	if (isLoading) return <LoadingComponent />;

	return (
		<BrowserRouter>
			<GuardProvider
				guards={[requireLogin]}
				loading={LoadingComponent}
				error={NotFoundComponent}>
				<Switch>
					<GuardedRoute
						path='/'
						exact
						component={HomeComponent}
						meta={{ auth: false, loggedIn: isAuthenticated }}
					/>
					<GuardedRoute
						path='/play'
						exact
						component={PlayComponent}
						meta={{ auth: true, loggedIn: isAuthenticated }}
					/>
					<GuardedRoute path='*' component={NotFoundComponent} />
				</Switch>
			</GuardProvider>
		</BrowserRouter>
	);
}
