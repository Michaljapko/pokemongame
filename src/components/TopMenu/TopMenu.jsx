import HeroStats from '../HeroStats';
import Button from '../Button';
import Pokedex from '../Pokedex';
import { StyledTopMenu } from './TopMenu.styled';
import { TEXTS } from '../../store/texts';

const TopMenu = ({ heroStats, setIsPokdexShow, isPokdexShow, pokedexData, getPokoemonId, isPokChoose }) => {
	return (
		<>
			<StyledTopMenu>
				<HeroStats stats={heroStats} />
				<Button
					disabled={!pokedexData.length}
					action={() => {
						setIsPokdexShow((prev) => !prev);
					}}
				>
					{isPokdexShow ? TEXTS.close : TEXTS.show} {TEXTS.pokedex} [{pokedexData.length}]
				</Button>
			</StyledTopMenu>

			{isPokdexShow && <Pokedex setIsPokdexShow={setIsPokdexShow} pokedexData={pokedexData} />}
			{isPokChoose && <Pokedex mode='choose' setIsPokdexShow={setIsPokdexShow} pokedexData={pokedexData} getId={getPokoemonId} />}
		</>
	);
};

export default TopMenu;
