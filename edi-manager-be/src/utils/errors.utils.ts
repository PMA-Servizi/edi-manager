export const isPostgresDbError = (
  err: unknown,
): err is { sqlState: string; detail?: string } => {
  return (
    typeof err === 'object' &&
    err !== null &&
    'sqlState' in err &&
    typeof err?.sqlState === 'string' &&
    'detail' in err &&
    typeof err?.detail === 'string'
  );
};

export const isDuplicatedDbError = (err: unknown): boolean => {
  if (!isPostgresDbError(err)) return false;
  return err.sqlState === '23505';
};

export const parseDuplicatedDbErrorDetail = (detail?: string): string[] => {
  if (!detail) return [];
  const match = detail?.match(/^Key \((.+?)\)=\(/);
  if (!match) return [];
  return match[1].split(',').map((f) => f.trim().replace(/^"(.*)"$/, '$1'));
};
