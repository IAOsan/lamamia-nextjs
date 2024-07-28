import styles from './loading.styles.module.css';

function Loading(): JSX.Element {
	return (
		<div className={styles.wrapper}>
			<div className={styles.spinner}></div>
		</div>
	);
}

export default Loading;
