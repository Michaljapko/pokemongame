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
import Button from '../Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const PokemonCard = ({ pokemon, mode = 'normal', id, getId }) => {
	const [isEpic, setIsEpic] = useState(false);
	const hp = pokemon.currentHp;

	function getHpPercent() {
		return (hp / pokemon.stats[0].base_stat) * 100;
	}
	useEffect(() => {
		pokemon.base_experience > 200 && setIsEpic(true);
	}, [pokemon.base_experience]);

	return (
		<AnimatePresence>
			<motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
				<StyledPokemonCard epic={isEpic} type={pokemon.types[0].type.name}>
					<StyledPokemonId>#{pokemon.id}</StyledPokemonId>
					<StyledImgWrap type={pokemon.types[0].type.name}>
						<StyledPokemonImg
							src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.id}.png`}
							alt={pokemon.name}
						/>
					</StyledImgWrap>
					<StyledPokemonName>{pokemon.name}</StyledPokemonName>
					<StyledHpBar percent={getHpPercent()} hp={pokemon.stats[0].base_stat}></StyledHpBar>
					<p>
						HP: {hp} / {pokemon.stats[0].base_stat}
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

					{mode === 'choose' && <Button onClick={() => getId(id)}>Choose</Button>}
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
			</motion.div>
		</AnimatePresence>
	);
};

export default PokemonCard;
