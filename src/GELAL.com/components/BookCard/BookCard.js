import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  deleteBookMark,
  firebase,
  useBookMarkListener,
} from "../../../fireBaseConfig";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { TouchableWithoutFeedback } from "react-native";
import { Image } from "expo-image";
const BookCard = ({ item }) => {
  const user = firebase.auth().currentUser;

  return (
    <>
      {item.user === user.email ? (
        <View style={{ flex: 1 }}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("DetailPage", { id: item.uid })}
          >
            <View
              style={{
                padding: 5,
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  justifyContent: "center",
                  backgroundColor: "red",
                  width: 120,
                  height: 200,
                  borderRadius: 12,
                }}
                source={{
                  uri: `https://image.tmdb.org/t/p/original${item.image}`,
                }}
              />

              <View style={{ alignItems: "center", alignSelf: "center" }}>
                <IconButton
                  onPress={() => deleteBookMark(item.id)}
                  icon="heart"
                  iconColor="red"
                  style={{
                    position: "absolute",
                    backgroundColor: "#ededed",
                    height: 35,
                    width: 35,
                    bottom: 10,
                    right: 10,
                  }}
                />
              </View>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "900",
                  fontSize: 12,
                  marginTop: 5,
                }}
              >
                {item.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      ) : (
        ""
      )}
    </>
  );
};

export default BookCard;
