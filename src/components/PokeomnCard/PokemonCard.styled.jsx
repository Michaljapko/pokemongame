import styled from 'styled-components';
import sparkle from '../../img/sparkles.gif';

export const StyledPokemonCard = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	position: relative;
	color: white;
	/* height: 18rem; */
	width: 12rem;
	font-size: 1rem;
	margin: 1rem 0;
	border: 2px solid;
	border-radius: 15px;
	padding: 0 1rem 1rem 1rem;
	font-weight: bold;
	text-transform: capitalize;
	background: linear-gradient(
		to bottom,
		rgb(43, 42, 42) 40%,
		${({ type, theme }) => {
				return theme.pokemonColorType[type];
			}}
			250%
	);
	box-shadow: 0 10px 10px -5px rgb(0 0 0 / 50%);
	border-color: ${({ type, theme }) => {
		return theme.pokemonColorType[type];
	}};

	${(props) => {
		if (props.epic)
			return `&::after {
		content: '';
		background-image: url(${sparkle});
		width: 100%;
		background-size: cover;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 1rem;
		opacity: 0.2;
		z-index: 0;`;
	}}
`;
export const StyledOpacityWrap = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	z-index: 1;
`;
export const StyledImgWrap = styled.div`
	background: linear-gradient(to bottom, rgb(60 60 60 / 59%), rgb(36 36 36));
	box-shadow: 3px 5px 5px 0px #00000033;
	border-radius: 50%;
`;
export const StyledHpBar = styled.div`
	align-self: flex-start;

	width: ${({ percent }) => {
		return percent;
	}}%;
	transition: 1s width;
	height: 5px;
	background-color: #98f598;
	border-radius: 5px;
	margin: 0.5rem 0;
`;
export const StyledPokemonImg = styled.img`
	height: 165px;
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
	color: #adadad;
`;

export const StyledPokemonColumn = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	width: 100%;
	text-align: center;
	margin: 0.5rem;
	background: #ffffff0d;
	border-radius: 10px;
	padding: 0.3rem;
`;
