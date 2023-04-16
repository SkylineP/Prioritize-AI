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
import { Ionicons } from "@expo/vector-icons";

function TaskContainer({ task }) {
  console.log("INSIDE TASK CONTAINER");
  console.log(task);

  return (
    <View style={styles.container}>
      <View style={styles.containerDate}>
        <Text style={styles.date}>24 Apr - </Text>
        <Text style={[styles.date2, { flex: 1 }]}>Today</Text>
        <Ionicons
          style={{ paddingHorizontal: 20 }}
          name={"star-outline"}
          size={20}
          color="yellow"
        />
        <Ionicons name={"trash-bin-outline"} size={24} color="red" />
      </View>

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
    width: "96%",
    marginHorizontal: "1%",
    marginTop: 20,
    backgroundColor: "#fff1",
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

  containerDate: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginBottom: 5,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    //marginHorizontal: 15,
    marginBottom: 20,
    color: "#fff",
  },
  date: {
    fontSize: 20,
    color: "#fff",
  },
  date2: {
    fontSize: 20,
    color: "orange",
  },
  delete: {
    fontSize: 20,
  },
  flatListContainer: {
    width: "95%",
    alignSelf: "flex-start",
  },
});

export default TaskContainer;
