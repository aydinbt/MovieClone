import { View, Text, TouchableWithoutFeedback, FlatList } from "react-native";
import React from "react";

import {
  deleteBookMark,
  firebase,
  useBookMarkListener,
} from "../../../../fireBaseConfig";
import { IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import BookCard from "../../../components/BookCard/BookCard";

const ProfilePage = () => {
  const user = firebase.auth().currentUser;
  const bookmark = useBookMarkListener();
  const navigation = useNavigation();
  const getBook = ({ item }) => <BookCard item={item} />;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <View
        style={{
          marginTop: 40,
          marginBottom: 25,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", left: 20, zIndex: 2 }}
          icon="arrow-left"
          size={40}
          iconColor="red"
        />
        <Text
          style={{
            color: "white",
            flex: 1,
            fontSize: 20,
            fontWeight: "900",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          FAVORILERIM
        </Text>
      </View>
      <View>
        {/* <FlatList numColumns={2} data={bookmark} renderItem={getBook} /> */}
        {bookmark.map((data, i) =>
          data.user === user.email ? (
            <TouchableWithoutFeedback
              key={i}
              onPress={() =>
                navigation.navigate("DetailPage", { id: data.uid })
              }
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
                    uri: `https://image.tmdb.org/t/p/original${data.image}`,
                  }}
                />

                <View style={{ alignItems: "center", alignSelf: "center" }}>
                  <IconButton
                    onPress={() => deleteBookMark(data.id)}
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
                  {data.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ) : (
            ""
          )
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;
