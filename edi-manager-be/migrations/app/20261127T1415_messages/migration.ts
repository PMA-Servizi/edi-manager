#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/8b11a299517ae52e3485dab5cdbdf1f03a952dadddb12610f58245030ea543a1/contract';
import startContract from '../../snapshots/8b11a299517ae52e3485dab5cdbdf1f03a952dadddb12610f58245030ea543a1/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/c2382e47fa8d7fcec1cdfc1a5caf08ece3c9fdd000523eef718aa2405abda56e/contract';
import endContract from '../../snapshots/c2382e47fa8d7fcec1cdfc1a5caf08ece3c9fdd000523eef718aa2405abda56e/contract.json' with { type: 'json' };
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
        table: 'FlowCustomers',
        constraint: 'FlowCustomers_customerId_fkey',
        kind: 'foreignKey',
      }),
      this.dropConstraint({
        schema: 'public',
        table: 'FlowCustomers',
        constraint: 'FlowCustomers_pkey',
        kind: 'primaryKey',
      }),
      this.dropCheckConstraint({
        schema: 'public',
        table: 'Files',
        constraint: 'Files_outcome_check_3f8f0072',
      }),
      this.dropColumn({ schema: 'public', table: 'Files', column: 'outcome' }),
      this.dropIndex({
        schema: 'public',
        table: 'FlowCustomers',
        index: 'FlowCustomers_customerId_idx_b2a8a46c',
      }),
      this.dropColumn({ schema: 'public', table: 'FlowCustomers', column: 'customerId' }),
      this.dropCheckConstraint({
        schema: 'public',
        table: 'Runs',
        constraint: 'Runs_outcome_check_3f8f0072',
      }),
      this.dropColumn({ schema: 'public', table: 'Runs', column: 'outcome' }),
      this.createTable({
        schema: 'public',
        table: 'Lines',
        columns: [
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'character varying', { notNull: true, codecRef: { codecId: 'sql/varchar@1' } }),
          col('message_id', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('status', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Lines_status_check_b21afeff',
            sql`"status" IN ('success', 'fail', 'skipped')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'Messages',
        columns: [
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('file_id', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('id', 'character varying', { notNull: true, codecRef: { codecId: 'sql/varchar@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('processing'),
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Messages_status_check_cdafa6fb',
            sql`"status" IN ('success', 'fail', 'skipped', 'processing')`,
          ),
        ],
      }),
      this.addColumn({
        schema: 'public',
        table: 'Files',
        column: col('status', 'text', {
          notNull: true,
          default: lit('processing'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'Runs',
        column: col('status', 'text', {
          notNull: true,
          default: lit('processing'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addRequiredColumnToEmptyTable({
        schema: 'public',
        table: 'Files',
        column: 'source',
        type: 'character varying',
      }),
      this.addRequiredColumnToEmptyTable({
        schema: 'public',
        table: 'FlowCustomers',
        column: 'customer_id',
        type: 'character varying',
      }),
      this.addPrimaryKey({
        schema: 'public',
        table: 'FlowCustomers',
        constraint: 'FlowCustomers_pkey',
        columns: ['flowId', 'customer_id'],
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'Files',
        constraint: 'Files_source_check_e103fa6f',
        expression: sql`"source" IN ('LOCAL')`,
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'Files',
        constraint: 'Files_status_check_a42ceca9',
        expression: sql`"status" IN ('success', 'fail', 'processing')`,
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'Runs',
        constraint: 'Runs_status_check_a42ceca9',
        expression: sql`"status" IN ('success', 'fail', 'processing')`,
      }),
      this.createIndex({
        schema: 'public',
        table: 'FlowCustomers',
        index: 'FlowCustomers_customer_id_idx_e16dfa6b',
        columns: ['customer_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Lines',
        index: 'Lines_message_id_idx_8a7ff1ba',
        columns: ['message_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Messages',
        index: 'Messages_file_id_idx_4f0f24cb',
        columns: ['file_id'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'FlowCustomers',
        foreignKey: {
          name: 'FlowCustomers_customer_id_fkey',
          columns: ['customer_id'],
          references: { schema: 'public', table: 'Customers', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Lines',
        foreignKey: {
          name: 'Lines_message_id_fkey',
          columns: ['message_id'],
          references: { schema: 'public', table: 'Messages', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Messages',
        foreignKey: {
          name: 'Messages_file_id_fkey',
          columns: ['file_id'],
          references: { schema: 'public', table: 'Files', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
