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
  ToastAndroid,
} from 'react-native';
import { FAB } from "react-native-paper";
import axios from 'axios'
import SyncStorage from 'sync-storage';



export default function ({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [hidePass, setHidePass] = useState(true);

  const handleRegister = (e) => {
    if (username === "" || password === "" || password2 === "") {
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
    } else if (password !== password2) {
      ToastAndroid.show('Passwords do not match', ToastAndroid.SHORT);
    } else {
      axios.post('http://' + SyncStorage.get('ip') + ':8080/api/auth/signup', JSON.stringify({ username, password }), { headers: { "Content-Type": "application/json" }})
        .then(res => {
          console.log(res);
          console.log(res.data);
          navigation.navigate('Login');
        })
        .catch(err => {
          ToastAndroid.show("User already exists !", ToastAndroid.SHORT);
          console.log(err.response);
        }
      );
    }
  };
 
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#020410" />
      <Image style={styles.image} source={require("../../../assets/area_logo.png")} />
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          placeholderTextColor='grey'
          autoComplete='username'
          onChangeText={(username) => setUsername(username)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor='grey'
          autoComplete='password-new'
          secureTextEntry={hidePass ? true : false}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Confirm Password"
          placeholderTextColor='grey'
          autoComplete='password-new'
          secureTextEntry={hidePass ? true : false}
          onChangeText={(password2) => setPassword2(password2)}
        />
        <FAB
          icon={hidePass ? 'eye' : 'eye-off-outline'}
          label={hidePass ? 'Show passwords' : 'Hide passwords'}
          onPress={() => setHidePass(!hidePass)}
          style={{backgroundColor: 'transparent', marginTop: "2%"}}
        />
      </View>
 
      <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
        <Text style={styles.registerText}>REGISTER</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity style={styles.returnBtn} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.returnText}>RETURN</Text>
      </TouchableOpacity>
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
 
  inputView: {
    backgroundColor: "#191D32",
    borderRadius: 30,
    width: "70%",
    height: "6%",
    alignItems: "center",
    marginBottom: "5%",
  },
 
  textInput: {
    color: "darkgrey",
    textAlign: "center",
  },
 
  registerBtn: {
    width: "80%",
    borderRadius: 25,
    height: "6%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3A4065",
    marginTop: "18%"
  },

  orText: {
    height: "4%",
    color: "grey",
    marginTop: "3%"
  },

  returnBtn: {
    width: "80%",
    borderRadius: 25,
    height: "6%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
  },
});
