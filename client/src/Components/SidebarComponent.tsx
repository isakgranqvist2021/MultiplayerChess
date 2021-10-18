/** @format */

import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled, { css } from 'styled-components';

const SidebarContainer = styled.div``;

const Button = styled('button')<{ open: boolean }>`
	display: none;

	@media (max-width: 1150px) {
		position: fixed;
		display: block;
		left: 0;

		${(props) =>
			props.open &&
			css`
				left: 250px;
			`}
	}
`;

const Sidebar = styled('aside')<{ open: boolean }>`
	height: 100vh;
	background-color: #333;
	width: 250px;

	@media (max-width: 1150px) {
		position: fixed;
		width: 0;
		overflow: hidden;

		${(props) =>
			props.open &&
			css`
				width: 250px;
			`}
	}
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

	.joinGameForm {
		margin-top: 10px;
	}

	input {
		width: 100%;
		margin-bottom: 10px;
		padding: 12px;
	}

	.joinGameBtn {
	}
`;

export default function SidebarComponent(props: {
	startGame: any;
	joinGame: any;
}): JSX.Element {
	const [rid, setRid] = useState<string>('');
	const { user, isLoading, logout } = useAuth0();
	const [open, setOpen] = useState<boolean>(false);

	if (isLoading) {
		return <Sidebar open={open}>Loading ...</Sidebar>;
	}

	return (
		<SidebarContainer>
			<Button open={open} onClick={() => setOpen(!open ? true : false)}>
				Toggle
			</Button>
			<Sidebar open={open}>
				<SidebarContent>
					<div>
						<img src={user?.picture} alt={user?.name} />
						<h2>{user?.name}</h2>
						<p>{user?.email}</p>
						<button onClick={props.startGame}>New Game</button>

						<div className='joinGameForm'>
							<input
								value={rid}
								placeholder='cf1hc2jnbf93e6vo8_y6e_255'
								onChange={(e: any) => setRid(e.target.value)}
							/>
							<button
								disabled={rid.length <= 0}
								onClick={() => props.joinGame(rid)}
								className='joinGameBtn'>
								Join Game
							</button>
						</div>
					</div>

					<button onClick={() => logout()}>Logout</button>
				</SidebarContent>
			</Sidebar>
		</SidebarContainer>
	);
}
