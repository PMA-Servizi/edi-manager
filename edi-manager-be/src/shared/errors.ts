export class EntityNotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class DuplicatedEntityError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class DbUniqueConflictError {
  constructor(readonly constraint?: string) {}
}
