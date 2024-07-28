import { setupServer } from 'msw/node';
import { handlers } from './serverHandlers';

export const mockServer = setupServer(...handlers);
