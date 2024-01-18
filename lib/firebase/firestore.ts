import { collection, doc, getFirestore, setDoc, addDoc, updateDoc } from "firebase/firestore";
import { firebase_app } from "./firebase";
import { type Profile } from "./schema";
import { type User } from "@/node-modules/@firebase/auth/dist/auth-public.d.ts"

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

// two arguments: formData for new org as well as the signed-in user as the default director
export async function AddNewOrgs(formData: FormData, user) {
  // Variable to store the result of the operation
  let result = null;
  // Variable to store any error that occurs during the operation
  let error = null;

  try {
    const orgsCollectionRef = collection(db, "orgs"); // will generate new id key
    // Set the document with the provided data in the specified collection and ID
    const docRef = await addDoc(orgsCollectionRef, {
      name: formData.name,
      description : formData.description,
      type : formData.type,
      comptype: formData.comptype,
      mailinglist : formData.mailinglist,
      meetingday: formData.meetingday,
      meetingtime: formData.meetingtime,
      timelower : formData.timelower,
      timeupper : formData.timeupper,
      website : formData.website,
      logo : formData.logo,
      directors : [user.uid],
      members : [user.uid]
    });
    result = `Document written with ID: ${docRef.id}`;
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e;
    console.error("Error adding document: ", e)
  }
  // Return the result and error as an object
  return { result, error };
}
