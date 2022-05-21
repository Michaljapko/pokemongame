import { StyledBoard } from './Board.styled';
import animations from '../../animation/animations';
import { motion } from 'framer-motion';
import PokemonCard from '../PokeomnCard/PokemonCard';
const Board = ({ isLoaded, message, miss, isEnemyGetDmg, isGetDmg, dmg, enemyDmg, chosenPokemonId, pokemon, pokedexData, isFightMode }) => {
	console.log();
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
						Miss
					</motion.div>
					{!message && (
						<motion.div animate={isEnemyGetDmg ? animations.getHit : animations.default} transition={{ duration: 0.4 }}>
							<PokemonCard isGetDmg={isEnemyGetDmg} pokemon={pokemon} />
							<motion.div
								animate={isEnemyGetDmg ? animations.fightMessageShow : animations.default}
								style={{ position: 'absolute', opacity: 0, color: 'red' }}
								transition={{ duration: 1 }}
							>
								{dmg === 'Miss' ? dmg : '-' + dmg}
							</motion.div>
						</motion.div>
					)}
					{isFightMode && (
						<>
							<p>vs</p>
							<motion.div
								animate={miss ? animations.fightMessageShow : animations.default}
								style={{ position: 'absolute', opacity: 0, zIndex: 3 }}
								transition={{ duration: 1 }}
							>
								Miss
							</motion.div>
							<motion.div animate={isGetDmg ? animations.getHit : animations.default} transition={{ duration: 0.4 }}>
								<PokemonCard pokemon={pokedexData[chosenPokemonId]} />
								<motion.div
									animate={isGetDmg ? animations.fightMessageShow : animations.default}
									style={{ position: 'absolute', opacity: 0, color: 'red' }}
									transition={{ duration: 1 }}
								>
									{enemyDmg === 'Miss' ? enemyDmg : '-' + enemyDmg}
								</motion.div>
							</motion.div>
						</>
					)}
				</>
			)}
		</StyledBoard>
	);
};
export default Board;
