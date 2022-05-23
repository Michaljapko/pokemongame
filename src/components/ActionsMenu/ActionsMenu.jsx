import Button from '../Button';
import { TEXTS } from '../../store/texts';

const ActionsMenu = ({
	isFightMode,
	catchPokemon,
	isAttacking,
	attack,
	pokemon,
	searchPokemon,
	pokedexData,
	setIsPokChoose,
	isPokemonLose,
	setIsPokemonLose,
}) => {
	return (
		<>
			{isFightMode && (
				<div className='dupa'>
					<Button disabled={isAttacking} action={() => attack()}>
						{TEXTS.attack}
					</Button>
				</div>
			)}

			{!isFightMode && (
				<div className='dupa'>
					{pokemon && !isPokemonLose && <Button action={() => catchPokemon()}> {TEXTS.catch}</Button>}
					<Button
						action={() => {
							searchPokemon();
							setIsPokemonLose(false);
						}}
					>
						{TEXTS.useSearchDevice}
					</Button>
					{pokemon && (
						<Button
							disabled={!pokedexData.length}
							action={() => {
								setIsPokChoose((prev) => !prev);
							}}
						>
							{isPokemonLose ? TEXTS.choosePok : TEXTS.fight}
						</Button>
					)}
				</div>
			)}
		</>
	);
};

export default ActionsMenu;
