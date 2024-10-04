import { Redirect, Stack } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function AppLayout() {
  const { authState } = useAuth();
  console.log({ authState });

  if (!authState?.authenticated || authState.authenticated === null) {
    console.log("redirecting");
    return <Redirect href="/(app)/" />;
  }

  console.log("not redirecting");
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
    </Stack>
  );
}
