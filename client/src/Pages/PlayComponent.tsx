/** @format */

import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import GameComponent from 'Components/GameComponent';
import SidebarComponent from 'Components/SidebarComponent';
import styled from 'styled-components';
import LoadingComponent from 'Components/LoadingComponent';
import { randId } from 'Utils/helpers';

const Main = styled.div`
	display: flex;
`;

interface Request {
	type: string;
	payload: any;
	room?: string;
}

export default function PlayComponent(): JSX.Element {
	const socket: WebSocket = new WebSocket('ws://localhost:8080');
	const { user, isLoading } = useAuth0();
	const [activeGame, setActiveGame] = useState<boolean>(false);
	const [roomId, setRoomId] = useState<string>('');

	const startGame = () => {
		const id = randId(25);
		setRoomId(id);

		socket.send(
			JSON.stringify({
				type: 'open room',
				payload: {},
				uid: user?.sub,
				rid: id,
			})
		);

		return setActiveGame(true);
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
			<GameComponent
				activeGame={activeGame}
				socket={socket}
				user={user}
				roomId={roomId}
			/>
		</Main>
	);
}
