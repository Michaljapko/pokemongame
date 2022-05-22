import Button from '../Button';

const ActionsMenu = ({ isFightMode, catchPokemon, isAttacking, attack, pokemon, searchPokemon, pokedexData, setIsPokChoose }) => {
	return (
		<>
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
							disabled={!pokedexData.length}
							action={() => {
								setIsPokChoose((prev) => !prev);
							}}
						>
							Fight
						</Button>
					)}
				</div>
			)}
		</>
	);
};

export default ActionsMenu;
