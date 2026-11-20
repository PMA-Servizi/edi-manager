#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/28d8ca4a0b42f1dde23941b33eb2fa20a450767f8575d022964667dbb38339a7/contract';
import endContract from '../../snapshots/28d8ca4a0b42f1dde23941b33eb2fa20a450767f8575d022964667dbb38339a7/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/ae36cb0af3efe42823df17c6913c377a6ddb7e660355270c8c40d1d207c4e777/contract';
import startContract from '../../snapshots/ae36cb0af3efe42823df17c6913c377a6ddb7e660355270c8c40d1d207c4e777/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  lit,
  primaryKey,
  sql,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropConstraint({
        schema: 'public',
        table: 'Runs',
        constraint: 'Runs_company_id_fkey',
        kind: 'foreignKey',
      }),
      this.dropConstraint({
        schema: 'public',
        table: 'Runs',
        constraint: 'Runs_edi_type_id_fkey',
        kind: 'foreignKey',
      }),
      this.dropColumn({ schema: 'public', table: 'Companies', column: 'ccia' }),
      this.dropColumn({ schema: 'public', table: 'Companies', column: 'slug' }),
      this.dropColumn({ schema: 'public', table: 'Customers', column: 'slug' }),
      this.dropCheckConstraint({
        schema: 'public',
        table: 'Files',
        constraint: 'Files_status_check_cf321638',
      }),
      this.dropColumn({ schema: 'public', table: 'Files', column: 'status' }),
      this.dropTable({ schema: 'public', table: 'Habilitations' }),
      this.dropCheckConstraint({
        schema: 'public',
        table: 'Runs',
        constraint: 'Runs_status_check_5e80b506',
      }),
      this.dropColumn({ schema: 'public', table: 'Runs', column: 'status' }),
      this.dropTable({ schema: 'public', table: 'EdiTypes' }),
      this.dropIndex({ schema: 'public', table: 'Runs', index: 'Runs_company_id_idx_1303a718' }),
      this.dropColumn({ schema: 'public', table: 'Runs', column: 'company_id' }),
      this.dropIndex({ schema: 'public', table: 'Runs', index: 'Runs_edi_type_id_idx_9bc9a9ac' }),
      this.dropColumn({ schema: 'public', table: 'Runs', column: 'edi_type_id' }),
      this.createTable({
        schema: 'public',
        table: 'Flows',
        columns: [
          col('company_id', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('customer_id', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('edi_record_type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('enabled', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('id', 'character varying', { notNull: true, codecRef: { codecId: 'sql/varchar@1' } }),
          col('interval', 'int2', { notNull: true, codecRef: { codecId: 'pg/int2@1' } }),
          col('last_run_id', 'character varying', { codecRef: { codecId: 'sql/varchar@1' } }),
          col('operation', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Flows_edi_record_type_check_54584439',
            sql`"edi_record_type" IN ('ANPROD', 'DESADV', 'ORDERS', 'ORDRSP', 'PACLIS', 'SELLIN', 'INVSUP', 'ORDLIS', 'REMADV', 'INVRPT', 'SLSRPT', 'PRICAT', 'NOTACC', 'NOTADD', 'ORDPRP')`,
          ),
          checkExpression(
            'Flows_operation_check_48aa35a1',
            sql`"operation" IN ('download', 'upload')`,
          ),
        ],
      }),
      this.addColumnWithTemporaryDefault({
        schema: 'public',
        table: 'Companies',
        column: 'cciaa',
        type: 'text',
        temporaryDefault: sql`''`,
      }),
      this.addRequiredColumnToEmptyTable({
        schema: 'public',
        table: 'Files',
        column: 'outcome',
        type: 'text',
      }),
      this.addRequiredColumnToEmptyTable({
        schema: 'public',
        table: 'Runs',
        column: 'flow_id',
        type: 'character varying',
      }),
      this.addRequiredColumnToEmptyTable({
        schema: 'public',
        table: 'Runs',
        column: 'outcome',
        type: 'text',
      }),
      this.addUnique({
        schema: 'public',
        table: 'Companies',
        constraint: 'Companies_edi_company_code_edi_company_code_type_key',
        columns: ['edi_company_code', 'edi_company_code_type'],
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'Files',
        constraint: 'Files_outcome_check_3f8f0072',
        expression: sql`"outcome" IN ('success', 'fail')`,
      }),
      this.addUnique({
        schema: 'public',
        table: 'Flows',
        constraint: 'Flows_customer_id_company_id_edi_record_type_operation_key',
        columns: ['customer_id', 'company_id', 'edi_record_type', 'operation'],
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'Runs',
        constraint: 'Runs_outcome_check_3f8f0072',
        expression: sql`"outcome" IN ('success', 'fail')`,
      }),
      this.createIndex({
        schema: 'public',
        table: 'Flows',
        index: 'Flows_company_id_idx_1303a718',
        columns: ['company_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Flows',
        index: 'Flows_customer_id_idx_e16dfa6b',
        columns: ['customer_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Flows',
        index: 'Flows_last_run_id_idx_c969e924',
        columns: ['last_run_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Runs',
        index: 'Runs_flow_id_idx_d9dab351',
        columns: ['flow_id'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Flows',
        foreignKey: {
          name: 'Flows_customer_id_fkey',
          columns: ['customer_id'],
          references: { schema: 'public', table: 'Customers', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Flows',
        foreignKey: {
          name: 'Flows_company_id_fkey',
          columns: ['company_id'],
          references: { schema: 'public', table: 'Companies', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Flows',
        foreignKey: {
          name: 'Flows_last_run_id_fkey',
          columns: ['last_run_id'],
          references: { schema: 'public', table: 'Runs', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Runs',
        foreignKey: {
          name: 'Runs_flow_id_fkey',
          columns: ['flow_id'],
          references: { schema: 'public', table: 'Flows', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
