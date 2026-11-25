import { Injectable, Logger, type NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, _: Response, next: NextFunction) {
    this.logger.debug(`${req.method} ${req.originalUrl}`);
    next();
  }
}
