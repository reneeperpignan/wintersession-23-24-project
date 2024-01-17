// Type definitions for all Firestore collections

export interface Profile {
  user_id: string;
  display_name: string;
  biography: string;
}

// everything must be required
export interface Orgs {
  id: string;
  name: string;
  description: string;
  directors: string[];
  members: string[];
  mailinglist: string;
  type: string; //define a type,
  comptype: string;
  // think about how we want to do meeting time? two separate entries?
  meetingday: string;
  meetingtime: string;
  timelower: number; //these are the time commitment lower bound
  timeupper: number; //time commitment upper bound
  logo: string;
  website: string;
}

//optional input
// type?: string;
// type: string | null;

//enumerated types
// type: "Pre-Professional" | "cultural " | "Other"
