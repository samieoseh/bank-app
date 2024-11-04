import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

async function save(key: string, value: string) {
    try {
      if (Platform.OS === "web") {
        await AsyncStorage.setItem(key, value);
      } else {
        // mobile
        await SecureStore.setItemAsync(key, value.toString());
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }

  async function remove(key: string) {
    try {
      if (Platform.OS === "web") {
        await AsyncStorage.removeItem(key);
      } else {
        // mobile
        await SecureStore.deleteItemAsync(key);
      }
    } catch (error) {
      console.error("Error removing data:", error);
    }
  }

  async function getValueFor(key: string) {
    try {
      return Platform.OS === "web"
        ? await AsyncStorage.getItem(key)
        : await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  }

export { save, remove, getValueFor };