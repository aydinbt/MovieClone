import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { firebase } from "./src/fireBaseConfig";
import LoginPage from "./src/GELAL.com/pages/AuthStack/LoginPage/LoginPage";
import RegisterPage from "./src/GELAL.com/pages/AuthStack/RegisterPage/RegisterPage";
import HomeProductPage from "./src/GELAL.com/pages/HomePage/HomeProductPage/HomeProductPage";
import WelcomeScreen from "./src/GELAL.com/pages/AuthStack/WelcomeScreen";
import DetailPage from "./src/GELAL.com/pages/HomePage/DetailPage/DetailPage";
import ProfilePage from "./src/GELAL.com/pages/HomePage/ProfilePage/ProfilePage";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { ScrollView } from "native-base";
import CommentMovieModal from "./src/GELAL.com/components/CommentMovieModal/CommentMovieModal";

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#EC407A",
    secondary: "black",
  },
};
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomePage" component={HomeProductPage} />
      <Stack.Screen name="DetailPage" component={DetailPage} />
      <Stack.Screen name="ProfilePage" component={ProfilePage} />
      <Stack.Screen
        name="CommentMovieModal"
        component={CommentMovieModal}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
    </Stack.Navigator>
  );
};

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          style={{ flex: 1 }}
        >
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!user ? (
              <Stack.Screen name="AuthStack" component={AuthStack} />
            ) : (
              <Stack.Screen name="HomeStack" component={HomeStack} />
            )}
          </Stack.Navigator>
        </KeyboardAvoidingView>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
