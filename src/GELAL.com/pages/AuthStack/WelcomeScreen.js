import { View } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { Button, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["transparent", "transparent"]}
        style={{ flex: 1 }}
      >
        <Image
          source={require("../../assets/LoginPageImage/serie.png")}
          style={{
            width: "90%",

            height: "60%",
            top: 70,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
          contentFit="contain"
          transition={100}
        />

        <View style={{ marginTop: -80 }}>
          <Text
            variant="headlineMedium"
            style={{
              fontWeight: "900",
              top: 85,
              textAlign: "center",

              padding: 12,
            }}
          >
            İstediğini izle ya da kaldığın yerden devam et!
          </Text>

          <View style={{ gap: 16, marginHorizontal: 32 }}>
            <Button
              mode="contained"
              style={{ top: 90 }}
              onPress={() => navigation.navigate("LoginPage")}
              labelStyle={{ fontWeight: "900" }}
            >
              SIGN IN
            </Button>

            <Button
              mode="outlined"
              style={{ top: 90 }}
              onPress={() => navigation.navigate("Register")}
              labelStyle={{ fontWeight: "900" }}
            >
              SIGN UP
            </Button>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default WelcomeScreen;
