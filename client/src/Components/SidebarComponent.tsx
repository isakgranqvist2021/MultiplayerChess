/** @format */

import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled, { css } from 'styled-components';

const SidebarContainer = styled.div``;

const Button = styled('div')<{ open: boolean }>`
	display: none;
	transition: all 300ms ease;
	z-index: 5;
	width: 60px;
	height: 60px;
	background-color: #fff;
	padding: 0.5rem;
	border-radius: 50%;

	span {
		display: block;
		width: 75%;
		height: 2px;
		background-color: #333;
	}

	@media (max-width: 1150px) {
		position: fixed;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 8px;
		left: 0;
		margin: 10px 0 0 10px;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		cursor: pointer;

		&:hover {
			transform: scale(0.9);
		}

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
	border-right: 1px solid #fff;
	transition: all 300ms ease;

	@media (max-width: 1150px) {
		position: fixed;
		width: 0;
		overflow: hidden;
		border-right: none;
		z-index: 5;

		${(props) =>
			props.open &&
			css`
				width: 250px;
			`}
	}
`;

const Backdrop = styled('div')<{ open: boolean }>`
	position: fixed;
	inset: 0;
	z-index: 4;
	background-color: rgba(0, 0, 0, 0);
	pointer-events: none;
	transition: all 300ms ease;

	${(props) =>
		props.open &&
		css`
			cursor: pointer;
			pointer-events: all;
			background-color: rgba(0, 0, 0, 0.5);
		`}
`;

const SidebarContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	padding: 50px 20px 20px 20px;
	width: 250px;

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
				<span></span>
				<span></span>
				<span></span>
			</Button>
			<Backdrop open={open} onClick={() => setOpen(false)} />
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
