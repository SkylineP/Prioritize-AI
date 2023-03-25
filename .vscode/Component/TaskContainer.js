import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
} from "react-native";
import StepContainer from "./StepContainer";

function TaskContainer({ task }) {
  console.log("INSIDE TASK CONTAINER");
  console.log(task);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{task.task}</Text>
      <FlatList
        data={task.steps}
        style={styles.flatListContainer}
        renderItem={({ item }) => <StepContainer step={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginHorizontal: "5%",
    marginTop: 20,
    backgroundColor: "#fff5",
    borderRadius: 25,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#fff",
  },
  flatListContainer: {
    width: "95%",
    alignSelf: "flex-start",
  },
});

export default TaskContainer;
