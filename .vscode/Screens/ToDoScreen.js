import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import messageSystem from "../Component/messageSystem.tsx";
import TaskListContainer from "../Component/TaskListContainer";
import TaskContainer from "../Component/TaskContainer";
import { Ionicons } from "@expo/vector-icons";
import Voice from "@react-native-voice/voice";
import * as Permissions from "expo-permissions";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

export default function ToDoScreen() {
  const [inputMessage, setInputMessage] = useState("");
  const [outputMessage, setOutputMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recording, setRecording] = useState(null);
  const [uri, setUri] = useState(null);

  const getMicrophonePermission = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access microphone denied");
    }
  };

  //console.log(messageSystem);
  useEffect(() => {
    console.log("_------------------------USE-EFFECT-------------------------");
    console.log(outputMessage);
  }, [outputMessage]);

  const handleSubmitText = async () => {
    try {
      // set isLoading to true before making the fetch request
      setIsLoading(true);
      const response = await fetch("http://10.0.2.2:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: messageSystem,
            },
            { role: "user", content: inputMessage },
          ],
        }),
      });

      const data = await response.json();

      try {
        setOutputMessage((prevState) => [
          ...prevState,
          JSON.parse(data.message),
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // set isLoading back to false once the response is received
      }
    } catch (error) {
      console.error(error);
      setOutputMessage("Something went wrong");
    }
  };

  const startRecording = async () => {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    console.log("Stopping recording..");
    setRecording(null);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log("Recording saved to:", uri);
    setUri(uri); // set uri state variable with the value of uri

    const fileContents = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log(fileContents);

    const blob = new Blob([fileContents], { type: "audio/3gp" });

    console.log(blob);

    // create a new FormData object and append the blob to it
    const formData = new FormData();
    formData.append("audio", blob, "recording.wav");

    // pass the FormData object as the request body
    console.log(formData);
    handleSubmitVoice(formData);
  };

  const handleSubmitVoice = async (file) => {
    try {
      setIsLoading(true);

      console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDD");
      console.log(file);

      const response = await fetch("http://10.0.2.2:3000/audio", {
        method: "POST",
        body: file,
      });

      const data = await response.json();

      console.log(data.text); // log the response text to the console

      // Do something with the response text
      // ...
    } catch (error) {
      console.error(error);
      setOutputMessage("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const memoizedTaskListContainer = useMemo(() => {
    return <TaskListContainer tasks={outputMessage} />;
  }, [outputMessage]);

  return (
    <View style={styles.container}>
      <View style={styles.containerRow}>
        <TextInput
          style={styles.input}
          onChangeText={setInputMessage}
          value={inputMessage}
          placeholder="Enter New Task"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmitText}>
          <Ionicons name="add-circle-outline" color="gray" size={32}></Ionicons>
        </TouchableOpacity>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        )}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Record and retrieve audio file example</Text>
          <Button
            title={recording ? "Stop Recording" : "Start Recording"}
            onPress={recording ? stopRecording : startRecording}
          />
        </View>
      </View>
      {memoizedTaskListContainer}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  containerRow: {
    flexDirection: "row",
    backgroundColor: "black",
  },
  input: {
    height: 40,
    width: "60%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "#fff5",
    color: "#fff",
    borderRadius: 20,
    marginHorizontal: 10,
  },
  button: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    marginLeft: 20,
    marginTop: 20,
  },
});
