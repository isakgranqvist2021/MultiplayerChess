/** @format */

import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

const Sidebar = styled.aside`
	height: 100vh;
	background-color: #333;
	width: 250px;
`;

const SidebarContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	padding: 10px;

	h2,
	p {
		margin: 0;
		color: #fff;
	}
`;

export default function SidebarComponent(): JSX.Element {
	const { user, isAuthenticated, isLoading, logout } = useAuth0();

	if (isLoading) {
		return <Sidebar>Loading ...</Sidebar>;
	}

	return (
		<Sidebar>
			<SidebarContent>
				<div>
					<img src={user?.picture} alt={user?.name} />
					<h2>{user?.name}</h2>
					<p>{user?.email}</p>
				</div>

				<button onClick={() => logout()}>Logout</button>
			</SidebarContent>
		</Sidebar>
	);
}
