import { db } from './db.js';

interface Company {
  name: string;
  slug: string;
  division: string;
  edi_company_code: string;
  edi_company_code_type: 'ZZ' | '14';
  business_name: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
  court_of_law: null;
  ccia: string;
  share_capital: string;
  raee_registration_number: string;
  pile_registration_number: string;
}

const companies: Company[] = [
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
];

try {
  await db.orm.public.Company.createAll(companies, { onConflict: 'skip' });
} finally {
  await db.close();
}
