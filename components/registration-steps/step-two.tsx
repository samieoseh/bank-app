import { View } from "react-native";
import React, { useState } from "react";
import { Input, Text } from "tamagui";
import styles from "@/app/auth/styles";
import StyledButton from "../ui/button";
import ActionButton from "./action-button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  selectUserRegistrationData,
  setUserRegistrationData,
} from "@/store/authSlice";

export default function StepTwo({
  incrementStep,
}: {
  incrementStep: () => void;
}) {
  const [sendingEmail, setSendingEmail] = useState(false);

  const registrationData = useSelector((state: RootState) =>
    selectUserRegistrationData(state)
  );

  const dispatch: AppDispatch = useDispatch();

  const canContinue = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      registrationData.emailAddress.length >= 15 &&
      emailRegex.test(registrationData.emailAddress) &&
      registrationData.phoneNumber.length === 11
    );
  };

  const sendEmail = async (emailAddress: string) => {
    try {
      setSendingEmail(true);
      await axios.post(
        process.env.EXPO_PUBLIC_REMOTE_DEPLOYMENT_URL + "/api/email/send",
        {
          to: emailAddress,
        }
      );
      incrementStep();
    } catch (error) {
      console.error(error);
    } finally {
      setSendingEmail(false);
    }
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
          Contact Information?
        </Text>
        <Text fontSize="$2">
          Enter the email address and phone number you want to use to create
          your account
        </Text>
      </View>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: "#A5A5A5",
          }}
        >
          Phone Number
        </Text>
        <Input
          placeholder="Phone Number"
          style={{
            ...styles.input,
            marginTop: 5,
          }}
          keyboardType="phone-pad"
          onChangeText={(text) => {
            dispatch(setUserRegistrationData({ phoneNumber: text }));
          }}
          value={registrationData.phoneNumber}
        />
      </View>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: "#A5A5A5",
          }}
        >
          Email Address
        </Text>
        <Input
          placeholder="Email Address"
          style={{
            ...styles.input,
            marginTop: 5,
          }}
          keyboardType="email-address"
          onChangeText={(text) => {
            dispatch(setUserRegistrationData({ emailAddress: text }));
          }}
          value={registrationData.emailAddress}
        />
      </View>
      <ActionButton
        canContinue={canContinue}
        pressHandler={async () => {
          // send email to the provided email address
          if (registrationData.emailVerified) {
            incrementStep();
          } else {
            await sendEmail(registrationData.emailAddress);
          }
        }}
        loading={sendingEmail}
      />
    </View>
  );
}
