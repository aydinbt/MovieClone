import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";

const FeaturesSection = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("DetailPage", { id: item.id })}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          alignContent: "center",
          padding: 12,
        }}
      >
        <View
          style={{
            position: "absolute",
            zIndex: 2,
            right: 35,
            top: 20,
            padding: 5,

            borderRadius: 100,
            backgroundColor: "black",
          }}
        >
          <Text style={{ color: "white", fontWeight: "900", fontSize: 9 }}>
            {item.vote_average}
          </Text>
        </View>
        <Image
          style={{
            height: 225,
            width: 150,
            marginRight: 12,
            borderRadius: 12,
          }}
          source={{
            uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FeaturesSection;
