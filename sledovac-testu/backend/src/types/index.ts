export type UserRole = 'student' | 'admin';

export interface Role {
  role_ID: number;
  name: string;
}

export interface User {
  user_ID?: number;
  name: string;
  email: string;
  password_hash: string;
  created_at: string;
  Role_ID: number;
}

export interface Group {
  group_ID?: number;
  name: string;
  created_by: number;
  user_ID: number;
}

export interface GroupMembership {
  membership_ID?: number;
  group_ID: number;
  user_ID: number;
}

export interface Subject {
  subject_ID?: number;
  user_ID: number;
  name: string;
}

export interface Test {
  test_ID?: number;
  subject_ID: number;
  group_ID?: number;
  user_ID: number;
  name: string;
  date: string;
}

export interface LearningRecord {
  record_ID?: number;
  user_ID: number;
  test_ID?: number;
  subject_ID: number;
  minutes: number;
  created_at: string;
}