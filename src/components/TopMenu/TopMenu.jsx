import HeroStats from '../HeroStats';
import Button from '../Button';
import Pokedex from '../Pokedex';

const TopMenu = ({ heroStats, setIsPokdexShow, isPokdexShow, pokedexData, getPokoemonId, isPokChoose }) => {
	return (
		<>
			<div className='dupa2'>
				<HeroStats stats={heroStats} />
				<Button
					action={() => {
						setIsPokdexShow((prev) => !prev);
					}}
				>
					{isPokdexShow ? 'Close' : 'Show'} Pockedex [{pokedexData.length}]
				</Button>
			</div>

			{isPokdexShow && <Pokedex pokedexData={pokedexData} />}
			{isPokChoose && <Pokedex mode='choose' pokedexData={pokedexData} getId={getPokoemonId} />}
		</>
	);
};

export default TopMenu;
