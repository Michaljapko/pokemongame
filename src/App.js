import axios from 'axios';
import { useEffect, useState } from 'react';
import { getRandomInt } from './helpers/getNumber';
import PokemonCard from './components/PokeomnCard/PokemonCard';
import HeroStats from './components/HeroStats';
import Pokedex from './components/Pokedex';
import Board from './components/Board';
import Button from './components/Button';
import theme from './theme';
import { motion } from 'framer-motion';
import { messageData } from './store/messages';
import { ThemeProvider } from 'styled-components';
import './App.css';

function App() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isPokdexShow, setIsPokdexShow] = useState(false);
	const [isPokChoose, setIsPokChoose] = useState(false);
	const [isFightMode, setIsFightMode] = useState(false);
	const [isAttacking, setIsAttacking] = useState(false);
	const [dmg, setDmg] = useState();
	const [enemyDmg, setEnemyDmg] = useState();
	const [isGetDmg, setIsGetDmg] = useState(false);
	const [isEnemyGetDmg, setIsEnemyGetDmg] = useState(false);
	const [message, setMessage] = useState();
	const [pokemon, setPokemon] = useState();
	const [chosenPokemonId, setChosenPokemonId] = useState();
	const [pokedexData, setPokedexData] = useState([]);
	const [heroStats, setHeroStats] = useState({
		exp: 100,
		pokeball: 50,
		search: 100,
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
	const animationEnd = () => {
		setIsEnemyGetDmg(false);
		setIsGetDmg(false);
	};

	const catchPokemon = () => {
		if (heroStats.pokeball !== 0) {
			const pokemonNum = getRandomInt(0, pokemon.base_experience);
			const playerNum = getRandomInt(0, heroStats.exp);
			if (playerNum > pokemonNum) {
				setPokedexData([...pokedexData, pokemon]);
				setPokemon('');
				setMessage(messageData.catchSuccses);
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
	};

	const attack = () => {
		setIsAttacking(true);
		const attackPower = pokedexData[chosenPokemonId].stats[1].base_stat;
		const enemyDefPower = pokemon.stats[2].base_stat;
		let attack = getRandomInt(0, attackPower) - getRandomInt(0, enemyDefPower);
		if (attack < 0) {
			attack = 0;
			setDmg('Miss');
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
			}, 1000);
		} else {
			setTimeout(enemyAttack, 1000);
		}
	};

	const enemyAttack = () => {
		setIsAttacking(true);
		const enemyAttackPower = pokemon.stats[1].base_stat;
		const defPower = pokedexData[chosenPokemonId].stats[2].base_stat;
		let enemyAttack = getRandomInt(0, enemyAttackPower) - getRandomInt(0, defPower);

		if (enemyAttack < 0) {
			enemyAttack = 0;
			setEnemyDmg('Miss');
		} else {
			setEnemyDmg(enemyAttack);
			setIsGetDmg(true);
			setTimeout(animationEnd, 1000);
		}
		const hp = pokedexData[chosenPokemonId].currentHp - enemyAttack;
		if (hp <= 0) {
			// setMessage(messageData.lose);
			// // pokedexData.splice(chosenPokemonId, 1);
			// // setPokedexData([...pokedexData]);
			// setIsPokChoose(true);
			console.log('dupa Przegrales');
		}
		pokedexData[chosenPokemonId].currentHp = hp;
		setPokedexData([...pokedexData]);
		setIsAttacking(false);
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
					<div>
						<div className='dupa2'>
							<HeroStats stats={heroStats} />
							<Button
								action={() => {
									setIsPokdexShow((prev) => !prev);
								}}
							>
								Show Pockedex [{pokedexData.length}]
							</Button>
						</div>

						{isPokdexShow && <Pokedex pokedexData={pokedexData} />}
						{isPokChoose && (
							<Pokedex mode='choose' pokedexData={pokedexData} getId={getPokoemonId} />
						)}
						<Board>
							{isLoaded && (
								<>
									{message && (
										<motion.p
											initial={{ scale: 0.8 }}
											transition={{ duration: 0.2 }}
											animate={{ scale: 1 }}
										>
											{message}
										</motion.p>
									)}
									{!message && (
										<motion.div
											animate={isEnemyGetDmg ? { x: [0, 10, 0, 5, 0] } : { x: 0 }}
											transition={{ duration: 0.4 }}
										>
											<PokemonCard isGetDmg={isEnemyGetDmg} pokemon={pokemon} />
											<motion.div
												animate={isEnemyGetDmg ? { y: [0, -100], opacity: [1, 0] } : { y: 0 }}
												style={{ position: 'absolute', opacity: 0, color: 'red' }}
												transition={{ duration: 1 }}
											>
												-{dmg}
											</motion.div>
										</motion.div>
									)}
									{isFightMode && (
										<>
											<p>vs</p>

											<motion.div
												animate={isGetDmg ? { x: [0, 10, 0, 5, 0] } : { x: 0 }}
												transition={{ duration: 0.4 }}
											>
												<PokemonCard pokemon={pokedexData[chosenPokemonId]} />
												<motion.div
													animate={isGetDmg ? { y: [0, -100], opacity: [1, 0] } : { y: 0 }}
													style={{ position: 'absolute', opacity: 0, color: 'red' }}
													transition={{ duration: 1 }}
												>
													-{enemyDmg}
												</motion.div>
											</motion.div>
										</>
									)}
								</>
							)}
						</Board>
						{isFightMode && (
							<div className='dupa'>
								<Button disabled={isAttacking} action={() => attack()}>
									Attack!
								</Button>
							</div>
						)}
						{!isFightMode && (
							<div className='dupa'>
								{pokemon && <Button action={() => catchPokemon()}> Catch</Button>}
								<Button
									action={() => {
										searchPokemon();
									}}
								>
									Use Search Detector
								</Button>
								{pokemon && (
									<Button
										action={() => {
											setIsPokChoose((prev) => !prev);
										}}
									>
										Fight
									</Button>
								)}
							</div>
						)}
					</div>
				</header>
			</div>
		</ThemeProvider>
	);
}

export default App;
