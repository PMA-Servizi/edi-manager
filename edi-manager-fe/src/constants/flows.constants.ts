import type { FlowForm } from '@/types/flows.types'

export const DefaultFlowForm: FlowForm = {
  interval: 3600,
  operation: null,
  ediRecordType: null,
  company: null,
  customer: null,
}

export const FlowOperations: { value: string; label: string }[] = [
  {
    value: 'upload',
    label: 'Upload',
  },
  {
    value: 'download',
    label: 'Download',
  },
]

export const EdiRecordTypes: { value: string; label: string }[] = [
  { value: 'ANPROD', label: 'ANPROD - Anagrafico prodotti' },
  { value: 'DESADV', label: 'DESADV - Bolla di consegna' },
  { value: 'ORDERS', label: 'ORDERS - Ordine' },
  { value: 'ORDRSP', label: "ORDRSP - Conferma d'ordine" },
  { value: 'PACLIS', label: 'PACLIS - Packing list' },
  { value: 'SELLIN', label: 'SELLIN - Sell in' },
  { value: 'INVSUP', label: 'INVSUP - Stock disponibile' },
  { value: 'ORDLIS', label: 'ORDLIS - Order list' },
  { value: 'REMADV', label: 'REMADV - Avviso di pagamento' },
  { value: 'INVRPT', label: 'INVRPT - Inventario' },
  { value: 'SLSRPT', label: 'SLSRPT - Rapporto vendite' },
  { value: 'PRICAT', label: 'PRICAT - Listino prezzi' },
  { value: 'NOTACC', label: 'NOTACC - Nota di credito' },
  { value: 'NOTADD', label: 'NOTADD - Nota di debito' },
  { value: 'ORDPRP', label: "ORDPRP - Proposta d'ordine" },
]
