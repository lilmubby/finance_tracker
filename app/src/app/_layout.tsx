import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="signup" options={{
        headerShown:true,
        headerTitle: "",
        headerBackTitleVisible: false,
      }} />
      <Stack.Screen name="signin" options={{
        headerShown:true,
        headerTitle: "",
        headerBackTitleVisible: false,
      }} />
    </Stack>
  );
}
