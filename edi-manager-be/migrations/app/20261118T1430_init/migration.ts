#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/ea5d37eacbe5817e57192bc51d0d806a08b0d054ada75f891ac41fa20027953a/contract';
import endContractJson from '../../snapshots/ea5d37eacbe5817e57192bc51d0d806a08b0d054ada75f891ac41fa20027953a/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  lit,
  primaryKey,
  sql,
} from '@prisma/orm-postgres/migration';
import postgresAdapter from '@prisma/orm-postgres/adapter/runtime';
import { sql as queryBuilder } from '@prisma/orm-postgres/builder/runtime';
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

const db = queryBuilder<End>({
  context: createExecutionContext({ contract: endContract, stack }),
  rawCodecInferer: stack.adapter.rawCodecInferer,
});

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContractJson;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'Company',
        columns: [
          col('address', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('business_name', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('ccia', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('city', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('country', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('court_of_law', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('division', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('edi_company_code', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('edi_company_code_type', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'pg/varchar@1' },
          }),
          col('id', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('name', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('pile_registration_number', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('postal_code', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('province', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('raee_registration_number', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('share_capital', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('slug', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Company_edi_company_code_type_check_1b603106',
            sql`"edi_company_code_type" IN ('ZZ', '14')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'Customer',
        columns: [
          col('catalog_id', 'int4', {
            notNull: true,
            default: lit(1),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('id', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('name', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('sap_customer_number', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('slug', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'EdiType',
        columns: [
          col('id', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('name', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('operation', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'EdiType_operation_check_48aa35a1',
            sql`"operation" IN ('download', 'upload')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'File',
        columns: [
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            codecRef: {
              codecId: 'pg/timestamptz-date@1',
              typeParams: { precision: 3 },
            },
          }),
          col('error_message', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('filename', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('id', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('run_id', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('status', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'File_status_check_cf321638',
            sql`"status" IN ('success', 'fail')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'Habilitation',
        columns: [
          col('company_id', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('customer_id', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('edi_type_id', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('enabled', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('id', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('interval', 'int2', {
            notNull: true,
            codecRef: { codecId: 'pg/int2@1' },
          }),
          col('last_run_id', 'character varying', {
            codecRef: { codecId: 'sql/varchar@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Run',
        columns: [
          col('company_id', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            codecRef: {
              codecId: 'pg/timestamptz-date@1',
              typeParams: { precision: 3 },
            },
          }),
          col('edi_type_id', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('error_message', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('status', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updated_at', 'timestamptz(3)', {
            notNull: true,
            codecRef: {
              codecId: 'pg/timestamptz-date@1',
              typeParams: { precision: 3 },
            },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Run_status_check_5e80b506',
            sql`"status" IN ('queued', 'completed', 'failed')`,
          ),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Company',
        constraint: 'Company_division_key',
        columns: ['division'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Customer',
        constraint: 'Customer_sap_customer_number_key',
        columns: ['sap_customer_number'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'EdiType',
        constraint: 'EdiType_name_operation_key',
        columns: ['name', 'operation'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Habilitation',
        constraint: 'Habilitation_customer_id_company_id_edi_type_id_key',
        columns: ['customer_id', 'company_id', 'edi_type_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'File',
        index: 'File_run_id_idx_61d39f90',
        columns: ['run_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Habilitation',
        index: 'Habilitation_company_id_idx_1303a718',
        columns: ['company_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Habilitation',
        index: 'Habilitation_customer_id_idx_e16dfa6b',
        columns: ['customer_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Habilitation',
        index: 'Habilitation_edi_type_id_idx_9bc9a9ac',
        columns: ['edi_type_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Habilitation',
        index: 'Habilitation_last_run_id_idx_c969e924',
        columns: ['last_run_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Run',
        index: 'Run_company_id_idx_1303a718',
        columns: ['company_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Run',
        index: 'Run_edi_type_id_idx_9bc9a9ac',
        columns: ['edi_type_id'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'File',
        foreignKey: {
          name: 'File_run_id_fkey',
          columns: ['run_id'],
          references: { schema: 'public', table: 'Run', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Habilitation',
        foreignKey: {
          name: 'Habilitation_customer_id_fkey',
          columns: ['customer_id'],
          references: { schema: 'public', table: 'Customer', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Habilitation',
        foreignKey: {
          name: 'Habilitation_company_id_fkey',
          columns: ['company_id'],
          references: { schema: 'public', table: 'Company', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Habilitation',
        foreignKey: {
          name: 'Habilitation_edi_type_id_fkey',
          columns: ['edi_type_id'],
          references: { schema: 'public', table: 'EdiType', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Habilitation',
        foreignKey: {
          name: 'Habilitation_last_run_id_fkey',
          columns: ['last_run_id'],
          references: { schema: 'public', table: 'Run', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Run',
        foreignKey: {
          name: 'Run_company_id_fkey',
          columns: ['company_id'],
          references: { schema: 'public', table: 'Company', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Run',
        foreignKey: {
          name: 'Run_edi_type_id_fkey',
          columns: ['edi_type_id'],
          references: { schema: 'public', table: 'EdiType', columns: ['id'] },
        },
      }),
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
