import axios from "axios";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Button,
  Picker,
  ScrollView,
  Modal,
  Text,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Card,
  CardTitle,
  CardAction,
  CardContent,
  CardButton,
  CardImage,
} from "react-native-material-cards";
import { tsNamespaceExportDeclaration } from "@babel/types";

export default function ItemPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemData, setItemData] = useState();
  const [nameEdit, setNameEdit] = useState("");
  const [statusEdit, setStatusEdit] = useState("ready");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("ready");
  const [token, setToken] = useState([]);
  const [editedItemId, setEditedItemId] = useState();

  useEffect(() => {
    AsyncStorage.getItem("access_token").then((data) => {
      setToken(data);
      axios({
        url: "http://dd5e-110-138-88-199.ngrok.io/items",
        method: "get",
        headers: { access_token: data },
      }).then((data) => setItemData(data.data));
    });
  }, []);

  function onSubmit() {
    axios({
      url: "http://dd5e-110-138-88-199.ngrok.io/items",
      method: "post",
      headers: { access_token: token },
      data: {
        name,
        status,
      },
    }).then((data) => {
      axios({
        url: "http://dd5e-110-138-88-199.ngrok.io/items",
        method: "get",
        headers: { access_token: token },
      }).then((data) => setItemData(data.data));
    });
  }
  return (
    <>
      <ScrollView>
        {itemData?.map((e) => (
          <View key={e.id} style={styles.card}>
            <Card>
              <CardTitle title={e.name} subtitle={e.name} />
              <CardAction separator={true} inColumn={false}>
                <CardButton
                  onPress={() => {
                    setModalVisible(true);
                    setEditedItemId(e.id);
                  }}
                  title="Edit"
                  color="blue"
                />
                <CardButton
                  onPress={() => {
                    axios({
                      url: `http://dd5e-110-138-88-199.ngrok.io/items/${e.id}`,
                      method: "delete",
                      headers: { access_token: token },
                    }).then((data) => {
                      axios({
                        url: "http://dd5e-110-138-88-199.ngrok.io/items",
                        method: "get",
                        headers: { access_token: token },
                      }).then((data) => setItemData(data.data));
                    });
                  }}
                  title="Delete"
                  color="blue"
                />
              </CardAction>
            </Card>
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={setNameEdit}
              placeholder="name"
            />
            <Picker
              style={styles.input}
              selectedValue={statusEdit}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setStatusEdit(itemValue)}
            >
              <Picker.Item label="ready" value="ready" />
              <Picker.Item label="pending" value="pending" />
            </Picker>
            <View style={styles.fixToText}>
              <Button
                onPress={() => {
                  setModalVisible(false);
                  console.log(nameEdit, statusEdit);
                  axios({
                    url: `http://dd5e-110-138-88-199.ngrok.io/items/${editedItemId}`,
                    method: "put",
                    headers: { access_token: token },
                    data: {
                      name: nameEdit,
                      status: statusEdit,
                    },
                  }).then((data) => {
                    axios({
                      url: "http://dd5e-110-138-88-199.ngrok.io/items",
                      method: "get",
                      headers: { access_token: token },
                    }).then((data) => setItemData(data.data));
                  });
                }}
                title="Submit Edit"
                color="#841584"
                style={styles.buttonModal}
              />
              <Button
                onPress={() => {
                  setModalVisible(false);
                }}
                title="Close"
                color="red"
              />
            </View>
          </View>
        </View>
      </Modal>

      <TextInput
        style={styles.input}
        onChangeText={setName}
        placeholder="name"
      />
      <Picker
        style={styles.input}
        selectedValue={status}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
      >
        <Picker.Item label="ready" value="ready" />
        <Picker.Item label="pending" value="pending" />
      </Picker>
      <Button
        onPress={() => {
          onSubmit();
        }}
        title="Submit"
        color="#841584"
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  card: {
    height: 150,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: 300,
    height: 300,
    margin: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonModal: {
    marginBottom: 20,
  },
  fixToText: {
    width: 200,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
