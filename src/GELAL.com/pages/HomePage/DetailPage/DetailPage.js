import { View, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch/useFetch";
import { ActivityIndicator, IconButton, Text } from "react-native-paper";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import YoutubePlayer from "react-native-youtube-iframe";
import {
  addBookMark,
  useBookMarkListener,
  firebase,
} from "../../../../fireBaseConfig";
import { Alert } from "react-native";

const DetailPage = ({ route }) => {
  const showToast = ({ status, title }) => {
    Toast.show({
      type: status,
      text1: title,
    });
  };
  const navigation = useNavigation();
  const { id } = route.params;
  const bookmark = useBookMarkListener();
  const { data, loading } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}`
  );
  const [isBookmarkSelected, setIsBookmarkSelected] = useState(false);
  const user = firebase.auth().currentUser;
  useEffect(() => {
    // Firestore'dan çekilen verilerle "id" değerini eşleştirme kontrolü yapar.
    const matchedBookmark = bookmark.find(
      (item) => item.uid === id && item.user === user.email
    );

    setIsBookmarkSelected(!!matchedBookmark); // Eşleşme varsa "true", yoksa "false" olur.
  }, [bookmark, id]);
  const saveFavo = () => {
    if (!isBookmarkSelected) {
      addBookMark(id, data.title, data.backdrop_path);
      showToast({
        status: "error",
        title: "Favorilerime Eklenmiştir.  🎉  ",
      });
      setIsBookmarkSelected(true);
      // Burada, bookmark durumunu Firestore'a kaydetme işlemini gerçekleştirebilirsiniz.
    } else {
      Alert.alert(data.title, "Favorilerinde mevcut kaldırmak ister misin?", [
        {
          text: "Hayır",
          style: "cancel",
        },
        { text: "Evet", onPress: () => navigation.navigate("ProfilePage") },
      ]);
    }
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator color="black" />
      ) : (
        <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
          <View
            style={{
              marginTop: 18,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 32,
            }}
          >
            <IconButton
              onPress={() => navigation.goBack()}
              icon="arrow-left"
              iconColor="red"
              size={30}
            />
            <Text
              style={{
                color: "white",
                textAlign: "center",
                flex: 1,
                fontWeight: "900",
              }}
            >
              {data.title}
            </Text>
          </View>

          <View style={{ height: 250 }}>
            <YoutubePlayer height={250} videoId={"FM3REDb9tIQ"} play={false} />
          </View>
          <ScrollView>
            <View style={{ marginTop: 12, alignItems: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{
                    borderRadius: 32,
                    height: 225,
                    width: 150,
                  }}
                  source={{
                    uri: `https://image.tmdb.org/t/p/original${data.poster_path}`,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    padding: 12,
                    height: 225,
                  }}
                >
                  <Text
                    style={{
                      paddingVertical: 6,
                      fontWeight: "900",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {data.tagline}
                  </Text>
                  <Text style={{ color: "white", fontSize: 13 }}>
                    {`${data.overview.slice(0, 320)}...`}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                justifyContent: "flex-end",
                flexDirection: "row",
                gap: 16,
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <IconButton
                  icon={isBookmarkSelected ? "bookmark" : "bookmark-outline"}
                  size={30}
                  iconColor="white"
                  onPress={saveFavo}
                />
                <IconButton
                  onPress={() =>
                    navigation.navigate("CommentMovieModal", {
                      id: data.id,
                    })
                  }
                  icon="comment-outline"
                  size={25}
                  iconColor="white"
                />
              </View>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <IconButton
                  icon="calendar-check-outline"
                  iconColor="red"
                  size={25}
                />
                <Text
                  style={{
                    color: "white",
                    fontWeight: "900",
                    textAlign: "center",
                  }}
                >
                  {data.release_date}
                </Text>
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    flex: 1,
                  }}
                >
                  <IconButton
                    icon={data.runtime ? "clock-check-outline" : "Coming Soon"}
                    iconColor="red"
                    size={25}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "900",
                    }}
                  >
                    {data.runtime} Munites
                  </Text>
                  <IconButton
                    icon={data.runtime ? "star" : "No Vote"}
                    iconColor="yellow"
                    size={25}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "900",
                      fontSize: 16,
                      paddingRight: 15,
                    }}
                  >
                    {data.vote_average.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
            {data?.spoken_languages.length > 5 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 8,
                    alignItems: "center",
                    marginHorizontal: 16,
                  }}
                >
                  {data?.spoken_languages?.map((dt, i) => (
                    <TouchableOpacity key={i}>
                      <Text
                        style={{
                          borderRadius: 12,
                          color: "black",
                          backgroundColor: "#ededed",
                          fontWeight: "900",
                          padding: 8,
                        }}
                      >
                        {dt?.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  gap: 16,
                  paddingLeft: 16,
                  alignItems: "center",
                }}
              >
                {data?.spoken_languages?.map((dt, i) => (
                  <TouchableOpacity key={i}>
                    <Text
                      style={{
                        borderRadius: 12,
                        color: "black",
                        backgroundColor: "#ededed",
                        fontWeight: "900",
                        padding: 8,
                      }}
                    >
                      {dt?.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>
          <Toast />
        </SafeAreaView>
      )}
    </>
  );
};

export default DetailPage;
