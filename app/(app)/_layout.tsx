import { Redirect, Stack } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function AppLayout() {
  const { authState } = useAuth();

  if (!authState?.authenticated || authState.authenticated === null) {
    return <Redirect href="/(app)/" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
