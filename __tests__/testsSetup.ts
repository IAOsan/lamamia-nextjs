import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { mockServer } from './mocks/server';
import { cleanup } from './testsUtils';

// clean document
afterEach(cleanup);
afterEach(() => {
	vi.restoreAllMocks();
});

// mock server
// Enable request interception.
beforeAll(() => mockServer.listen());

// Reset handlers so that each test could alter them
// without affecting other, unrelated tests.
afterEach(() => mockServer.resetHandlers());

// Don't forget to clean up afterwards.
afterAll(() => mockServer.close());
