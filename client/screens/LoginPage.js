import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginPage() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit() {
    axios({
      url: "http://dd5e-110-138-88-199.ngrok.io/login",
      method: "post",
      data: { email, password },
    }).then((data) => {
      AsyncStorage.setItem("access_token", data.data.access_token);
    });
    navigation.navigate("MainApp")
  }
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="password"
      />
      <Button
        onPress={() => {
          onSubmit();
        }}
        title="Login"
        color="#841584"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
