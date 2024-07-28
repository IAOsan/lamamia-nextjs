import { vi } from 'vitest';

export const Roboto = vi.fn().mockImplementation(() => ({
	fontFamily: 'Roboto',
}));

export const Roboto_Condensed = vi.fn().mockImplementation(() => ({
	fontFamily: 'Roboto Condensed',
}));
