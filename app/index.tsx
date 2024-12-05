import { Text, View } from "react-native";
import WelcomePage from '../components/WelcomePage'
import {auth} from '../configs/FireBaseConfig'
import { Redirect } from "expo-router";
export default function Index() {

  const user = auth.currentUser;

  return (
    <View style={{ flex: 1}}>
      {user?
        <Redirect href={'/home'}/> : <WelcomePage/>
      }
    </View>
  );
}
