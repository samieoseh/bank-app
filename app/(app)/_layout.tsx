import { useAuth } from "@/hooks/useAuth";
import { Redirect, Stack } from "expo-router";
import { AuthContextProps } from "../context/AuthContext";

export default function AppLayout() {
  const { authState } = useAuth() as AuthContextProps;

  if (!authState?.authenticated || authState.authenticated === null) {
    return <Redirect href="/(app)/" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="receipts" options={{ headerShown: false }} />
    </Stack>
  );
}
