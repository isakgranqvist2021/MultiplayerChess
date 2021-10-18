/** @format */

import { useState } from 'react';
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
	padding: 50px 20px 20px 20px;

	h2,
	p {
		margin: 10px 0;
		color: #fff;
	}

	img {
		border-radius: 50%;
	}

	button {
		padding: 12px;
		width: 100%;
	}
`;

export default function SidebarComponent(props: {
	startGame: any;
	joinGame: any;
}): JSX.Element {
	const [rid, setRid] = useState<string>('');
	const { user, isLoading, logout } = useAuth0();

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
					<button onClick={props.startGame}>New Game</button>

					<input
						value={rid}
						onChange={(e: any) => setRid(e.target.value)}
					/>
					<button onClick={() => props.joinGame(rid)}>
						Join Game
					</button>
				</div>

				<button onClick={() => logout()}>Logout</button>
			</SidebarContent>
		</Sidebar>
	);
}
