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
  ScrollView,
} from "react-native";
import messageSystem from "../Component/messageSystem.tsx";
import TaskListContainer from "../Component/TaskListContainer";
import TaskContainer from "../Component/TaskContainer";
import { Ionicons } from "@expo/vector-icons";
import Voice from "@react-native-voice/voice";
import * as Permissions from "expo-permissions";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

export default function ToDoScreen({ navigation, route }) {
  const [inputMessage, setInputMessage] = useState("");
  const [outputMessage, setOutputMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recording, setRecording] = useState(null);
  const [uri, setUri] = useState(null);
  const [mic, setMic] = useState(false);
  const [isChecked, setIsChecked] = useState([false]);

  const pencilMode = window.pencilMode;
  console.log("Pencil Mode: " + pencilMode);

  const getMicrophonePermission = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access microphone denied");
    }
  };

  const handleMic = () => {
    setMic((prevState) => !prevState);
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
    handleMic();
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
    handleMic();
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

  const handleHamburger = () => {
    // Navigate to the Tasks page
    navigation.navigate("Settings");
  };

  const clearInput = () => {
    setInputMessage("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.monthContainer}>
          <View style={styles.dateRow}>
            <Text style={styles.monthText}>April </Text>
            <Ionicons name={"chevron-down-outline"} size={24} color="white" />
          </View>
          <TouchableOpacity onPress={handleHamburger}>
            <Ionicons name={"menu-outline"} size={32} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.weekDaysContainer}>
          <View style={styles.weekDayCellHide}>
            <Text style={styles.weekDayText}>M</Text>
            <Text style={styles.weekDayNumber}>22</Text>
          </View>
          <View style={styles.weekDayCell}>
            <Text style={styles.weekDayText}>T</Text>
            <Text style={styles.weekDayNumber}>23</Text>
          </View>
          <View style={styles.weekDayCell}>
            <Text style={styles.weekDayText}>W</Text>
            <Text style={styles.weekDayNumber}>24</Text>
          </View>
          <View style={styles.weekDayCellChosen}>
            <Text style={styles.weekDayTextChosen}>T</Text>
            <Text style={styles.weekDayNumberChosen}>25</Text>
          </View>
          <View style={styles.weekDayCell}>
            <Text style={styles.weekDayText}>F</Text>
            <Text style={styles.weekDayNumber}>26</Text>
          </View>
          <View style={styles.weekDayCell}>
            <Text style={styles.weekDayText}>S</Text>
            <Text style={styles.weekDayNumber}>27</Text>
          </View>
          <View style={styles.weekDayCellHide}>
            <Text style={styles.weekDayText}>S</Text>
            <Text style={styles.weekDayNumber}>28</Text>
          </View>
        </View>
      </View>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}

      {memoizedTaskListContainer}
      <View style={styles.containerRow}>
        {!pencilMode ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              onPress={recording ? stopRecording : startRecording}
            >
              <View
                style={{
                  margin: 10,
                  borderWidth: 4,
                  borderColor: "#055C9D",
                  borderRadius: 50, // Set to half of the icon size to create a circular shape
                  backgroundColor: "#363434",
                }}
              >
                <Ionicons
                  style={
                    mic ? { justifyContent: "center", left: 2 } : styles.micOn
                  }
                  name={mic ? "mic-off" : "mic"}
                  size={90}
                  color="#055C9D"
                />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TextInput
              style={styles.input}
              onChangeText={setInputMessage}
              value={inputMessage}
              placeholder="Enter New Task"
              placeholderTextColor="#262525"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleSubmitText();
                clearInput();
              }}
            >
              <Ionicons
                style={{ justifyContent: "center", left: 1 }}
                name="add-circle-outline"
                color="#055C9D"
                size={45}
              ></Ionicons>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#363434",
  },
  containerRow: {
    flexDirection: "row",
    backgroundColor: "#262525",
    paddingBottom: 15,
    borderTopWidth: 3,
    borderColor: "#858585",
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
    backgroundColor: "#fff",
    color: "black",
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
  weekDaysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
    paddingBottom: 8,
  },
  weekDayCell: {
    alignItems: "center",
  },
  weekDayCellChosen: {
    alignItems: "center",
    borderBottomColor: "#055C9D",
    borderBottomWidth: 2,
  },
  weekDayTextChosen: {
    color: "#055C9D",
    fontSize: 12,
  },
  weekDayCellHide: {
    alignItems: "center",
    opacity: 0.3,
  },
  weekDayText: {
    color: "white",
    fontSize: 12,
  },
  weekDayNumber: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },

  weekDayNumberChosen: {
    color: "#055C9D",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  headerContainer: {
    backgroundColor: "#262525",
    paddingTop: 50,
    borderBottomWidth: 3,
    borderColor: "#858585",
  },
  monthContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  monthText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  todayText: {
    color: "#055C9D",
    fontSize: 22,
  },
  task: {
    flexDirection: "row",
    marginLeft: 8,
    width: "96%",
    marginHorizontal: "1%",
    marginTop: 20,
    backgroundColor: "#858585",
    borderRadius: 15,
    padding: 10,
  },
  taskContent: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskCheck: {
    marginRight: 10,
  },
  taskMessageText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  taskIcons: {
    flexDirection: "row",
    marginLeft: 55,
  },
  subtask: {
    flexDirection: "row",
    marginLeft: 120,
    width: "70%",
    marginTop: 10,
    backgroundColor: "#858585",
    borderRadius: 15,
    padding: 10,
    justifyContent: "flex-end",
  },
  subtaskContent: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subtaskIcons: {
    flexDirection: "row",
    marginLeft: 20,
  },
  micOn: {
    justifyContent: "center",
    left: 2,
  },
});
