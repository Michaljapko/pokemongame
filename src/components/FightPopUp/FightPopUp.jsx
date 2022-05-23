import { StyledPopUp } from './FightPopUp.styled';
import animations from '../../animation/animations';
import { TEXTS } from '../../store/texts';

const FightPopUp = ({ isGetDmg, dmg }) => {
	return (
		<StyledPopUp animate={isGetDmg ? animations.fightMessageShow : animations.defaultHidden}>{dmg === TEXTS.miss ? dmg : '-' + dmg}</StyledPopUp>
	);
};

export default FightPopUp;
