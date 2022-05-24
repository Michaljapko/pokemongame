import Button from '../Button';
import { StyledWrappActionMenu } from './ActionsMenu.styled';
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
				<StyledWrappActionMenu>
					<Button disabled={isAttacking} action={() => attack()}>
						{TEXTS.attack}
					</Button>
				</StyledWrappActionMenu>
			)}

			{!isFightMode && (
				<StyledWrappActionMenu>
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
				</StyledWrappActionMenu>
			)}
		</>
	);
};

export default ActionsMenu;
