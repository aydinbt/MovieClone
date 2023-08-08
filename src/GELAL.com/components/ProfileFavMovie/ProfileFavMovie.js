import { View, TouchableWithoutFeedback, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { deleteBookMark, firebase } from "../.././/../fireBaseConfig";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
const ProfileFavMovie = ({ fav }) => {
  const user = firebase.auth().currentUser;

  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("DetailPage", { id: fav.uid })}
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
              uri: `https://image.tmdb.org/t/p/original${fav.image}`,
            }}
          />
          <View style={{ alignItems: "center", alignSelf: "center" }}>
            <IconButton
              onPress={() => deleteBookMark(fav.id)}
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
            {fav.title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ProfileFavMovie;
