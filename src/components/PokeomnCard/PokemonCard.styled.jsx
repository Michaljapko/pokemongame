import styled from 'styled-components';

export const StyledPokemonCard = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	/* height: 18rem; */
	width: 12rem;
	font-size: 1rem;
	border: 2px solid;
	border-radius: 15px;
	padding: 0 1rem 1rem 1rem;
	font-weight: bold;
	text-transform: capitalize;
	background: linear-gradient(to bottom, rgb(43, 42, 42), rgb(27, 27, 27));
	border-color: ${({ type, theme }) => {
		return theme.pokemonColorType[type];
	}};
`;
export const StyledImgWrap = styled.div`
	background: linear-gradient(to bottom, rgb(60 60 60 / 59%), rgb(36 36 36));
	box-shadow: 0px -3px 4px 0px #ffffff30;
	border-radius: 50%;
`;
export const StyledHpBar = styled.div`
	align-self: flex-start;

	width: ${({ percent }) => {
		return percent;
	}}%;
	height: 5px;
	background-color: #98f598;
	border-radius: 5px;
	margin: 0.5rem 0;
`;
export const StyledPokemonImg = styled.img`
	width: 150px;
`;
export const StyledPokemonName = styled.p`
	font-size: 1.5rem;
`;

export const StyledPokemonId = styled.p`
	display: inline-block;
	align-self: flex-start;
	padding: 5px;
	border-radius: 15px;
	font-weight: bold;
	background-color: #282c34;
`;
export const StyledTextSmall = styled.p`
	font-size: 0.9rem;
	margin: 0.5rem;
	color: #adadad;
`;

export const StyledPokemonColumn = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	width: 100%;
	text-align: center;
	margin: 0.5rem;
`;
