import React, {Node, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert,
  ToastAndroid,
  DeviceEventEmitter,
  Keyboard
} from 'react-native';
import Dialog from "react-native-dialog";
import axios from 'axios';
import { FAB } from "react-native-paper";
import SyncStorage from 'sync-storage';
import { GoogleSignin } from '@react-native-community/google-signin';


export default function ({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visibleIp, setVisibleIp] = useState("");
  const [tmpIp, setTmpIp] = useState("");
  const [hidePass, setHidePass] = useState(true);

  const [userGoogleInfo, setUserGoogleInfo] = useState({});

  const signInWithGoogle = async () => {
    if (SyncStorage.get('ip') === undefined || SyncStorage.get('ip') === "") {
      ToastAndroid.show('Please configure server IP before', ToastAndroid.SHORT);
    } else {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log("USER INFOS", userInfo);
        SyncStorage.set('token', userInfo.idToken);
        await getGoogleUserInfos();
        SyncStorage.set('user', userInfo.user);
        navigation.navigate('Home');
      } catch (error) {
        console.log("error: ", error);
      }
    }
  };

  const getGoogleUserInfos = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      SyncStorage.set('user', userInfo.user);
      console.log("userInfo", userInfo);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const isSignedInWithGoogle = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!!isSignedIn)
      getGoogleUserInfos();
    else
      console.log("not signed in");
  };

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: '709856542791-bsltkrf45ehr7ql3dfll5fhqgl65jnsn.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true
    });
    isSignedInWithGoogle();
    setTimeout(() => {
      if (SyncStorage.get('token') === undefined || SyncStorage.get('token') === "")
        navigation.navigate('Login');
      else
        navigation.navigate('Home');
    }, 400);
  }, []);

  const handleIpOK = () => {
    if (tmpIp === "")
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
    else {
      SyncStorage.set('ip', tmpIp);
      axios.get('http://' + SyncStorage.get('ip') + ':8080', { headers: { "Content-Type": "application/json" }})
        .then(res => {
          ToastAndroid.show("Connected to server", ToastAndroid.SHORT);
          setVisibleIp(false);
        })
        .catch(err => {
          SyncStorage.set('ip', "");
          Keyboard.dismiss();
          ToastAndroid.show("Can not connect to server", ToastAndroid.SHORT);
          console.log(err.response);
        }
      );
      console.log('ip: %s', SyncStorage.get('ip'));
    }
  };

  const handleReset = () => {
    setVisibleIp(false);
    setTmpIp('');
    SyncStorage.set('ip', '');
  };

  const handleLogin = (e) => {
    if (username === "" || password === "")
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
    else if (SyncStorage.get('ip') === undefined || SyncStorage.get('ip') === "")
      ToastAndroid.show('Please configure server IP before', ToastAndroid.SHORT);
    else {
      axios.post('http://' + SyncStorage.get('ip') + ':8080/api/auth/login', JSON.stringify({ username, password }), { headers: { "Content-Type": "application/json" }})
        .then(res => {
          console.log(res);
          console.log(res.data);
          SyncStorage.set('token', res.data.token);
          SyncStorage.set('username', username);
          navigation.navigate('Home');
        })
        .catch(err => {
          console.log(err.response);
          ToastAndroid.show("Username or password incorrect", ToastAndroid.SHORT);
        });
    }
  };

  const handleGoRegister = () => {
    if (SyncStorage.get('ip') === undefined || SyncStorage.get('ip') === "")
      ToastAndroid.show('Please configure server IP before', ToastAndroid.SHORT);
    else
      navigation.navigate('Register');
  }

  const fabButton = () => {
    if (SyncStorage.get('ip') === undefined || SyncStorage.get('ip') === "")
      return (
        <FAB icon="server-off" label="NOT CONFIGURED"
          style={{position: 'absolute', top: "2%", right: "2%", backgroundColor: 'darkred'}}
          onPress={() => setVisibleIp(true)}
        />
      );
    else
      return (
        <FAB icon="server" label={SyncStorage.get('ip')}
          style={{position: 'absolute', top: "2%", right: "2%", backgroundColor: 'green'}}
          onPress={() => setVisibleIp(true)}
        />
      );
  }
 
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#020410" />
      <Image style={styles.image} source={require("../../../assets/area_logo.png")} />
 
      <View style={styles.usernameInputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          placeholderTextColor='grey'
          autoComplete='username'
          onChangeText={(username) => setUsername(username)}
        />
      </View>
 
      <View style={styles.passwordInputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor='grey'
          autoComplete='password'
          secureTextEntry={hidePass ? true : false}
          onChangeText={(password) => setPassword(password)} >
        </TextInput>
        <FAB
          icon={hidePass ? 'eye' : 'eye-off-outline'}
          label={hidePass ? 'Show password' : 'Hide password'}
          onPress={() => setHidePass(!hidePass)}
          style={{backgroundColor: 'transparent', marginTop: "2%"}}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text>LOGIN</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity style={styles.loginWithGoogleBtn} onPress={signInWithGoogle}>
        <Image source={{uri: "https://img.icons8.com/color/400/null/google-logo.png"}} style={{ width: 30, height: 30, marginEnd: "3%" }}/>
        <Text style={{color: "grey"}}>LOGIN WITH GOOGLE</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerBtn} onPress={handleGoRegister}>
        <Text>REGISTER</Text>
      </TouchableOpacity>

      <Dialog.Container visible={visibleIp} onRequestClose={() => setVisibleIp(false)}>
        <Dialog.Title>Server information are not defined</Dialog.Title>
        <Dialog.Description></Dialog.Description>
        <Dialog.Input label="IP Address" keyboardType="number-pad" onChangeText={(tmpIp) => setTmpIp(tmpIp)}/>
        <Dialog.Button label="Reset" onPress={handleReset} color="red" />
        <Dialog.Button label="OK" onPress={handleIpOK} color='green' />
      </Dialog.Container>

      {fabButton()}
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#020410",
  },
 
  image: {
    width: "60%",
    marginTop: "20%",
    marginBottom: "12%",
    resizeMode: 'contain',
  },
 
  usernameInputView: {
    backgroundColor: "#191D32",
    borderRadius: 30,
    width: "70%",
    height: "6%",
    alignItems: "center",
    marginBottom: "5%",
  },

  passwordInputView: {
    backgroundColor: "#191D32",
    borderRadius: 30,
    width: "70%",
    height: "6%",
    alignItems: "center",
    marginBottom: "20%",
  },
 
  textInput: {
    color: "darkgrey",
    textAlign: "center",
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: "6%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3A4065"
  },

  orText: {
    height: "4%",
    color: "grey",
    marginTop: "4%"
  },

  loginWithGoogleBtn: {
    flexDirection: "row", 
    width: "80%",
    borderRadius: 25,
    height: "6%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: "1%"
  },

  registerBtn: {
    width: "80%",
    borderRadius: 25,
    height: "6%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3A4065",
    marginTop: "4%"
  },

  fab: {
    position: 'absolute',
    top: "2%",
    right: "5%"
  }
});
