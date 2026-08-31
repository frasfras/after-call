export type PatientStatus = 'Needs Attention' | 'Normal' | 'Pending';

export interface CallTranscriptMessage {
  sender: 'ai' | 'patient';
  text: string;
  timestamp: string;
}

export interface CallRecord {
  id: string;
  callNumber: number;
  day: string; // e.g. "Day 3 Check-in"
  date: string;
  status: 'Needs Attention' | 'Normal' | 'Pending';
  flaggedReason?: string;
  summary: string;
  duration: string;
  transcript: CallTranscriptMessage[];
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  procedure: string;
  dischargeDate: string;
  attendingPhysician: string;
  careTeam: string;
  status: PatientStatus;
  flaggedReason?: string;
  lastCallDate: string;
  history: CallRecord[];
}

export interface DemoChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  text: string;
  timestamp: string;
}
