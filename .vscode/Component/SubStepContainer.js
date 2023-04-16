import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

function SubStepContainer(props) {
  const [completed, setCompleted] = useState(props.step.completed);
  const toggleCompleted = () => setCompleted(!completed);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCompleted}>
        <Ionicons
          name={completed ? "checkmark-circle-outline" : "ellipse-outline"}
          size={24}
          color={completed ? "green" : "black"}
        />
      </TouchableOpacity>
      <Text style={[styles.stepText, completed && styles.completedText]}>
        {props.step.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: "#fff4",
    marginBottom: 10,
  },
  stepText: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "bold",
    color: "#ccc",
    width: "80%",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#333",
  },
  subStep: {
    marginLeft: 20,
  },
});

export default SubStepContainer;
