import type { CustomError } from './types.js';

export class BaseError {
  constructor(readonly error: CustomError) {}
}

export class EntityNotFoundError extends BaseError {
  constructor({ context, resource, message }: Omit<CustomError, 'slug'>) {
    super({
      slug: 'NOT_FOUND',
      context,
      resource,
      message,
    });
  }
}

export class DuplicatedEntityError extends BaseError {
  constructor({ context, resource, message }: Omit<CustomError, 'slug'>) {
    super({
      slug: 'DUPLICATED',
      context,
      resource,
      message,
    });
  }
}

export class DbUniqueConflictError {
  constructor(readonly fields: string[]) {}
}
