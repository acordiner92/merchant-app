import { v4 as uuid } from 'uuid';

export const createUuid = (): string => uuid();

export type CreateUuid = typeof createUuid;
