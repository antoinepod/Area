import React, {useState} from 'react';
import { StyleSheet, DeviceEventEmitter } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginScreen from './components/login/Login'
import RegisterScreen from './components/register/Register'
import HomeScreen from './components/home/Home'
import NewCardScreen from './components/new_card/NewCard'
import SettingsScreen from './components/settings/Settings'


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

window.$ip = "";
window.$token = "";

function App() {
  const [ip, setIp] = useState("");

  DeviceEventEmitter.addListener("Login", (tmp) => {setIp(tmp)});

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Login"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#3A4065",
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: {
            paddingBottom: 5,
            fontSize: 10
          },
          tabBarStyle: [{ display: "flex", height: "7%"}],
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === "Home") { iconName = focused ? 'home-variant' : 'home-variant-outline'; }
            else if (rn === "New Card") { iconName = focused ? 'plus-box' : 'plus-box-outline'; }
            else if (rn === "Settings") { iconName = focused ? 'wrench' : 'wrench-outline'; }

            return <MaterialCommunityIcons name={iconName} size={size} color={color} style/>;
          },
        })} >

        <Tab.Screen name="Login" component={LoginScreen}
          options={{
            tabBarStyle: {display: 'none'},
            tabBarButton: (props) => null
          }}
        />
        <Tab.Screen name="Register" component={RegisterScreen}
          options={{
            tabBarStyle: {display: 'none'},
            tabBarButton: (props) => null
          }}
        />

        <Tab.Screen name="Home" component={HomeScreen}
          options={{
            tabBarStyle: styles.navBar
          }}
        />
        <Tab.Screen name="New Card" component={NewCardScreen}
          options={{
            tabBarStyle: styles.navBar
          }}
        />
        <Tab.Screen name="Settings" component={SettingsScreen}
          options={{
            tabBarStyle: styles.navBar
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navBar: {
    display: "flex",
    height: 60,
    width: "92%",
    backgroundColor: '#191D32',
    borderTopWidth: 0,
    borderRadius: 20,
    position: "absolute",
    marginLeft: "4%",
    marginRight: "4%",
    marginBottom: "2%"
  }
});

export default App;
