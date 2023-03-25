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
          <TouchableOpacity style={styles.button}>
            <Ionicons name="key" size={24} color="black" />
            <Text style={styles.buttonText}>Edit Password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="mail" size={24} color="black" />
            <Text style={styles.buttonText}>Edit Email</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="person" size={24} color="black" />
            <Text style={styles.buttonText}>Edit Name</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.bio}>
          They decide to try to shake off the Black Riders by cutting through
          the Old Forest. Merry and Pippin are trapped by Old Man Willow, an
          ancient tree who controls much of the forest, but are rescued by Tom
          Bombadil.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bioContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  bio: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: "justify",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default ProfileScreen;
