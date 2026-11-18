#!/usr/bin/env -S node
import { sql } from '@prisma/orm-postgres/builder/runtime';
import type {
  Contract as End,
  Contract as Start,
} from '../../snapshots/ea5d37eacbe5817e57192bc51d0d806a08b0d054ada75f891ac41fa20027953a/contract';
import endContract from '../../snapshots/ea5d37eacbe5817e57192bc51d0d806a08b0d054ada75f891ac41fa20027953a/contract.json' with { type: 'json' };
import startContract from '../../snapshots/ea5d37eacbe5817e57192bc51d0d806a08b0d054ada75f891ac41fa20027953a/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';
import {
  createExecutionContext,
  createSqlExecutionStack,
} from '@prisma/orm-postgres/family-runtime';
import postgresTarget, {
  PostgresContractSerializer,
} from '@prisma/orm-postgres/target/runtime';

const endContract = new PostgresContractSerializer().deserializeContract<End>(
  endContractJson,
);
const stack = createSqlExecutionStack({
  target: postgresTarget,
  adapter: postgresAdapter,
});

const db = sql<End>({
  context: createExecutionContext({ contract: endContract, stack }),
  rawCodecInferer: stack.adapter.rawCodecInferer,
});

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dataTransform(endContract, 'seed-companies', {
        run: () =>
          db.public.Company.insert([
            {
              name: 'Nital',
              slug: 'nital',
              division: 'Z001',
              edi_company_code: '06047610016',
              edi_company_code_type: 'ZZ',
              business_name: 'Nital S.p.A',
              address: 'Via Vittime di Piazza Fontana n. 54',
              city: 'Moncalieri',
              province: 'TO',
              postal_code: '10024',
              country: 'IT',
              court_of_law: null,
              ccia: '756023 del 28/1/1991',
              share_capital: '5.000.000 i.v.',
              raee_registration_number: 'IT08020000002546',
              pile_registration_number: 'IT09060P00000242',
            },
            {
              name: 'FOWA',
              slug: 'fowa',
              division: 'Z002',
              edi_company_code: '01187480015',
              edi_company_code_type: 'ZZ',
              business_name: 'Fowa S.p.A.',
              address: 'Via Vittime di Piazza Fontana n. 52/bis',
              city: 'Moncalieri',
              province: 'TO',
              postal_code: '10024',
              country: 'IT',
              court_of_law: null,
              ccia: '756023 del 28/1/1991',
              share_capital: '3.500.000 i.v.',
              raee_registration_number: 'IT08040000004702',
              pile_registration_number: 'IT09060P00000680',
            },
          ]),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
