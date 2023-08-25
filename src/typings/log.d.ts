export interface Log {
  id: number;
  message: string;
  recordDate: string;
  recordUserId: number;
  recordStudentId: string | null;
  recordType: RecordType;
}

export type RecordType = 'Auth' | 'Sign' | 'Print' | 'Interview';
