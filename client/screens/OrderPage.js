import axios from "axios";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Button,
  Picker,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OrderPage() {
  const [tableNumber, setTableNumber] = useState();
  const [itemId, setItemId] = useState();
  const [itemData, setItemData] = useState([])
  const [token, setToken] = useState([])

  useEffect(() => {
    AsyncStorage.getItem('access_token')
      .then(data => {
        setToken(data)
        axios({
          url: "http://dd5e-110-138-88-199.ngrok.io/items",
          method: "get",
          headers: { access_token: data },
        })
        .then(data=> setItemData(data.data))
      })
  }, []) 

  function onSubmit() {
    axios({
      url: "http://dd5e-110-138-88-199.ngrok.io/orders",
      method: "post",
      headers: { access_token: token },
      data: {
        ItemId: itemId,
        tableNumber
      }
    })
    .then(data=> console.log(data.data))
  }
  return (
    <SafeAreaView>
      <Picker
        selectedValue={itemId}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setItemId(itemValue)}
      >
        {itemData?.map((e) => (
        <Picker.Item key={e.id} label={e.name} value={e.id} />
        ))}
      </Picker>
      <Picker
        selectedValue={tableNumber}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setTableNumber(itemValue)}
      >
        <Picker.Item label='001' value='001' />
        <Picker.Item label='002' value='002' />
        <Picker.Item label='003' value='003' />
        <Picker.Item label='004' value='004' />
        <Picker.Item label='005' value='005' />
        <Picker.Item label='006' value='006' />
      </Picker>
      <Button
        onPress={() => {
          onSubmit();
        }}
        title="Submit"
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
