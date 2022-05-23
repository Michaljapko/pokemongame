import { MdCatchingPokemon } from 'react-icons/md';
import { motion } from 'framer-motion';
import { GiPokecog } from 'react-icons/gi';
import { StyledHeroStats } from './HeroStats.styled';
import animations from '../../animation/animations';
import { TEXTS } from '../../store/texts';

const HeroStats = ({ stats }) => {
	return (
		<StyledHeroStats>
			<div>
				<p>{TEXTS.exp}</p>
				<motion.div key={stats.exp} variants={animations.text} animate={'show'} initial='hide'>
					<p>{stats.exp}</p>
				</motion.div>
			</div>
			<div>
				<p>
					<GiPokecog />
				</p>
				<motion.div key={stats.search} variants={animations.text} animate={'show'} initial='hide'>
					<p>{stats.search}</p>
				</motion.div>
			</div>
			<div>
				<p>
					<MdCatchingPokemon />
				</p>

				<motion.div key={stats.pokeball} variants={animations.text} animate={'show'} initial='hide'>
					<p>{stats.pokeball}</p>
				</motion.div>
			</div>
		</StyledHeroStats>
	);
};

export default HeroStats;
