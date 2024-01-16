// Type definitions for all Firestore collections

import { type } from "os";

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
  members: string[];
  mailinglist: string;
  type: string;
  comptype: string;
  // think about how we want to do meeting time? two separate entries?
  meetingtime: string;
  timecommitment: string;
}
