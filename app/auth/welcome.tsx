import { View } from "react-native";
import React from "react";
import styles from "./styles";
import { Button, Text } from "tamagui";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  selectCurrentLoggedInUser,
  selectUserRegistrationData,
} from "@/store/authSlice";
import { useAuth } from "../context/AuthContext";

export default function Welcome() {
  const currentLoggedInUser = useSelector((state: RootState) =>
    selectCurrentLoggedInUser(state)
  );

  const router = useRouter();
  return (
    <View style={{ ...styles.containerBox, marginTop: 48 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 900,
          textAlign: "center",
        }}
      >
        Congratulations! Your account is all set and ready to go!
      </Text>
      <Text
        style={{
          textAlign: "center",
          marginVertical: 10,
          color: "#A5A5A5",
          fontSize: 12,
          fontWeight: 400,
        }}
      >
        Your account details are shown below
      </Text>
      <View
        style={{
          marginVertical: 40,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fafafa",
            padding: 15,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: 400,
              color: "#A5A5A5",
            }}
          >
            Account Number
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 900,
            }}
          >
            {currentLoggedInUser.accountNumber}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              flex: 1,
              backgroundColor: "#fafafa",
              padding: 15,
              borderRadius: 8,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 400,
                  color: "#A5A5A5",
                }}
              >
                Account Name
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 900,
                }}
              >
                {currentLoggedInUser.fullName}
              </Text>
            </View>

            <View>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 400,
                  color: "#A5A5A5",
                }}
              >
                Account Type
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 900,
                }}
              >
                {currentLoggedInUser.accountType.typeName}
              </Text>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              flex: 1,
              backgroundColor: "#fafafa",
              padding: 15,
              borderRadius: 8,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 400,
                  color: "#A5A5A5",
                }}
              >
                Account Balance
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 900,
                }}
              >
                NGN {currentLoggedInUser.balance.toFixed(2)}
              </Text>
            </View>

            <View>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 400,
                  color: "#A5A5A5",
                }}
              >
                Account Status
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 900,
                }}
              >
                {currentLoggedInUser.active ? "Active" : "Inactive"}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <Button
        style={{
          width: "100%",
          backgroundColor: "#008080",
          borderColor: "#008080",
          color: "#fff",
        }}
        onPress={() => {
          router.push("/(app)/(tabs)/");
        }}
      >
        Proceed to Home
      </Button>
    </View>
  );
}
