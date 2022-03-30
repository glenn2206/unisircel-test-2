import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginPage from "../screens/LoginPage";
import OrderPage from "../screens/OrderPage";
import ActiveOrderPage from "../screens/ActiveOrderPage";
import ReportPage from "../screens/ReportPage";
import ItemPage from "../screens/ItemPage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="OrderPage"
        component={OrderPage}
        options={{ title: "Order Page" }}
      />
      <Tab.Screen
        name="ActiveOrderPage"
        component={ActiveOrderPage}
        options={{ title: "Active Order Page" }}
      />
      <Tab.Screen
        name="ReportPage"
        component={ReportPage}
        options={{ title: "Report Page" }}
      />
            <Tab.Screen
        name="ItemPage"
        component={ItemPage}
        options={{ title: "Item Page" }}
      />
    </Tab.Navigator>
  );
};
const Router = (route) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Router;
