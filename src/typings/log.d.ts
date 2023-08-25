import type { Student, User } from '.';

export interface Log {
  id: number;
  recordDate: string;
  recordUserId: number | null;
  recordUser: User | null;
  recordStudentId: string | null;
  recordStudent: Student | null;
  recordType: RecordType;
}

export type RecordType = 'Auth' | 'Sign' | 'Print' | 'Interview';
