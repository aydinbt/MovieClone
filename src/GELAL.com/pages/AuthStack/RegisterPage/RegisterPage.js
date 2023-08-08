import { View } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { Button, TextInput, Text } from "react-native-paper";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { firebase } from "../../../../fireBaseConfig";
const RegisterPage = () => {
  const showToast = ({ status, title }) => {
    Toast.show({
      type: status,
      text1: title,
    });
  };
  const navigation = useNavigation();
  const registerSubmit = (formvalues) => {
    if (formvalues.passwd === formvalues.repasswd && formvalues.email) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(formvalues.email, formvalues.passwd);
      showToast({
        status: "success",
        title: "Kayıt Tamamlanmıştır.  🎉 ✅",
      });
    } else {
      showToast({ status: "error", title: "Bilgileri doğru giriniz. ❌😔" });
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#EEEEEE" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 12,
        }}
      >
        <IconButton
          icon="arrow-left"
          iconColor="#FF1744"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            borderRadius: 12,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            alignContent: "center",
            fontWeight: "900",
          }}
        >
          GO BACK
        </Text>
      </View>
      <Image
        source={require("../../../assets/LoginPageImage/ticket.png")}
        style={{
          width: "60%",
          height: "50%",
          top: 0,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
        contentFit="contain"
      />
      <Formik
        initialValues={{ email: "", passwd: "", repasswd: "" }}
        onSubmit={registerSubmit}
      >
        {({ handleSubmit, values, handleChange }) => (
          <View
            style={{
              marginTop: -30,
              paddingHorizontal: 16,
              gap: 8,
              marginHorizontal: 18,
            }}
          >
            <TextInput
              placeholder="example@gmail.com"
              label="E-mail adress"
              keyboardType="email-address"
              mode="flat"
              value={values.email}
              onChangeText={handleChange("email")}
              style={{ backgroundColor: "#EEEEEE" }}
              right={<TextInput.Icon icon="email" />}
              outlineStyle={{ borderRadius: 12 }}
            />
            <TextInput
              placeholder="****"
              label="Password"
              mode="flat"
              secureTextEntry
              onChangeText={handleChange("passwd")}
              value={values.passwd}
              style={{ backgroundColor: "#EEEEEE" }}
              right={<TextInput.Icon icon="key" />}
              outlineStyle={{ borderRadius: 12 }}
            />
            <TextInput
              placeholder="****"
              secureTextEntry
              label="Re-Password"
              onChangeText={handleChange("repasswd")}
              value={values.repasswd}
              mode="flat"
              style={{ backgroundColor: "#EEEEEE" }}
              right={<TextInput.Icon icon="key" />}
              outlineStyle={{ borderRadius: 12 }}
            />

            <View
              style={{
                marginTop: 10,
                gap: 8,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onPress={handleSubmit}
                icon="account-plus"
                mode="contained"
                labelStyle={{ fontWeight: "900" }}
              >
                SIGN UP
              </Button>
              <Button
                mode="outlined"
                icon="arrow-left"
                onPress={() => navigation.goBack()}
                labelStyle={{ fontWeight: "900" }}
              >
                GO BACK
              </Button>
            </View>
          </View>
        )}
      </Formik>
      <Toast />
    </SafeAreaView>
  );
};

export default RegisterPage;
