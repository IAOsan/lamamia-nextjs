'use client';

import { useNotificationContext } from '@/context/Notification.context';
import { useEffect } from 'react';
import styles from './Notification.styles.module.css';

interface IProps {
	type?: 'success' | 'warning' | 'danger';
}

function Notification({ type }: IProps): JSX.Element | null {
	const { data, isVisible, hide } = useNotificationContext();

	useEffect(() => {
		let timer: NodeJS.Timeout;

		if (data?.autoClose) {
			timer = setTimeout(() => {
				hide();
			}, data.autoClose);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [data, hide]);

	if (!isVisible) return null;

	return (
		<div
			data-testid='notification'
			{...(data?.closeOnClick ? { onClick: hide } : {})}
			className={`${styles.wrapper} ${type ? styles[type] : ''}`}
		>
			<div className='container flex flex-ai-c flex-jc-sb'>
				<b className='h5'>{data?.title}</b>
				<p>{data?.message}</p>
			</div>
		</div>
	);
}

export default Notification;
