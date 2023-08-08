import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../../../../fireBaseConfig";
import {
  Text,
  TextInput,
  IconButton,
  ActivityIndicator,
  Avatar,
  Button,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import useFetch from "../../../hooks/useFetch/useFetch";
import HeroSection from "../../../components/HeroSection/HeroSection";
import FeaturesSection from "../../../components/FeaturesSection/FeaturesSection";
import { ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import ActionSheet from "react-native-actionsheet";
import { useNavigation } from "@react-navigation/native";

const HomeProductPage = () => {
  const navigation = useNavigation();
  const [count, setCount] = useState(1);
  const { data, loading } = useFetch(
    "https://api.themoviedb.org/3/discover/movie",
    count
  );
  const user = firebase.auth().currentUser;
  const showActionSheet = () => {
    this.ActionSheet.show();
  };

  const arttir = () => {
    return setCount(count + 1);
  };

  const renderHeroSection = ({ item }) => <HeroSection item={item} />;
  const features = ({ item }) => <FeaturesSection item={item} />;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView>
        {loading ? (
          <ActivityIndicator size={50} color="white" />
        ) : (
          <View style={{ marginHorizontal: 16, gap: 6 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "900",
                  color: "white",
                  fontSize: 40,
                }}
              >
                BTFLIX
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "center",
                alignContent: "center",
              }}
            >
              <TextInput
                outlineStyle={{ borderRadius: 16 }}
                placeholder="Ara"
                style={{
                  flex: 1,
                  alignSelf: "center",
                  alignContent: "center",
                }}
                left={<TextInput.Icon icon="magnify" />}
                mode="outlined"
              />
              <TouchableWithoutFeedback onPress={showActionSheet}>
                <Avatar.Text
                  color="white"
                  label={user.email.slice(0, 2).toUpperCase()}
                  size={50}
                  style={{
                    marginLeft: 15,
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                />
              </TouchableWithoutFeedback>
              <ActionSheet
                ref={(o) => (this.ActionSheet = o)}
                options={["Profilim", "Çıkış Yap", "İptal"]}
                cancelButtonIndex={2}
                destructiveButtonIndex={1}
                onPress={(index) => {
                  switch (index) {
                    case 0:
                      navigation.navigate("ProfilePage");
                      break;
                    case 1:
                      firebase.auth().signOut();
                      break;
                    default:
                      return index;
                  }
                }}
              />
            </View>
            <View>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={data.results.slice(0, 4)}
                  renderItem={renderHeroSection}
                />
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 6,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    alignItems: "center",
                    fontWeight: "900",
                    fontSize: 16,
                  }}
                >
                  Kesin İzle!
                </Text>
                <IconButton icon="fire" iconColor="red" size={30} />
              </View>
              <Text style={{ color: "white", opacity: 0.5, fontWeight: "800" }}>
                Popular All
              </Text>
            </View>
            <View>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <FlatList
                  numColumns={2}
                  data={data.results.slice(5, 9)}
                  renderItem={features}
                />
              )}
            </View>
            <View>
              <Button onPress={arttir}>Arttır</Button>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeProductPage;
