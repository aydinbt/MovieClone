import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const HeroSection = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("DetailPage", { id: item.id })}
    >
      <View style={{ marginTop: 6 }}>
        <View
          style={{
            position: "absolute",
            zIndex: 2,
            right: 30,
            top: 20,
            padding: 5,

            borderRadius: 100,
            backgroundColor: "#ededed",
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "900",
              fontSize: 12,
            }}
          >
            {item.vote_average.toFixed(2)}
          </Text>
        </View>

        <View style={{ position: "absolute", zIndex: 1, left: 10, bottom: 20 }}>
          {item.vote_average > 6.99 ? (
            <Ionicons name="flame" size={25} color="red" />
          ) : (
            ""
          )}
        </View>

        <Image
          contentFit="scale-down"
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

export default HeroSection;
