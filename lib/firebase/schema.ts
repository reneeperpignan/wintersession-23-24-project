// Type definitions for all Firestore collections

export interface Profile {
  user_id: string;
  display_name: string;
  biography: string;
}

export interface Orgs {
  id: string;
  name: string;
  description: string;
  directors: string[];
  comping: string[];
  members: string[];
  mailinglist: string;
  type: string;
  comptype: string;
  meetingday: string;
  meetingtime: string;
  timelower: number;
  timeupper: number;
  logo: string;
  website: string;
}

//optional input
// type?: string;
// type: string | null;

//enumerated types
// type: "Pre-Professional" | "cultural " | "Other"
