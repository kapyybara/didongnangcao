import {Text, Button} from 'react-native-paper';
import { signOut } from '../../services/oauth';

const Profile = () => {
  return <Button onPress={signOut}>Logout</Button>
};

export default Profile;
