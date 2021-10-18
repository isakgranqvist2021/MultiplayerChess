/** @format */

import styled from 'styled-components';

const Header = styled.header`
	position: fixed;
	right: 0;
	width: calc(100% - 250px);
	background-color: #444444;
	padding: 1.3rem;

	.headerContent {
		width: 800px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	p {
		margin: 0;
		color: #fff;

		.key {
			color: #c975f7;
		}
	}

	@media (max-width: 1150px) {
		width: 100%;
	}
`;

const Avatar = styled.img`
	width: 30px;
	height: 30px;
	border-radius: 50%;
	margin-bottom: 5px;
`;

const Participants = styled.div`
	display: flex;
	gap: 25px;

	p {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;

export default function GameHeaderComponent(props: {
	connections: any[];
	roomId: string;
}): JSX.Element {
	return (
		<Header>
			<div className='headerContent'>
				<p>
					<span className='key'>Room ID:</span> {props.roomId}
				</p>

				<Participants>
					{props.connections.map((c: any) => (
						<p key={c.userId} id={`player-${c.role}`}>
							<Avatar src={c.picture} />
							<span>{c.role}</span>
						</p>
					))}
				</Participants>
			</div>
		</Header>
	);
}
