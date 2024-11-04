import { View } from "react-native";
import React, { useState } from "react";
import { Text } from "tamagui";
import TokenInput from "../ui/token-input";
import ActionButton from "../registration-steps/action-button";
import CurrentToast from "../ui/current-toast";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUserUpdateRegistrationData,
  selectUserUpdateRegistrationData,
  setUserUpdateRegistrationData,
} from "@/store/authSlice";
import { useToastController } from "@tamagui/toast";
import { useRouter } from "expo-router";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

export default function StepThree() {
  const userUpdateRegistrationData = useSelector((state: RootState) =>
    selectUserUpdateRegistrationData(state)
  );

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const toast = useToastController();

  const router = useRouter();

  const canContinue = () => {
    return (
      userUpdateRegistrationData.transactionPin.length === 4 &&
      userUpdateRegistrationData.transactionPin ===
        userUpdateRegistrationData.confirmTransactionPin
    );
  };

  const handleRegistration = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(
        process.env.EXPO_PUBLIC_REMOTE_DEPLOYMENT_URL +
          "/api/users/complete-registration",
        {
          accountNumber: userUpdateRegistrationData.accountNumber,
          transactionPin: userUpdateRegistrationData.transactionPin,
          fullName: userUpdateRegistrationData.fullName,
          username: userUpdateRegistrationData.username,
          password: userUpdateRegistrationData.password,
        }
      );

      await response.data;

      login.mutate({
        username: userUpdateRegistrationData.username,
        password: userUpdateRegistrationData.password,
      });

      toast.show("Account created successfully!", {
        message: "Horray, your account has been created successfully",
        native: true,
        type: "success",
      });

      dispatch(resetUserUpdateRegistrationData());
      router.push("/auth/welcome");
    } catch (error) {
      console.error("Error registering user", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <View
        style={{
          height: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            paddingVertical: 20,
          }}
        >
          <View
            style={{
              gap: 8,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                color: "#A5A5A5",
              }}
            >
              Enter Transaction Pin
            </Text>
            <View
              style={{
                display: "flex",
                borderWidth: 0.5,
                paddingVertical: 20,
                borderRadius: 5,
                borderColor: "#E5E5E5",
              }}
            >
              <TokenInput
                value={userUpdateRegistrationData.transactionPin}
                setValue={setUserUpdateRegistrationData}
                length={4}
                valueLabel="transactionPin"
              />
            </View>
          </View>

          <View
            style={{
              gap: 8,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                color: "#A5A5A5",
              }}
            >
              Confirm Transaction Pin
            </Text>
            <View
              style={{
                display: "flex",
                borderWidth: 0.5,
                paddingVertical: 20,
                borderRadius: 5,
                borderColor: "#E5E5E5",
              }}
            >
              <TokenInput
                value={userUpdateRegistrationData.confirmTransactionPin}
                setValue={setUserUpdateRegistrationData}
                length={4}
                valueLabel="confirmTransactionPin"
              />
            </View>
          </View>
        </View>

        <ActionButton
          canContinue={canContinue}
          loading={loading}
          pressHandler={async () => {
            await handleRegistration();
          }}
          message={loading ? "Please wait..." : "Create Account"}
        />
        <CurrentToast />
      </View>
    </View>
  );
}
