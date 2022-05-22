import axios from 'axios';
import { useEffect, useState } from 'react';
import { getRandomInt } from './helpers/getNumber';
import Board from './components/Board';
import ActionsMenu from './components/ActionsMenu';
import TopMenu from './components/TopMenu/TopMenu';
import theme from './theme';
import { messageData } from './store/messages';
import { ThemeProvider } from 'styled-components';
import { GAME_SETTINGS } from './helpers/gameSettings';
import './App.css';

function App() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isPokdexShow, setIsPokdexShow] = useState(false);
	const [isPokChoose, setIsPokChoose] = useState(false);
	const [isFightMode, setIsFightMode] = useState(false);
	const [isAttacking, setIsAttacking] = useState(false);
	const [dmg, setDmg] = useState();
	const [enemyDmg, setEnemyDmg] = useState();
	const [isGetDmg, setIsGetDmg] = useState();
	const [isEnemyGetDmg, setIsEnemyGetDmg] = useState();
	const [miss, setMiss] = useState();
	const [message, setMessage] = useState();
	const [pokemon, setPokemon] = useState();
	const [chosenPokemonId, setChosenPokemonId] = useState();
	const [pokedexData, setPokedexData] = useState([]);
	const [heroStats, setHeroStats] = useState({
		exp: GAME_SETTINGS.expStat,
		pokeball: GAME_SETTINGS.pokeballStat,
		search: GAME_SETTINGS.searchStat,
	});

	const getPokemon = () => {
		setIsLoaded(false);
		axios
			.get(`https://pokeapi.co/api/v2/pokemon/${getRandomInt(0, GAME_SETTINGS.poksNum)}`)
			.then((res) => {
				let pokemonId = res.data.id;
				while (pokemonId.toString().length < 3) {
					pokemonId = 0 + pokemonId.toString();
				}
				setPokemon({
					id: pokemonId,
					name: res.data.name,
					type: res.data.types[0].type.name,
					attack: res.data.stats[1].base_stat,
					def: res.data.stats[2].base_stat,
					exp: res.data.base_experience,
					hp: res.data.stats[0].base_stat,
					currentHp: res.data.stats[0].base_stat,
				});
			})
			.catch(function (error) {
				setIsLoaded(false);
				console.log(error);
				alert('Fetching fail');
			})
			.then(() => {
				setIsLoaded(true);
			});
	};
	const getYourFirstPokemon = () => {
		setIsLoaded(false);
		axios
			.get(`https://pokeapi.co/api/v2/pokemon/${getRandomInt(0, 905)}`)
			.then((res) => {
				let pokemonId = res.data.id;
				while (pokemonId.toString().length < 3) {
					pokemonId = 0 + pokemonId.toString();
				}
				setPokedexData([
					{
						id: pokemonId,
						name: res.data.name,
						type: res.data.types[0].type.name,
						attack: res.data.stats[1].base_stat,
						def: res.data.stats[2].base_stat,
						exp: res.data.base_experience,
						hp: res.data.stats[0].base_stat,
						currentHp: res.data.stats[0].base_stat,
					},
				]);
			})
			.then(() => {
				setIsLoaded(true);
			});
	};

	const animationEnd = () => {
		setIsEnemyGetDmg(false);
		setIsGetDmg(false);
		setMiss(false);
	};

	const catchPokemon = () => {
		if (heroStats.pokeball !== 0) {
			const pokemonNum = getRandomInt(0, pokemon.exp);
			const playerNum = getRandomInt(0, heroStats.exp);
			if (playerNum > pokemonNum) {
				setPokedexData([...pokedexData, pokemon]);
				setPokemon('');
				setMessage(messageData.catchSuccses);
			} else {
				setMiss(true);
				setTimeout(animationEnd, 1000);
			}

			setHeroStats({
				...heroStats,
				pokeball: heroStats.pokeball - 1,
			});
		} else {
			setMessage(messageData.pokeballNull);
		}
	};

	const getPokoemonId = (id) => {
		setChosenPokemonId(id);
		setIsPokChoose(false);
		setIsFightMode(true);
		setMessage('');
	};

	const attack = () => {
		setIsAttacking(true);
		const attackPower = pokedexData[chosenPokemonId].attack;
		const enemyDefPower = pokemon.def;
		let attack = getRandomInt(0, attackPower) - getRandomInt(0, enemyDefPower);
		if (attack < 0) {
			attack = 0;
			setDmg('Miss');
			setIsEnemyGetDmg(true);
			setTimeout(animationEnd, 1000);
		} else {
			setDmg(attack);
			setIsEnemyGetDmg(true);
			setTimeout(animationEnd, 1000);
		}
		const enemyHp = pokemon.currentHp - attack;
		setPokemon({ ...pokemon, currentHp: enemyHp });
		if (enemyHp <= 0) {
			setTimeout(() => {
				setIsFightMode(false);
				setIsAttacking(false);
				setMessage(messageData.win);
				setPokemon('');
				setHeroStats({ ...heroStats, exp: heroStats.exp + calculateExp(pokemon.exp) });
			}, 1000);
		} else {
			setTimeout(enemyAttack, 1100);
		}
	};

	const enemyAttack = () => {
		setIsAttacking(true);
		const enemyAttackPower = pokemon.attack;
		const defPower = pokedexData[chosenPokemonId].def;

		let enemyAttack = getRandomInt(0, enemyAttackPower) - getRandomInt(0, defPower);

		if (enemyAttack <= 0) {
			enemyAttack = 0;
			setEnemyDmg('Miss');
			setIsGetDmg(true);
			setTimeout(animationEnd, 1000);
		} else {
			setEnemyDmg(enemyAttack);
			setIsGetDmg(true);
			setTimeout(animationEnd, 1000);
		}
		const hp = pokedexData[chosenPokemonId].currentHp - enemyAttack;
		setPokedexData(
			pokedexData.filter((e, index) => {
				if (index === chosenPokemonId) {
					e.currentHp = hp;
				}
				return e;
			})
		);
		console.log(pokedexData, enemyDmg, hp);
		if (hp <= 0) {
			setTimeout(() => {
				setIsAttacking(false);
				setIsFightMode(false);
				setMessage(messageData.lose);
				setPokedexData(
					pokedexData.filter((e, index) => {
						return index !== chosenPokemonId;
					})
				);
			}, 1000);
		} else {
			setIsAttacking(false);
		}
	};

	const calculateExp = (pokemonExp) => {
		return Math.floor(pokemonExp * GAME_SETTINGS.percentExp);
	};

	const searchPokemon = () => {
		if (heroStats.search) {
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
					setMessage('');
					break;
				case 4:
					setHeroStats({
						...heroStats,
						search: heroStats.search - 1,
						pokeball: heroStats.pokeball + 1,
					});
					setPokemon('');
					setMessage(messageData.pokeball);
					break;
				case 5:
					setHeroStats({
						...heroStats,
						search: heroStats.search + 1,
					});
					setPokemon('');
					setMessage(messageData.device);
					break;
				case 6:
					setHeroStats({
						...heroStats,
						search: heroStats.search - 1,
					});
					setPokemon('');
					setMessage(messageData.nothing);
					break;

				default:
					setHeroStats({
						...heroStats,
						search: heroStats.search - 1,
					});
					setPokemon('');
					setMessage(messageData.nothing);
					break;
			}
		} else {
			setMessage(messageData.deviceNull);
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
					<TopMenu
						heroStats={heroStats}
						setIsPokdexShow={setIsPokdexShow}
						isPokdexShow={isPokdexShow}
						pokedexData={pokedexData}
						getPokoemonId={getPokoemonId}
						isPokChoose={isPokChoose}
					/>
					<Board
						isLoaded={isLoaded}
						isFightMode={isFightMode}
						isEnemyGetDmg={isEnemyGetDmg}
						isGetDmg={isGetDmg}
						dmg={dmg}
						enemyDmg={enemyDmg}
						message={message}
						miss={miss}
						pokemon={pokemon}
						pokedexData={pokedexData}
						chosenPokemonId={chosenPokemonId}
					/>
					<ActionsMenu
						isFightMode={isFightMode}
						catchPokemon={catchPokemon}
						isAttacking={isAttacking}
						attack={attack}
						pokemon={pokemon}
						searchPokemon={searchPokemon}
						pokedexData={pokedexData}
						setIsPokChoose={setIsPokChoose}
					/>
				</header>
			</div>
		</ThemeProvider>
	);
}

export default App;
