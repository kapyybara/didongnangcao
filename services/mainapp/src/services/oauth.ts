import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getProfile, removeProfile } from '../storages/profile';
// import { getProfile, removeProfile } from '../storages/profile';

export const register = async (email: string, pass: string) => {
  return auth()
    .createUserWithEmailAndPassword(email, pass)
    .then((data) => {
      console.log('User account created & signed in!');
      return data
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        throw new Error('That email address is invalid!');
      }

      console.error(error);
    });
};

export const signInUserPassword = async (email: string, pass: string) => {
  return auth()
    .signInWithEmailAndPassword(email, pass)
    .then(() => {
      console.log('login successful');
    })
    .catch(error => {
      console.log(error);
    });
};

export const signUpWithUserPassword = async (fullName: string, email: string, pass: string) => {
  return auth()
    .createUserWithEmailAndPassword(email, pass)
    .then((result) => {
      console.log('signup successful', result);
    })
    .catch(error => {
      console.log(error);
    });
};

export const sendResetPasswordRequest = async (email: string) => {
  return auth()
    .sendPasswordResetEmail(email)
    .then((result) => {
      console.log('reset successful');
      // if (result == null) {
      //   return "Account is not exist . Please try again"
      // }
      return ""
    })
    .catch((error: any) => {
      console.log(error);
      return "Error appear when send request"
    });

};

export const signOut = async () => {
  let data = await getProfile()
  await removeProfile(data);
  console.log('User signed out!');
  return await auth().signOut()
};
export async function signInWithGoogle() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}