import { GoogleAuthProvider, getAdditionalUserInfo, getAuth, signInWithPopup } from "firebase/auth";
import { firebase_app } from "./firebase";
import { addNewProfile } from "./firestore";

export const auth = getAuth(firebase_app);

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);

    // If new user, add new entry to the profiles table
    const additionalInfo = getAdditionalUserInfo(result);
    if (additionalInfo?.isNewUser) {
      await addNewProfile({
        user_id: result.user.uid,
        display_name: result.user.providerData[0]?.displayName ?? "New User",
        biography: "",
      });
    }
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}
