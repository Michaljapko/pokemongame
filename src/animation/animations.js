export const animations = {
	text: {
		show: {
			opacity: 1,
			y: 0,
			transition: {
				ease: 'easeOut',
				duration: 0.3,
			},
		},
		hide: {
			y: -20,
			opacity: 0,
		},
	},
	default: { y: 0 },
	defaultHidden: { opacity: 0 },
	fightMessageShow: { y: [0, -100], opacity: [1, 0] },
	getHit: { x: [0, 10, 0, 5, 0] },
};

export default animations;
