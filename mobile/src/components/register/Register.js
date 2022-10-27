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
import Dialog from "react-native-dialog";
import { FAB } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function ({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [hidePass, setHidePass] = useState(true);

  const handleRegister = () => {
    if (email === "" || password === "")
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
    else
      navigation.navigate('Login');
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
          onChangeText={(email) => setEmail(email)}
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
          onChangeText={(password) => setPassword2(password2)}
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
    marginBottom: "20%",
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
    marginTop: "4%"
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
