import { OrderParser } from '@/modules/parsers/factory/OrderParser.js';
import { Parser } from '@/modules/parsers/factory/Parser.js';
import { EdiRecordType } from '@/modules/parsers/parsers.types.js';

// TODO: complete parsers

export const PARSERS_CONFIG: Record<
  EdiRecordType,
  {
    parserClass: new () => Parser;
  }
> = {
  ANPROD: { parserClass: OrderParser },
  DESADV: { parserClass: OrderParser },
  ORDERS: { parserClass: OrderParser },
  ORDRSP: { parserClass: OrderParser },
  PACLIS: { parserClass: OrderParser },
  SELLIN: { parserClass: OrderParser },
  INVSUP: { parserClass: OrderParser },
  ORDLIS: { parserClass: OrderParser },
  REMADV: { parserClass: OrderParser },
  INVRPT: { parserClass: OrderParser },
  SLSRPT: { parserClass: OrderParser },
  PRICAT: { parserClass: OrderParser },
  NOTACC: { parserClass: OrderParser },
  NOTADD: { parserClass: OrderParser },
  ORDPRP: { parserClass: OrderParser },
};
