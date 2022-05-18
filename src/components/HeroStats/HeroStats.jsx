import { MdCatchingPokemon } from 'react-icons/md';
import { GiCatch } from 'react-icons/gi';
import { GiPokecog } from 'react-icons/gi';

const HeroStats = ({ stats }) => {
	return (
		<div>
			<p>
				<GiCatch /> Trener Exp:{stats.exp}
			</p>
			<p>
				<GiPokecog /> Search Detector:{stats.search}
			</p>
			<p>
				<MdCatchingPokemon /> PokeBall: {stats.pokeball}
			</p>
		</div>
	);
};

export default HeroStats;
