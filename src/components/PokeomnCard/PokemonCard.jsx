import {
	StyledPokemonCard,
	StyledPokemonImg,
	StyledPokemonName,
	StyledPokemonId,
	StyledPokemonColumn,
	StyledImgWrap,
	StyledHpBar,
	StyledTextSmall,
} from './PokemonCard.styled';

const PokemonCard = ({ pokemon, mode = 'normal', id, getId }) => {
	function getHpPercent() {
		console.log(Math.floor(pokemon.currentHp / pokemon.stats[0].base_stat) * 100);
		return (pokemon.currentHp / pokemon.stats[0].base_stat) * 100;
	}
	return (
		<StyledPokemonCard type={pokemon.types[0].type.name}>
			<StyledPokemonId>#{pokemon.id}</StyledPokemonId>
			<StyledImgWrap type={pokemon.types[0].type.name}>
				<StyledPokemonImg src={pokemon.sprites.front_default} alt={pokemon.name} />
			</StyledImgWrap>
			<StyledPokemonName>{pokemon.name}</StyledPokemonName>
			<StyledHpBar percent={getHpPercent()} hp={pokemon.stats[0].base_stat}></StyledHpBar>
			<p>
				HP: {pokemon.currentHp} / {pokemon.stats[0].base_stat}
			</p>

			<StyledPokemonColumn>
				<div>
					<StyledTextSmall>Attack</StyledTextSmall>
					<p>{pokemon.stats[1].base_stat}</p>
				</div>
				<div>
					<StyledTextSmall>Def</StyledTextSmall>
					<p>{pokemon.stats[2].base_stat}</p>
				</div>
			</StyledPokemonColumn>

			{mode === 'choose' && <button onClick={() => getId(id)}>choose</button>}
			{mode === 'normal' && (
				<StyledPokemonColumn>
					<div>
						<StyledTextSmall>Type</StyledTextSmall>
						<p>{pokemon.types[0].type.name}</p>
					</div>

					<div>
						<StyledTextSmall>Exp</StyledTextSmall>
						<p>{pokemon.base_experience}</p>
					</div>
				</StyledPokemonColumn>
			)}
		</StyledPokemonCard>
	);
};

export default PokemonCard;
