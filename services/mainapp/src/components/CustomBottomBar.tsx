import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from '../pages/Home/Home';

export default function CustomBottomBar({
}: any) {

  return  <Tab.Navigator>
  <Tab.Screen name="Home" component={Home} />
  <Tab.Screen name="Settings" component={Home} />
</Tab.Navigator>
  
}
