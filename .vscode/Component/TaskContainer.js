import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import StepContainer from "./StepContainer";
import { Ionicons } from "@expo/vector-icons";

function TaskContainer({ task, removeTask }) {
  console.log("INSIDE TASK CONTAINER");
  console.log(task);

  const [isStarred, setIsStarred] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const toggleStarred = () => {
    setIsStarred(!isStarred);
  };

  const toggleChecked = () => {
    setIsChecked(!isChecked);
  };

  const handleRemoveTask = () => {
    removeTask(task.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerDate}>
        <Ionicons
          style={styles.check}
          name={isChecked ? "checkmark-circle-outline" : "ellipse-outline"}
          size={35}
          color="white"
          onPress={toggleChecked}
        />
        <Ionicons
          style={{ paddingHorizontal: 20 }}
          name={isStarred ? "star" : "star-outline"}
          size={28}
          color="#FFFF00"
          onPress={toggleStarred}
        />
        <Ionicons
          name={"trash-outline"}
          size={30}
          color="#FF0000"
          onPress={handleRemoveTask}
        />
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
    backgroundColor: "#858585",
    borderRadius: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginLeft: 10,
  },

  containerDate: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginBottom: 5,
    justifyContent: "flex-end",
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
    color: "#055C9D",
  },
  delete: {
    fontSize: 20,
  },
  flatListContainer: {
    width: "95%",
    alignSelf: "flex-start",
  },
  check: {
    top: 20,
    right: 235,
    justifyContent: "flex-start",
  },
});

export default TaskContainer;
