import { View, Text } from "react-native";
import React, { useState } from "react";
import { IconButton } from "react-native-paper";
import useFetch from "../../hooks/useFetch/useFetch";

const NavigatePage = ({ increment, descrement, count }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
      }}
    >
      <IconButton icon="arrow-left" iconColor="red" onPress={descrement} />
      <Text style={{ color: "white" }}>{count}</Text>
      <IconButton onPress={increment} icon="arrow-right" iconColor="red" />
    </View>
  );
};

export default NavigatePage;
