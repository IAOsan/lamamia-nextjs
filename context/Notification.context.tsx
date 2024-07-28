import { createContext, useContext, useState } from 'react';

interface INotification {
	title: string;
	message: string;
	autoClose?: number;
	closeOnClick?: boolean;
}

interface IContext {
	data: INotification | null;
	isVisible: boolean;
	show: ({ title, message, autoClose }: INotification) => void;
	hide: () => void;
}

const NotificationContext = createContext<IContext>({
	data: null,
	isVisible: false,
	show: () => {},
	hide: () => {},
});

export function useNotificationContext() {
	const ctx = useContext(NotificationContext);

	if (!ctx)
		throw new Error(
			`The "useNotificationContext" should must be used within "NotificationContextProvider"`
		);

	return ctx;
}

interface IProps {
	children: React.ReactNode;
}

function NotificationContextProvider({ children }: IProps): JSX.Element {
	const [data, setData] = useState<INotification | null>(null);

	function show({
		title,
		message,
		autoClose,
		closeOnClick,
	}: INotification): void {
		setData({ title, message, autoClose, closeOnClick });
	}

	function hide(): void {
		setData(null);
	}

	return (
		<NotificationContext.Provider
			value={{ data, isVisible: !!data, show, hide }}
		>
			{children}
		</NotificationContext.Provider>
	);
}

export default NotificationContextProvider;
