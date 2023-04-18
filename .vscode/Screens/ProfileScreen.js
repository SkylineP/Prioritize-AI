import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const userInfo = {
    name: "Maria Heavens",
    imageUri: "https://i.pravatar.cc/175",
    backgroundUri: "https://source.unsplash.com/1600x900/?nature,water",
  };

  return (
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
      <View style={styles.bioContainer}>
        <View style={styles.buttonContainer}>
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              style={styles.button}
              name="pencil"
              size={25}
              color="orange"
            />
            <Text style={styles.buttonText}>Profile</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              style={styles.button}
              name="key"
              size={30}
              color="black"
            />
            <Text style={styles.buttonText}>Password</Text>
          </View>
        </View>

        <Text style={styles.bio}></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#262525",
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
  bio: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: "justify",
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-evenly",
  },
  button: {
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
});

export default ProfileScreen;
