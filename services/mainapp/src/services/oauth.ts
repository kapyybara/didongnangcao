import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const register = async (email: string, pass: string) => {
  return auth()
    .createUserWithEmailAndPassword(email, pass)
    .then(() => {
      console.log('User account created & signed in!');
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

export const signOut = async () => {
    console.log('signout')
  return auth()
    .signOut()
    .then(() => console.log('User signed out!'));
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