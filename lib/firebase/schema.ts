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
  logo: ImageBitmap;
  directors: string[];
  members: string[];
  mailingList: string;
  clubType: string;
  website: string;
  compType: string;
  // think about how we want to do meeting time? two separate entries?
  meetingDay: string;
  meetingTime: string;
  timeCommitment: string;
}
