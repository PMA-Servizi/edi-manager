import { HttpException, HttpStatus } from '@nestjs/common';
import type { CustomError } from './types.js';

export class CustomException extends HttpException {
  constructor(error: CustomError, statusCode: number) {
    super(error, statusCode);
  }
}

export class NotFoundException extends CustomException {
  constructor(error: CustomError) {
    super(error, HttpStatus.NOT_FOUND);
  }
}

export class DuplicatedException extends CustomException {
  constructor(error: CustomError) {
    super(error, HttpStatus.CONFLICT);
  }
}
