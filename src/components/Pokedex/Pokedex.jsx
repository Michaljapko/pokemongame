import PokemonCard from '../PokeomnCard/PokemonCard';
import { StyledPokedex } from './Pokedex.styled';

const Pokedex = ({ pokedexData, mode, getId }) => {
	return (
		<StyledPokedex>
			{pokedexData.map((pokemon, index) => (
				<PokemonCard key={index} id={index} getId={getId} pokemon={pokemon} mode={mode} />
			))}
		</StyledPokedex>
	);
};

export default Pokedex;
