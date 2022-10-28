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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function ({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visibleIp, setVisibleIp] = useState("");
  const [tmpIp, setTmpIp] = useState("");
  const [hidePass, setHidePass] = useState(true);

  const handleIpOK = () => {
    if (tmpIp === "")
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
    else {
      window.$ip = tmpIp;
      axios.get('http://' + window.$ip + ':8080', { headers: { "Content-Type": "application/json" }})
        .then(res => {
          ToastAndroid.show("Connected to server", ToastAndroid.SHORT);
          setVisibleIp(false);
        })
        .catch(err => {
          window.$ip = "";
          Keyboard.dismiss();
          ToastAndroid.show("Can not connect to server", ToastAndroid.SHORT);
          console.log(err.response);
        }
      );
      console.log('ip: %s', window.$ip);
    }
  };

  const handleReset = () => {
    setVisibleIp(false);
    setTmpIp('');
    window.$ip = '';
  };

  const handleLogin = (e) => {
    if (username === "" || password === "") {
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
    } else if (window.$ip === "")
      ToastAndroid.show('Please configure server IP before', ToastAndroid.SHORT);
    else {
      axios.post('http://' + window.$ip + ':8080/api/auth/login', JSON.stringify({ username, password }), { headers: { "Content-Type": "application/json" }})
        .then(res => {
          console.log(res);
          console.log(res.data);
          // const token  =  res.data.token;
          // localStorage.setItem("token", token);
          // setAuthToken(token);
          window.$token = res.data.token;
          navigation.navigate('Home');
        })
        .catch(err => {
          ToastAndroid.show(JSON.stringify(err.response.data.error).replaceAll('"', ''), ToastAndroid.SHORT);
          console.log(err.response);
        }
      );
    }
  };

  const handleGoRegister = () => {
    if (window.$ip === "")
      ToastAndroid.show('Please configure server IP before', ToastAndroid.SHORT);
    else
      navigation.navigate('Register');
  }

  const fabButton = () => {
    if (window.$ip === "")
      return (
        <FAB icon="server-off" label="NOT CONFIGURED"
          style={{position: 'absolute', top: "2%", right: "2%", backgroundColor: 'darkred'}}
          onPress={() => setVisibleIp(true)}
        />
      );
    else
      return (
        <FAB icon="server" label={tmpIp}
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
    marginBottom: "20%",
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
    backgroundColor: "#3A4065",
    marginTop: "20%"
  },

  orText: {
    height: "4%",
    color: "grey",
    marginTop: "4%"
  },

  registerBtn: {
    width: "80%",
    borderRadius: 25,
    height: "6%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3A4065"
  },

  fab: {
    position: 'absolute',
    top: "2%",
    right: "5%"
  }
});
