import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledPopUp = styled(motion.p)`
	position: absolute;
	opacity: 0;
	z-index: 3;
	text-transform: capitalize;
	color: ${({ theme }) => theme.palleteColor.dmgInfo}; ;
`;
