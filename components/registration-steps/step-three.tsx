import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Input, Text } from "tamagui";
import styles from "@/app/auth/styles";
import StyledButton from "../ui/button";
import ActionButton from "./action-button";
import TokenInput from "../ui/token-input";
import axios from "axios";
import { useToastController } from "@tamagui/toast";
import CurrentToast from "../ui/current-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  selectUserRegistrationData,
  setUserRegistrationData,
} from "@/store/authSlice";

export default function StepThree({
  incrementStep,
}: {
  incrementStep: () => void;
}) {
  const registrationData = useSelector((state: RootState) =>
    selectUserRegistrationData(state)
  );
  console.log({ registrationData });

  const dispatch: AppDispatch = useDispatch();

  const toast = useToastController();

  useEffect(() => {
    toast.hide();
  }, []);

  const verifyToken = async () => {
    // make api call to verify token
    try {
      const response = await axios.post(
        process.env.EXPO_PUBLIC_REMOTE_DEPLOYMENT_URL + "/api/email/verify",
        {
          emailAddress: registrationData.emailAddress,
          token: +registrationData.token,
        }
      );
      const data = await response.data;

      toast.show("Email verified!", {
        message: "Don't worry, we've verified your email.",
        native: false,
      });
      dispatch(setUserRegistrationData({ emailVerified: true }));
    } catch (error) {
      toast.show("Email verification failed!", {
        message: "Check your email and try again",
        native: false,
        type: "error",
      });
    }
  };
  const canContinue = () => {
    return registrationData.token.length === 6;
  };

  return (
    <View
      style={{
        height: "100%",
      }}
    >
      <View
        style={{
          paddingVertical: 15,
          gap: 10,
        }}
      >
        <Text fontSize="$6" fontWeight="900">
          Verify Your Email Address
        </Text>
        <Text fontSize="$2">
          We've sent a 6 digit code to the email address you provided, please
          enter it here
        </Text>
      </View>
      <TokenInput
        token={registrationData.token}
        setToken={setUserRegistrationData}
      />

      <ActionButton
        canContinue={canContinue}
        pressHandler={async () => {
          if (registrationData.emailVerified) {
            incrementStep();
          } else {
            await verifyToken();
          }
        }}
        message={
          registrationData.emailVerified ? "Continue" : "Verify Email Address"
        }
      />
      <CurrentToast />
    </View>
  );
}
