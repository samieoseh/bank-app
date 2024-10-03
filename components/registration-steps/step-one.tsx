import { View } from "react-native";
import React from "react";
import { Input, Text } from "tamagui";
import styles from "@/app/auth/styles";
import StyledButton from "../ui/button";
import ActionButton from "./action-button";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserRegistrationData,
  setUserRegistrationData,
} from "@/store/authSlice";
import { AppDispatch, RootState } from "@/store";

export default function StepOne({
  incrementStep,
}: {
  incrementStep: () => void;
}) {
  const registrationData = useSelector((state: RootState) =>
    selectUserRegistrationData(state)
  );
  const dispatch: AppDispatch = useDispatch();

  const canContinue = () => {
    return registrationData.phoneNumber.length === 11;
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
          What's Your Phone Number?
        </Text>
        <Text fontSize="$2">
          Enter the phone number you want to use to create your account
        </Text>
      </View>
      <Input
        placeholder="Phone Number"
        style={{
          ...styles.input,
          marginTop: 20,
        }}
        keyboardType="phone-pad"
        onChangeText={(text) => {
          dispatch(setUserRegistrationData({ phoneNumber: text }));
        }}
        value={registrationData.phoneNumber}
      />
      <ActionButton
        canContinue={canContinue}
        pressHandler={() => {
          incrementStep();
        }}
      />
    </View>
  );
}
