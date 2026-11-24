#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/28d8ca4a0b42f1dde23941b33eb2fa20a450767f8575d022964667dbb38339a7/contract';
import startContract from '../../snapshots/28d8ca4a0b42f1dde23941b33eb2fa20a450767f8575d022964667dbb38339a7/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/950265b2330f9529ab568d5b72539e16c8a72bceb2fb43c9c35de62b1f0e9609/contract';
import endContract from '../../snapshots/950265b2330f9529ab568d5b72539e16c8a72bceb2fb43c9c35de62b1f0e9609/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropConstraint({
        schema: 'public',
        table: 'Flows',
        constraint: 'Flows_customer_id_company_id_edi_record_type_operation_key',
      }),
      this.addRequiredColumnToEmptyTable({
        schema: 'public',
        table: 'Customers',
        column: 'gln',
        type: 'character varying',
      }),
      this.addRequiredColumnToEmptyTable({
        schema: 'public',
        table: 'Flows',
        column: 'union',
        type: 'text',
      }),
      this.addUnique({
        schema: 'public',
        table: 'Customers',
        constraint: 'Customers_gln_key',
        columns: ['gln'],
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'Flows',
        constraint: 'Flows_union_check_031441ca',
        expression: sql`"union" IN ('metel', 'ediel')`,
      }),
      this.addUnique({
        schema: 'public',
        table: 'Flows',
        constraint: 'Flows_customer_id_company_id_edi_record_type_operation_union_ke',
        columns: ['customer_id', 'company_id', 'edi_record_type', 'operation', 'union'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
