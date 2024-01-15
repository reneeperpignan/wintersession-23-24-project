import { doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { firebase_app } from "./firebase";
import { type Profile } from "./schema";

export const db = getFirestore(firebase_app);

export async function addNewProfile(profile: Profile) {
  // Variable to store the result of the operation
  const result = null;
  // Variable to store any error that occurs during the operation
  let error = null;

  try {
    // Separate the user ID from the profile data; user ID becomes document ID and the rest of the input object becomes the document data
    const { user_id, ...profileData } = profile;

    const newProfileRef = doc(db, "profiles", user_id);

    // Set the document with the provided data in the specified collection and ID
    await setDoc(newProfileRef, profileData);
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e;
  }

  // Return the result and error as an object
  return { result, error };
}

export async function updateProfile(profile: Profile) {
  // Variable to store the result of the operation
  const result = null;
  // Variable to store any error that occurs during the operation
  let error = null;

  try {
    // Separate the user ID from the profile data; user ID becomes document ID and the rest of the input object becomes the document data
    const { user_id, ...profileData } = profile;

    const newProfileRef = doc(db, "profiles", user_id);

    // Update the document with the provided data in the specified collection and ID
    await updateDoc(newProfileRef, profileData);
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e;
  }

  // Return the result and error as an object
  return { result, error };
}
