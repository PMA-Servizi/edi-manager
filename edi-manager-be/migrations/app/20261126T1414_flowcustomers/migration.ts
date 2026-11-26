#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/8b11a299517ae52e3485dab5cdbdf1f03a952dadddb12610f58245030ea543a1/contract';
import endContract from '../../snapshots/8b11a299517ae52e3485dab5cdbdf1f03a952dadddb12610f58245030ea543a1/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/950265b2330f9529ab568d5b72539e16c8a72bceb2fb43c9c35de62b1f0e9609/contract';
import startContract from '../../snapshots/950265b2330f9529ab568d5b72539e16c8a72bceb2fb43c9c35de62b1f0e9609/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropConstraint({
        schema: 'public',
        table: 'Flows',
        constraint: 'Flows_customer_id_fkey',
        kind: 'foreignKey',
      }),
      this.dropConstraint({
        schema: 'public',
        table: 'Flows',
        constraint: 'Flows_customer_id_company_id_edi_record_type_operation_union_ke',
      }),
      this.dropIndex({ schema: 'public', table: 'Flows', index: 'Flows_customer_id_idx_e16dfa6b' }),
      this.dropColumn({ schema: 'public', table: 'Flows', column: 'customer_id' }),
      this.createTable({
        schema: 'public',
        table: 'FlowCustomers',
        columns: [
          col('customerId', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
          col('flowId', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
        ],
        constraints: [primaryKey(['flowId', 'customerId'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Flows',
        constraint: 'Flows_company_id_edi_record_type_operation_union_key',
        columns: ['company_id', 'edi_record_type', 'operation', 'union'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'FlowCustomers',
        index: 'FlowCustomers_customerId_idx_b2a8a46c',
        columns: ['customerId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'FlowCustomers',
        index: 'FlowCustomers_flowId_idx_ff668f3c',
        columns: ['flowId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'FlowCustomers',
        foreignKey: {
          name: 'FlowCustomers_flowId_fkey',
          columns: ['flowId'],
          references: { schema: 'public', table: 'Flows', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'FlowCustomers',
        foreignKey: {
          name: 'FlowCustomers_customerId_fkey',
          columns: ['customerId'],
          references: { schema: 'public', table: 'Customers', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
