#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/ae36cb0af3efe42823df17c6913c377a6ddb7e660355270c8c40d1d207c4e777/contract';
import endContract from '../../snapshots/ae36cb0af3efe42823df17c6913c377a6ddb7e660355270c8c40d1d207c4e777/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  lit,
  primaryKey,
  sql,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'Companies',
        columns: [
          col('address', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('business_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('ccia', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('city', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('country', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
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
          col('id', 'character varying', { notNull: true, codecRef: { codecId: 'sql/varchar@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
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
          col('share_capital', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('slug', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Companies_edi_company_code_type_check_1b603106',
            sql`"edi_company_code_type" IN ('ZZ', '14')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'Customers',
        columns: [
          col('catalog_id', 'int4', {
            notNull: true,
            default: lit(1),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('id', 'character varying', { notNull: true, codecRef: { codecId: 'sql/varchar@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
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
        table: 'EdiTypes',
        columns: [
          col('id', 'character varying', { notNull: true, codecRef: { codecId: 'sql/varchar@1' } }),
          col('operation', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('record_type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'EdiTypes_operation_check_48aa35a1',
            sql`"operation" IN ('download', 'upload')`,
          ),
          checkExpression(
            'EdiTypes_record_type_check_46bef325',
            sql`"record_type" IN ('ANPROD', 'DESADV', 'ORDERS', 'ORDRSP', 'PACLIS', 'SELLIN', 'INVSUP', 'ORDLIS', 'REMADV', 'INVRPT', 'SLSRPT', 'PRICAT', 'NOTACC', 'NOTADD', 'ORDPRP')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'Files',
        columns: [
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('error_message', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('filename', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'character varying', { notNull: true, codecRef: { codecId: 'sql/varchar@1' } }),
          col('run_id', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('status', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression('Files_status_check_cf321638', sql`"status" IN ('success', 'fail')`),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'Habilitations',
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
          col('id', 'character varying', { notNull: true, codecRef: { codecId: 'sql/varchar@1' } }),
          col('interval', 'int2', { notNull: true, codecRef: { codecId: 'pg/int2@1' } }),
          col('last_run_id', 'character varying', { codecRef: { codecId: 'sql/varchar@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Runs',
        columns: [
          col('company_id', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('edi_type_id', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('error_message', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'character varying', { notNull: true, codecRef: { codecId: 'sql/varchar@1' } }),
          col('status', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Runs_status_check_5e80b506',
            sql`"status" IN ('queued', 'completed', 'failed')`,
          ),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Companies',
        constraint: 'Companies_division_key',
        columns: ['division'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Customers',
        constraint: 'Customers_sap_customer_number_key',
        columns: ['sap_customer_number'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'EdiTypes',
        constraint: 'EdiTypes_record_type_operation_key',
        columns: ['record_type', 'operation'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Habilitations',
        constraint: 'Habilitations_customer_id_company_id_edi_type_id_key',
        columns: ['customer_id', 'company_id', 'edi_type_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Files',
        index: 'Files_run_id_idx_61d39f90',
        columns: ['run_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Habilitations',
        index: 'Habilitations_company_id_idx_1303a718',
        columns: ['company_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Habilitations',
        index: 'Habilitations_customer_id_idx_e16dfa6b',
        columns: ['customer_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Habilitations',
        index: 'Habilitations_edi_type_id_idx_9bc9a9ac',
        columns: ['edi_type_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Habilitations',
        index: 'Habilitations_last_run_id_idx_c969e924',
        columns: ['last_run_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Runs',
        index: 'Runs_company_id_idx_1303a718',
        columns: ['company_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Runs',
        index: 'Runs_edi_type_id_idx_9bc9a9ac',
        columns: ['edi_type_id'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Files',
        foreignKey: {
          name: 'Files_run_id_fkey',
          columns: ['run_id'],
          references: { schema: 'public', table: 'Runs', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Habilitations',
        foreignKey: {
          name: 'Habilitations_customer_id_fkey',
          columns: ['customer_id'],
          references: { schema: 'public', table: 'Customers', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Habilitations',
        foreignKey: {
          name: 'Habilitations_company_id_fkey',
          columns: ['company_id'],
          references: { schema: 'public', table: 'Companies', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Habilitations',
        foreignKey: {
          name: 'Habilitations_edi_type_id_fkey',
          columns: ['edi_type_id'],
          references: { schema: 'public', table: 'EdiTypes', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Habilitations',
        foreignKey: {
          name: 'Habilitations_last_run_id_fkey',
          columns: ['last_run_id'],
          references: { schema: 'public', table: 'Runs', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Runs',
        foreignKey: {
          name: 'Runs_company_id_fkey',
          columns: ['company_id'],
          references: { schema: 'public', table: 'Companies', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Runs',
        foreignKey: {
          name: 'Runs_edi_type_id_fkey',
          columns: ['edi_type_id'],
          references: { schema: 'public', table: 'EdiTypes', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
