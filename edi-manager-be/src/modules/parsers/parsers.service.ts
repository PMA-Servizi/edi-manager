import { Injectable } from '@nestjs/common';
import { Flow } from '../flows/flows.types.js';
import { PARSERS_CONFIG } from '@/config/parsers.config.js';
import type { Parser } from './factory/Parser.js';

@Injectable()
export class ParsersService {
  getParser(flow: Flow): Parser {
    const { parserClass } = PARSERS_CONFIG[flow.ediRecordType];
    return new parserClass();
  }
}
