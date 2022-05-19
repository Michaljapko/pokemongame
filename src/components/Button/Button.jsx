import { StyledButton } from './Button.styles';
import { motion } from 'framer-motion';
const Button = ({ children, action, disabled }) => {
	return (
		<StyledButton
			as={motion.button}
			initial={{ scale: 0.7 }}
			animate={{ scale: 1 }}
			whileTap={{ scale: 0.95, backgroundColor: 'rgb(24 92 87)' }}
			onClick={action}
			disabled={disabled}
		>
			{children}
		</StyledButton>
	);
};

export default Button;
