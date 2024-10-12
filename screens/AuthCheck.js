// src/components/AuthCheck.js

import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { isTokenExpired } from "../api/authAPI";

const AuthCheck = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      const tokenExpired = await isTokenExpired();
      if (tokenExpired) {
        console.log("token expired/doesn't exist")
        navigation.navigate("Homepage"); // Redirect to login if token is expired
      } else {
        console.log("token valid")
        navigation.navigate("Profile"); // TODO: Redirect to HOME
      }
    };

    checkAuth();
  }, []);

  return null; // No UI for this component, just navigation logic
};

export default AuthCheck;
