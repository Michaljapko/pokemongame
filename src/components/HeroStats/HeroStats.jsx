import { MdCatchingPokemon } from 'react-icons/md';

import { GiPokecog } from 'react-icons/gi';
import { StyledHeroStats } from './HeroStats.styled';

const HeroStats = ({ stats }) => {
	return (
		<StyledHeroStats>
			<div>
				<p>Exp</p>
				{stats.exp}
			</div>
			<div>
				<p>
					<GiPokecog />
				</p>
				<p>{stats.search}</p>
			</div>
			<div>
				<p>
					<MdCatchingPokemon />
				</p>
				<p>{stats.pokeball}</p>
			</div>
		</StyledHeroStats>
	);
};

export default HeroStats;
