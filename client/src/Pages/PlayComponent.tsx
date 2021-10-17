/** @format */

import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import GameComponent from 'Components/GameComponent';
import SidebarComponent from 'Components/SidebarComponent';
import styled from 'styled-components';

const Main = styled.div`
	display: flex;
`;

export default function PlayComponent(): JSX.Element {
	const socket: WebSocket = new WebSocket('ws://localhost:8080');

	const [activeGame, setActiveGame] = useState<boolean>(false);
	const { user, isLoading } = useAuth0();

	const startGame = () => {
		setActiveGame(true);
	};

	useEffect(() => {
		socket.onopen = () => {
			console.log('ws connection open');
		};

		socket.onclose = () => {
			console.log('ws connection closed');
		};

		socket.onmessage = () => {
			console.log('ws connection message');
		};
	}, []);

	if (isLoading) {
		return <div>Loading ...</div>;
	}

	return (
		<Main>
			<SidebarComponent startGame={startGame} />
			<GameComponent activeGame={activeGame} />
		</Main>
	);
}
