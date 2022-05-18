import axios from 'axios';
import { useEffect, useState } from 'react';
import { getRandomInt } from './helpers/getNumber';
import PokemonCard from './components/PokeomnCard/PokemonCard';
import HeroStats from './components/HeroStats';
import Pokedex from './components/Pokedex';
import theme from './theme';
import { message } from './store/searchMessages';
import { ThemeProvider } from 'styled-components';
import './App.css';

function App() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isPokdexShow, setIsPokdexShow] = useState(false);
	const [isPokChoose, setIsPokChoose] = useState(false);
	const [isFightMode, setIsFightMode] = useState(false);
	const [searchMessage, setSearchMessage] = useState();
	const [pokemon, setPokemon] = useState();
	const [chosenPokemonId, setChosenPokemonId] = useState();
	const [pokedexData, setPokedexData] = useState([]);
	const [heroStats, setHeroStats] = useState({
		exp: 100,
		pokeball: 5,
		search: 10,
	});

	const getPokemon = () => {
		setIsLoaded(false);
		axios.get(`https://pokeapi.co/api/v2/pokemon/${getRandomInt(0, 800)}`).then((res) => {
			setPokemon({ ...res.data, currentHp: res.data.stats[0].base_stat });
			setIsLoaded(true);
		});
	};
	const getYourFirstPokemon = () => {
		setIsLoaded(false);
		axios.get(`https://pokeapi.co/api/v2/pokemon/${getRandomInt(0, 800)}`).then((res) => {
			setPokedexData([{ ...res.data, currentHp: res.data.stats[0].base_stat }]);
			setIsLoaded(true);
		});
	};

	const catchPokemon = () => {
		const pokemonNum = getRandomInt(0, pokemon.base_experience);
		const playerNum = getRandomInt(0, heroStats.exp);
		if (playerNum > pokemonNum) {
			setPokedexData([...pokedexData, pokemon]);
		}

		setHeroStats({
			...heroStats,
			pokeball: heroStats.pokeball - 1,
		});
	};

	const getPokoemonId = (id) => {
		setChosenPokemonId(id);
		setIsPokChoose(false);
		setIsFightMode(true);
	};

	const attack = () => {
		const attackPower = pokedexData[chosenPokemonId].stats[1].base_stat;
		const enemyAttackPower = pokemon.stats[1].base_stat;
		const defPower = pokedexData[chosenPokemonId].stats[2].base_stat;
		const enemyDefPower = pokemon.stats[2].base_stat;
		const enemyHp = pokemon.currentHp;
		let attack = getRandomInt(0, attackPower) - getRandomInt(0, enemyDefPower);
		if (attack < 0) {
			attack = 0;
		}
		setPokemon({ ...pokemon, currentHp: enemyHp - attack });
	};

	const searchPokemon = () => {
		const num = getRandomInt(0, 7);
		switch (num) {
			case 0:
			case 1:
			case 2:
			case 3:
				getPokemon();
				setHeroStats({
					...heroStats,
					search: heroStats.search - 1,
				});
				setSearchMessage('');
				break;
			case 4:
				setHeroStats({
					...heroStats,
					search: heroStats.search - 1,
					pokeball: heroStats.pokeball + 1,
				});
				setSearchMessage(message.pokeball);
				break;
			case 5:
				setHeroStats({
					...heroStats,
					search: heroStats.search + 1,
				});
				setSearchMessage(message.device);
				break;
			case 6:
				setHeroStats({
					...heroStats,
					search: heroStats.search - 1,
				});
				setSearchMessage(message.nothing);
				break;

			default:
				setHeroStats({
					...heroStats,
					search: heroStats.search - 1,
				});
				setSearchMessage(message.nothing);
				break;
		}
	};

	useEffect(() => {
		getPokemon();
		getYourFirstPokemon();
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<div className='App'>
				<header className='App-header'>
					{isLoaded && (
						<div>
							<HeroStats stats={heroStats} />
							{isPokdexShow && <Pokedex pokedexData={pokedexData} />}
							{isPokChoose && (
								<Pokedex mode='choose' pokedexData={pokedexData} getId={getPokoemonId} />
							)}
							{searchMessage && <p>{searchMessage}</p>}
							{!searchMessage && <PokemonCard pokemon={pokemon} />}
							{isFightMode && (
								<>
									<PokemonCard pokemon={pokedexData[chosenPokemonId]} />{' '}
									<button onClick={() => attack()}>Attack!</button>
								</>
							)}
							{!isFightMode && (
								<>
									<button onClick={() => catchPokemon()}> Catch</button>
									<button
										onClick={() => {
											searchPokemon();
										}}
									>
										Use Search Detector
									</button>
									<button
										onClick={() => {
											setIsPokChoose((prev) => !prev);
										}}
									>
										Fight
									</button>
									<button
										onClick={() => {
											getPokemon();
										}}
									>
										GetPokemon
									</button>
									<button
										onClick={() => {
											setIsPokdexShow((prev) => !prev);
										}}
									>
										ShowPockedex
									</button>
								</>
							)}
						</div>
					)}
				</header>
			</div>
		</ThemeProvider>
	);
}

export default App;
