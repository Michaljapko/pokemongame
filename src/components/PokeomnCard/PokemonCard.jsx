import {
	StyledPokemonCard,
	StyledPokemonImg,
	StyledPokemonName,
	StyledPokemonId,
	StyledPokemonColumn,
	StyledImgWrap,
	StyledHpBar,
	StyledTextSmall,
	StyledOpacityWrap,
} from './PokemonCard.styled';
import Button from '../Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { GAME_SETTINGS } from '../../helpers/gameSettings';
import { TEXTS } from '../../store/texts';

const PokemonCard = ({ pokemon, mode = 'normal', id, getId }) => {
	const [isEpic, setIsEpic] = useState(false);

	function getHpPercent() {
		return (pokemon.currentHp / pokemon.hp) * 100;
	}

	useEffect(() => {
		pokemon.exp > GAME_SETTINGS.epicExpPokemon && setIsEpic(true);
	}, [pokemon.exp]);


	return (
		<AnimatePresence>
			<motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
				<StyledPokemonCard epic={isEpic} type={pokemon.type}>
					<StyledOpacityWrap>
						<StyledPokemonId>#{pokemon.id}</StyledPokemonId>
						<StyledImgWrap type={pokemon.type}>
							<StyledPokemonImg src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.id}.png`} alt={pokemon.name} />
						</StyledImgWrap>
						<StyledPokemonName>{pokemon.name}</StyledPokemonName>
						<StyledHpBar percent={getHpPercent()} hp={pokemon.hp}></StyledHpBar>
						<p>
							{TEXTS.hp}: {pokemon.currentHp} / {pokemon.hp}
						</p>

						<StyledPokemonColumn>
							<div>
								<StyledTextSmall>{TEXTS.attack}</StyledTextSmall>
								<p>{pokemon.attack}</p>
							</div>
							<div>
								<StyledTextSmall>{TEXTS.def}</StyledTextSmall>
								<p>{pokemon.def}</p>
							</div>
						</StyledPokemonColumn>

						{mode === 'choose' && <Button action={() => getId(id)}>{TEXTS.choose}</Button>}
						{mode === 'normal' && (
							<StyledPokemonColumn>
								<div>
									<StyledTextSmall>{TEXTS.type}</StyledTextSmall>
									<p>{pokemon.type}</p>
								</div>

								<div>
									<StyledTextSmall>{TEXTS.exp}</StyledTextSmall>
									<p>{pokemon.exp}</p>
								</div>
							</StyledPokemonColumn>
						)}
					</StyledOpacityWrap>
				</StyledPokemonCard>
			</motion.div>
		</AnimatePresence>
	);
};

export default PokemonCard;
