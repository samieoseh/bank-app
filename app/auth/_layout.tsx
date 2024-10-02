import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}
