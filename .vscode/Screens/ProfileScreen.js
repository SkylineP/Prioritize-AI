import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LinearGradient from "react-native-linear-gradient";

const ProfileScreen = () => {
  const userInfo = {
    name: "Maria Heavens",
    imageUri: "https://i.pravatar.cc/175",
    backgroundUri: "https://source.unsplash.com/1600x900/?nature,water",
  };

  const [isEnabled, setIsEnabled] = React.useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const pencilModeToggle = () => {
    console.log("Pencil Mode");
    window.pencilMode = !window.pencilMode;
  };

  return (
    <LinearGradient colors={["#262525", "#363434"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: userInfo.backgroundUri }}
          style={styles.backgroundImage}
        >
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: userInfo.imageUri }}
              style={styles.profilePic}
            />
            <Text style={styles.name}>{userInfo.name}</Text>
          </View>
        </ImageBackground>
        <View style={styles.toggle}>
          <Ionicons name="mic" size={30} color="white" />
          <Switch
            trackColor={{ false: "#fffff", true: "#055C9D" }}
            thumbColor={isEnabled ? "#fffff" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              toggleSwitch();
              pencilModeToggle();
            }}
            value={isEnabled}
            style={styles.switch}
          />
          <Ionicons name="pencil" size={30} color="white" />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backgroundImage: {
    height: 200,
    width: "100%",
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  bioContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#363434",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 15,
    justifyContent: "space-evenly",
  },
  button: {
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  switch: {
    marginLeft: 10,
    marginRight: 15,
  },
});

export default ProfileScreen;
