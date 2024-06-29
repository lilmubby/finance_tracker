import { ActivityIndicator, Alert } from "react-native";
import { getToken } from "../util/token";
import { Redirect } from "expo-router";
import { useState, useEffect } from "react";

export default function index() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const tokenQ = await getToken();
        setToken(tokenQ || null);
      } catch (error) {
        console.error('Error fetching token:', error);
        Alert.alert("An error has occurred.", "Please try again.")
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return !!token ? <Redirect href="/home" /> : <Redirect href="/signin" />;
}
