interface IProps {
	name: 'profile' | 'close' | 'facebook' | 'instagram' | 'x' | 'youtube';
	size?: '2x';
	className?: string;
	inline?: boolean;
}

function Icon({ name, size, className, inline }: IProps): JSX.Element {
	const href = `/images/sprite.svg#icon-${name}`;
	const classname = `icon ${size ? `icon-${size}` : ''} ${className || ''} ${
		inline ? 'icon--inline' : ''
	}`;

	return (
		<svg className={classname}>
			<use xlinkHref={href}></use>
		</svg>
	);
}

export default Icon;
