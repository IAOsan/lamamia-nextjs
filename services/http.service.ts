async function httpRequest(
	url: string,
	options?: RequestInit | undefined
): Promise<Response> {
	try {
		const res = await fetch(url, options);
		const isClientError = res.status >= 400 && res.status < 500;

		if (!res.ok && !isClientError) throw new Error(res.statusText);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
}

const methods = {
	get(url: string, opts?: RequestInit): Promise<Response> {
		return httpRequest(url, opts);
	},
	post(url: string, data: unknown): Promise<Response> {
		return httpRequest(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	},
	delete(url: string): Promise<Response> {
		return httpRequest(url, {
			method: 'DELETE',
		});
	},
};

export default methods;
