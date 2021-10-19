/** @format */

import { useState } from 'react';
import styled from 'styled-components';

const Header = styled.header`
	position: fixed;
	right: 0;
	width: calc(100% - 250px);
	background-color: #7621a3;
	padding: 1rem 2rem;

	.headerContent {
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	p {
		margin: 0;
		color: #fff;

		.key {
			color: #ffffff;
			font-weight: 700;
		}
	}

	button {
		padding: 12px;
		width: 125px;
		margin-left: 5px;
	}

	.joinGameForm {
		display: flex;
	}

	input {
		width: 100%;
		padding: 12px;
	}

	@media (max-width: 1150px) {
		width: 100%;
	}
`;

const Avatar = styled('div')<{ src: string }>`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	margin-bottom: 5px;
	position: relative;
	background-image: url(${(props) => props.src});
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;

	&::before {
		content: '';
		position: absolute;
		inset: 0;
		background-color: #00000094;
		border-radius: 50%;
	}
`;

const Participants = styled.div`
	display: flex;
	gap: 25px;

	.avatarContainer {
		position: relative;

		span {
			color: #fff;
			font-weight: 700;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -60%);
			text-transform: uppercase;
		}
	}
`;

export default function GameHeaderComponent(props: {
	connections: any[];
	roomId: string;
	joinGame: any;
}): JSX.Element {
	const [rid, setRid] = useState<string>('');
	return (
		<Header>
			<div className='headerContent'>
				{props.roomId.length > 0 && (
					<p>
						<span className='key'>Room ID:</span> {props.roomId}
					</p>
				)}
				{props.roomId.length <= 0 && (
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
				)}
				<Participants>
					{props.connections.map((c: any) => (
						<div
							className='avatarContainer'
							key={c.userId}
							id={`player-${c.role}`}>
							<Avatar src={c.picture} />
							<span>{c.role[0]}</span>
						</div>
					))}
				</Participants>
			</div>
		</Header>
	);
}
