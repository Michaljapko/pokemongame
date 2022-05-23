import { StyledBoard, StyledFightInfo } from './Board.styled';
import animations from '../../animation/animations';
import { motion } from 'framer-motion';
import PokemonCard from '../PokeomnCard/PokemonCard';
import { TEXTS } from '../../store/texts';
import FightPopUp from '../FightPopUp/FightPopUp';
const Board = ({ isLoaded, message, miss, isEnemyGetDmg, isGetDmg, dmg, enemyDmg, chosenPokemonId, pokemon, pokedexData, isFightMode }) => {
	return (
		<StyledBoard>
			{isLoaded && (
				<>
					{message && (
						<motion.p initial={{ scale: 0.8 }} transition={{ duration: 0.2 }} animate={{ scale: 1 }}>
							{message}
						</motion.p>
					)}
					<motion.div
						animate={miss ? animations.fightMessageShow : animations.default}
						style={{ position: 'absolute', opacity: 0, zIndex: 3 }}
						transition={{ duration: 1 }}
					>
						{TEXTS.miss}
					</motion.div>
					{!message && (
						<motion.div animate={isEnemyGetDmg ? animations.getHit : animations.default} transition={{ duration: 0.4 }}>
							<PokemonCard isGetDmg={isEnemyGetDmg} pokemon={pokemon} />
							<FightPopUp isGetDmg={isEnemyGetDmg} dmg={dmg} />
						</motion.div>
					)}
					{isFightMode && (
						<>
							<p>{TEXTS.vs}</p>
							<StyledFightInfo
								animate={miss ? animations.fightMessageShow : animations.default}
								style={{ position: 'absolute', opacity: 0, zIndex: 3 }}
								transition={{ duration: 1 }}
							>
								{TEXTS.miss}
							</StyledFightInfo>
							<motion.div animate={isGetDmg ? animations.getHit : animations.default} transition={{ duration: 0.4 }}>
								<PokemonCard pokemon={pokedexData[chosenPokemonId]} />
								<FightPopUp isGetDmg={isGetDmg} dmg={enemyDmg} />
							</motion.div>
						</>
					)}
				</>
			)}
		</StyledBoard>
	);
};
export default Board;
