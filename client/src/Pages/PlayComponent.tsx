/** @format */

import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import GameComponent from 'Components/GameComponent';
import SidebarComponent from 'Components/SidebarComponent';
import GameHeaderComponent from 'Components/GameHeaderComponent';
import styled from 'styled-components';
import { randId } from 'Utils/helpers';
import { game, resetGame, setPlayerRole } from 'Game/game';

const Main = styled.div`
	display: flex;
`;

export default function PlayComponent(): JSX.Element {
	const socket: WebSocket = new WebSocket('ws://localhost:8080');
	const { user, isLoading } = useAuth0();
	const [activeGame, setActiveGame] = useState<boolean>(false);
	const [roomId, setRoomId] = useState<string>('');
	const [connections, setConnections] = useState<any[]>([]);

	const startGame = () => {
		resetGame();

		const id = randId(25);
		setRoomId(id);

		send(
			JSON.stringify({
				type: 'open room',
				payload: {},
				uid: user?.sub,
				rid: id,
			})
		);

		return setActiveGame(true);
	};

	const joinGame = (rid: string) => {
		setRoomId(rid);

		send(
			JSON.stringify({
				type: 'join room',
				payload: {},
				uid: user?.sub,
				rid: rid,
			})
		);

		return setActiveGame(true);
	};

	const send = (payload: any) => {
		console.log(socket);

		if (socket.OPEN === 1) {
			return socket.send(payload);
		} else {
			return window.setTimeout(() => {
				send(payload);
			}, 2000);
		}
	};

	useEffect(() => {
		socket.onopen = () => {
			console.log('ws connection open');
		};

		socket.onclose = () => {
			console.log('ws connection closed');
		};

		socket.onmessage = (data: any) => {
			let payload = JSON.parse(data.data);

			console.log(payload);

			if (payload.type === 'open room' || payload.type === 'join room') {
				if (payload.uid === user?.sub) {
					setPlayerRole(
						payload.connections.find(
							(c: any) => c.userId === user?.sub
						).role
					);
				}

				return setConnections(payload.connections);
			}

			if (payload.type === 'player move' && payload.uid !== user?.sub) {
				return game.move(payload.from, payload.to);
			}
		};
	}, []);

	if (isLoading) {
		return <div>Loading ...</div>;
	}

	return (
		<Main>
			<GameHeaderComponent connections={connections} roomId={roomId} />
			<SidebarComponent startGame={startGame} joinGame={joinGame} />
			<GameComponent
				activeGame={activeGame}
				send={send}
				user={user}
				roomId={roomId}
			/>
		</Main>
	);
}
