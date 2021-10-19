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
		setConnections([]);
		resetGame();

		const id = randId(25);
		setRoomId(id);

		send(
			JSON.stringify({
				type: 'open room',
				payload: {
					picture: user?.picture,
					nickname: user?.nickname,
				},
				uid: user?.sub,
				rid: id,
			})
		);

		return setActiveGame(true);
	};

	const joinGame = (rid: string) => {
		send(
			JSON.stringify({
				type: 'reset user',
				uid: user?.sub,
			})
		);

		setConnections([]);
		resetGame();
		setRoomId(rid);

		send(
			JSON.stringify({
				type: 'join room',
				payload: {
					picture: user?.picture,
					nickname: user?.nickname,
				},
				uid: user?.sub,
				rid: rid,
			})
		);

		return setActiveGame(true);
	};

	const send = (payload: any) => {
		if (socket.OPEN === 1) {
			return socket.send(payload);
		} else {
			window.alert('connection lost.. please reload window');
		}
	};

	const updatePlayerRole = (payload: any) => {
		if (payload.uid === user?.sub) {
			return setPlayerRole(
				payload.connections.find((c: any) => c.userId === user?.sub)
					.role
			);
		}

		return;
	};

	const syncGame = (rid: string) => {
		send(
			JSON.stringify({
				type: 'sync room',
				rid: rid,
				uid: user?.sub,
				payload: game.board.history,
			})
		);
	};

	const updateGame = (history: any) => {
		console.log(history);

		for (let i = 0; i < history.length; i++) {
			game.move(history[i].from, history[i].to);
		}

		return;
	};

	useEffect(() => {
		socket.onopen = () => {
			console.log('ws connection open');
			send(
				JSON.stringify({
					type: 'reset user',
					uid: user?.sub,
				})
			);
		};

		socket.onclose = () => {
			console.log('ws connection closed');
		};

		socket.onmessage = (data: any) => {
			let payload = JSON.parse(data.data);

			switch (payload.type) {
				case 'open room':
					updatePlayerRole(payload);
					return setConnections(payload.connections);
				case 'join room':
					updatePlayerRole(payload);
					syncGame(payload.id);
					return setConnections(payload.connections);
				case 'player move':
					if (payload.uid === user?.sub) return;
					return game.move(payload.from, payload.to);
				case 'sync room':
					if (payload.uid === user?.sub) return;
					return updateGame(payload.history);
				case 'leave room':
					return console.log(
						'leave room (remove user from connections)'
					);
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
