export class HttpError extends Error {
	public statusCode: number | undefined;
	public reason: unknown;
	constructor({
		message,
		statusCode,
		reason,
	}: {
		message?: string;
		statusCode?: number;
		reason?: unknown;
	}) {
		super(message);
		this.name = 'HttpError';
		this.statusCode = statusCode;
		this.reason = reason;
	}
}
