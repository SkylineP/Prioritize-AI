import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SubStepContainer from "./SubStepContainer";

function StepContainer(props) {
  const [completed, setCompleted] = useState(props.step.completed);
  const toggleCompleted = () => setCompleted(!completed);

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleCompleted}>
          <Ionicons
            name={completed ? "checkbox-outline" : "square-outline"}
            size={24}
            color={completed ? "green" : "black"}
          />
        </TouchableOpacity>
        <Text style={[styles.stepText, completed && styles.completedText]}>
          {props.step.description}
        </Text>
      </View>
      <View style={styles.subStep}>
        {props.step["sub-steps"] && (
          <FlatList
            data={props.step["sub-steps"]}
            renderItem={({ item }) => <SubStepContainer step={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>
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
    borderRadius: 7,
    backgroundColor: "#fff3",
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

export default StepContainer;
