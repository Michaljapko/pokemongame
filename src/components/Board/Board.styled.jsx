import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledBoard = styled.div`
	display: flex;
	font-weight: bold;
	color: #201f1f;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	min-width: 700px;
	min-height: 475px;
	text-align: center;
	padding: 2rem;
	background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1139%26quot%3b)' fill='none'%3e%3cpath d='M 0%2c241 C 57.6%2c201.4 172.8%2c51.4 288%2c43 C 403.2%2c34.6 460.8%2c181.2 576%2c199 C 691.2%2c216.8 748.8%2c135.8 864%2c132 C 979.2%2c128.2 1036.8%2c202.6 1152%2c180 C 1267.2%2c157.4 1382.4%2c51.2 1440%2c19L1440 560L0 560z' fill='rgba(188%2c 253%2c 176%2c 0.45)'%3e%3c/path%3e%3cpath d='M 0%2c333 C 72%2c363 216%2c478.4 360%2c483 C 504%2c487.6 576%2c348.2 720%2c356 C 864%2c363.8 936%2c516.4 1080%2c522 C 1224%2c527.6 1368%2c411.6 1440%2c384L1440 560L0 560z' fill='rgba(133%2c 221%2c 48%2c 0.4)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1139'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
	border-radius: 1rem;
`;

export const StyledFightInfo = styled(motion.p)`
	position: absolute;
	opacity: 0;
	z-index: 3;
	color: white;
`;
