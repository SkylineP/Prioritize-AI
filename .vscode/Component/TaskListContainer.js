import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
} from "react-native";
import TaskContainer from "./TaskContainer";

function TaskListContainer({ tasks }) {
  console.log("INSIDE TASK LIST CONTAINER");
  console.log(tasks);
  console.log("Task count:", tasks.length);
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        style={styles.container}
        renderItem={({ item }) => <TaskContainer task={item} />}
        keyExtractor={(item) => item.description}
      />
    </View>
  );
}
export default TaskListContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
