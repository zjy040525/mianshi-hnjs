import type { InterviewStatus, Student, User } from '.';

type CommonType = {
  id: number;
  recordDate: string;
  recordUserId: number | null;
  recordUser: User | null;
  recordStudentId: string | null;
  recordStudent: Student | null;
};

type RecordType = 'Auth' | 'Sign' | 'Print' | 'Interview';

type AuthType = {
  recordType: 'Auth';
} & CommonType;

type SignType = {
  recordType: 'Sign';
} & CommonType;

type PrintType = {
  recordType: 'Print';
} & CommonType;

type InterviewType = {
  recordType: 'Interview';
  recordEarlyChildhoodEducationInterview: InterviewStatus;
  recordTourismManagementInterview: InterviewStatus;
  recordUrbanRailTransitInterview: InterviewStatus;
} & CommonType;

export type Log = AuthType | SignType | PrintType | InterviewType;
