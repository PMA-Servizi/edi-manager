export type LineIdentifier = 'BGM';

export type LineStatus = 'success' | 'fail' | 'skipped';

export interface Line {
  id: string;
  createdAt: Date;
  status: LineStatus;
}
