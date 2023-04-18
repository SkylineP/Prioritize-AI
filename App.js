import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProfileScreen from "./.vscode/Screens/ProfileScreen";
import ToDoScreen from "./.vscode/Screens/ToDoScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tasks">
        <Stack.Screen
          name="Tasks"
          component={ToDoScreen}
          options={{
            headerStyle: { backgroundColor: "#262525" },
            headerTitleStyle: { color: "white" },
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerStyle: { backgroundColor: "#262525" },
            headerTitleStyle: { color: "white" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
