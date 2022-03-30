import axios from "axios";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Button,
  Picker,
  Text,
  ScrollView
} from "react-native";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from "react-native-material-cards";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ActiveOrderPage() {
  const [orderData, setOrderData] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    AsyncStorage.getItem("access_token").then((data) => {
        setToken(data)
      axios({
        url: "http://dd5e-110-138-88-199.ngrok.io/orders",
        method: "get",
        headers: { access_token: data },
      }).then((data) => setOrderData(data.data));
    });
  }, []);

  function onFinishOrder(id) {
    axios({
        url: `http://dd5e-110-138-88-199.ngrok.io/orders/${id}`,
        method: "patch",
        headers: { access_token: token },
      }).then((data) => {
        axios({
            url: "http://dd5e-110-138-88-199.ngrok.io/orders",
            method: "get",
            headers: { access_token: token },
          }).then((data) => setOrderData(data.data));
      });
  }

  return (
    <>
    <ScrollView>

      {orderData?.map((e) => (
        <View key={e.id} style={styles.card}>
          <Card>
            <CardTitle title={e.orderNumber} subtitle={e.Item.name} />
            <CardButton onPress={() => {onFinishOrder(e.id)}} title="Finish order" color="blue" />
          </Card>
        </View>
        // <Text key={e.id} >{e.orderNumber} - {e.Item.name}</Text>
      ))}
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  card: {
    height: 150
  },
});
