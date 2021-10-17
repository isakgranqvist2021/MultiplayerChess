/** @format */

import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import GameComponent from 'Components/GameComponent';
import SidebarComponent from 'Components/SidebarComponent';
import styled from 'styled-components';

const Main = styled.div`
	display: flex;
`;

export default function PlayComponent(): JSX.Element {
	const [activeGame, setActiveGame] = useState<boolean>(false);
	const { user, isLoading } = useAuth0();

	if (isLoading) {
		return <div>Loading ...</div>;
	}

	const startGame = () => {
		setActiveGame(true);
	};

	return (
		<Main>
			<SidebarComponent startGame={startGame} />
			<GameComponent activeGame={activeGame} />
		</Main>
	);
}
