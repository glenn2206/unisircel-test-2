import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./screens/LoginPage";
import OrderPage from "./screens/OrderPage";
import Router from "./routing/index";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <SafeAreaView style={styles.container}>
    <NavigationContainer>
      <Router></Router>
    </NavigationContainer>

    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  }
});