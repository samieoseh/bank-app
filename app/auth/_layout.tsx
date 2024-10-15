import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen
        name="register-with-account"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
