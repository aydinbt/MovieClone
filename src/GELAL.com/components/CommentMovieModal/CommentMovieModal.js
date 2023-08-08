import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  addComment,
  useBookMarkListener,
  useMoviesCommentMarkListener,
  firebase,
  db,
  setHeart,
} from "../../../fireBaseConfig";
import useFetch from "../../hooks/useFetch/useFetch";
import {
  ActivityIndicator,
  Avatar,
  Divider,
  IconButton,
  TextInput,
} from "react-native-paper";
import { Formik } from "formik";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { parseISO, formatDistance, formatRelative, format } from "date-fns";
import { tr } from "date-fns/locale";

const CommentMovieModal = ({ route }) => {
  const navigation = useNavigation();
  const { id } = route.params;
  const { data, loading } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}`
  );
  const user = firebase.auth().currentUser;

  const [count, setCount] = useState(0);
  const commentSubmit = useMoviesCommentMarkListener();

  const handleComment = (form) => {
    if (form.comment === "") {
      return alert("Boş Bırakmayınız");
    }
    addComment(id, form.comment, count);
    form.comment = "";
  };

  const handleHeartChange = async (id) => {
    setCount(count + 1);
    const commentRef = doc(db, "/MoviesComments", id);
    await updateDoc(commentRef, {
      heart: count,
    });
  };
  return (
    <>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <SafeAreaView style={{ backgroundColor: "#E0E0E0", flex: 1 }}>
          <View style={{ marginTop: 50 }}>
            <View style={styles.navbar_container}>
              <IconButton
                onPress={() => navigation.goBack()}
                icon="arrow-left"
                iconColor="red"
                size={30}
              />
            </View>
            <Text style={styles.navbar_title}>{data.title}</Text>
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={styles.think_text}>Film Hakkındaki Yorumlar</Text>
          </View>
          <View style={{ marginHorizontal: 16, marginTop: 12 }}>
            <Formik initialValues={{ comment: "" }} onSubmit={handleComment}>
              {({ handleChange, values, handleSubmit }) => (
                <View>
                  <TextInput
                    right={
                      <TextInput.Icon
                        icon="arrow-right-thin-circle-outline"
                        onPress={handleSubmit}
                        color="black"
                      />
                    }
                    label="Düşünceni paylaş"
                    value={values.comment}
                    onChangeText={handleChange("comment")}
                    multiline={false}
                    style={{ backgroundColor: "#ededed", margin: 12 }}
                  />
                </View>
              )}
            </Formik>
          </View>
          <Divider style={{ marginTop: 8 }} bold />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 25, marginHorizontal: 16 }}
          >
            {commentSubmit?.map((data, i) =>
              data.uid === id ? (
                <View key={i}>
                  <View
                    style={{
                      flex: 1,
                      borderRadius: 12,
                      marginBottom: 12,
                      elevation: 4,
                      flexDirection: "row",
                      backgroundColor: "#ededed",
                      padding: 12,
                    }}
                  >
                    <Avatar.Text label={user.email.slice(0, 2).toUpperCase()} />
                    <View
                      style={{
                        flex: 1,
                        marginLeft: 12,
                        gap: 8,
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ flex: 1 }}>{data.desc}</Text>
                        <IconButton
                          onPress={() => handleHeartChange(data.id)}
                          icon="heart"
                          iconColor="red"
                        />
                        <Text>{data.heart}</Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ flex: 1, fontSize: 12 }}>
                          {user.email}
                        </Text>
                        <Text style={{ textAlign: "right", fontSize: 12 }}>
                          {data.date}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
                ""
              )
            )}
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default CommentMovieModal;

const styles = StyleSheet.create({
  date: {
    marginLeft: 5,
    marginTop: 5,
    fontWeight: "900",
    fontSize: 12,
  },
  desc: {
    marginLeft: 10,
    flex: 1,
    fontWeight: "700",
    fontSize: 12,
  },
  navbar_container: {
    position: "absolute",
    zIndex: 2,
    left: 15,
    bottom: -20,
  },
  navbar_title: {
    color: "black",
    fontWeight: "900",
    textAlign: "center",
  },
  think_text: {
    color: "black",
    textAlign: "center",
    fontWeight: "600",

    fontSize: 12,
  },
  comment_container: {
    backgroundColor: "#ededed",
    elevation: 10,
    padding: 12,
    marginBottom: 12,
  },
  commet_inner_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  user: {
    marginLeft: 5,
    marginTop: 5,
    flex: 1,
  },
});
