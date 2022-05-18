import PokemonCard from '../PokeomnCard/PokemonCard';

const Pokedex = ({ pokedexData, mode, getId }) => {

	return (
		<div>
			{pokedexData.map((pokemon, index) => (
				<PokemonCard key={index} id={index} getId={getId} pokemon={pokemon} mode={mode} />
			))}
		</div>
	);
};

export default Pokedex;
