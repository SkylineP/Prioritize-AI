import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "./.vscode/Screens/LoginScreen";
import HomeScreen from "./.vscode/Screens/HomeScreen";
import ProfileScreen from "./.vscode/Screens/ProfileScreen";
import ToDoScreen from "./.vscode/Screens/ToDoScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerStyle: { backgroundColor: "black" },
            headerTitleStyle: { color: "white" },
          }}
        />
        <Stack.Screen
          name="Home"
          options={{
            headerStyle: { backgroundColor: "black" },
            headerTitleStyle: { color: "white" },
          }}
        >
          {() => (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === "Tasks") {
                    iconName = focused ? "list" : "list-outline";
                  } else if (route.name === "Profile") {
                    iconName = focused ? "person" : "person-outline";
                  }

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: [
                  {
                    display: "flex",
                    backgroundColor: "black",
                  },
                  null,
                ],
              })}
            >
              <Tab.Screen
                name="Tasks"
                component={ToDoScreen}
                options={{ headerShown: false }}
              />
              <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ headerShown: false }}
              />
            </Tab.Navigator>
          )}
        </Stack.Screen>
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
