import { GenericObjectType } from '@/types/custom.types';

export * from './customErrors';
export * from './validationSchemas';

export function capitalize(str: string): string {
	return `${str[0].toUpperCase()}${str.substring(1)}`;
}

export function getSingularOrPluralWord(
	type: 'singular' | 'plural',
	word: string
): string {
	word = word.toLowerCase();

	// Palabras que no cambian (singular y plural son iguales)
	const wordsWithoutChange = ['deer', 'sheep', 'species' /* ... */];
	// Plurales irregulares (deben memorizarse)
	const irregularPlurals = new Map([
		['man', 'men'],
		['woman', 'women'],
	]);

	if (wordsWithoutChange.includes(word)) return word;

	if (type === 'singular') {
		const singularesIrregulares = new Map();
		// creates the same irregularplurals object but in vice versa
		irregularPlurals.forEach((key, value) => {
			singularesIrregulares.set(value, key);
		});

		if (singularesIrregulares.has(word)) {
			return singularesIrregulares.get(word);
		}
		// return original string if the word is singular
		if (!word.endsWith('s')) return word;

		// removes last char
		return word.split('').slice(0, -1).join('');
	}

	if (irregularPlurals.has(word)) return irregularPlurals.get(word) || word;
	// returns the original word if the word is plural
	if (word.endsWith('s')) return word;

	return word + 's';
}

export class JSONresponse {
	constructor() {}

	public static success(data: unknown): {
		ok: boolean;
		data: unknown;
		error: null;
	} {
		return {
			ok: true,
			data,
			error: null,
		};
	}

	public static error(error?: {
		statusCode?: number;
		message?: string;
		reason?: unknown;
	}): {
		ok: boolean;
		data: null;
		error: {
			statusCode: number;
			message: string;
			reason: unknown | null;
		};
	} {
		const message = error?.message || 'Something went wrong';
		const statusCode = error?.statusCode || 500;

		return {
			ok: false,
			data: null,
			error: {
				statusCode,
				message,
				reason: error?.reason || null,
			},
		};
	}
}

export function attachSearchParams(
	url: string,
	searchParams: GenericObjectType<string>
): string {
	const URLObject = new URL(url);
	for (const [key, value] of Object.entries(searchParams)) {
		if (value) {
			URLObject.searchParams.append(key, value);
		}
	}
	return URLObject.toString();
}
