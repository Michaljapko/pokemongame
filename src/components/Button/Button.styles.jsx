import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledButton = styled(motion.button)`
	color: white;
	border: none;
	background: rgb(53, 186, 176);
	padding: 1rem;
	font-size: 1rem;
	text-transform: uppercase;
	border-radius: 10px;
	letter-spacing: 2px;
	margin: 1rem;
	box-shadow: 0 10px 10px -5px rgb(0 0 0 / 5%);
	cursor: pointer;
	${(props) => props.disabled && `opacity:0.5;`}
`;
