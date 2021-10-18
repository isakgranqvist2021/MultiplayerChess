/** @format */

import styled from 'styled-components';

const Header = styled.header`
	position: fixed;
	right: 0;
	width: calc(100% - 250px);
	background-color: #333;
	padding: 1rem;
	display: flex;
	justify-content: space-between;

	p {
		margin: 0;
		color: #fff;
	}

	@media (max-width: 1150px) {
		width: 100%;
	}
`;

export default function GameHeaderComponent(props: {
	connections: any[];
	roomId: string;
}): JSX.Element {
	return (
		<Header>
			<p>{props.roomId}</p>

			<div>
				{props.connections.map((c: any) => (
					<p key={c.userId}>
						{c.userId}: {c.role}
					</p>
				))}
			</div>
		</Header>
	);
}
