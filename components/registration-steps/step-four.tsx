import { View } from "react-native";
import React, { useState } from "react";
import { Input, Text } from "tamagui";
import styles from "@/app/auth/styles";
import ActionButton from "./action-button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  selectUserRegistrationData,
  setUserRegistrationData,
} from "@/store/authSlice";

export default function StepFour({
  incrementStep,
}: {
  incrementStep: () => void;
}) {
  const registrationData = useSelector((state: RootState) =>
    selectUserRegistrationData(state)
  );

  const dispatch: AppDispatch = useDispatch();

  const canContinue = () => {
    return registrationData.address.length >= 20;
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
          What's Your Residential Address?
        </Text>
        <Text fontSize="$2">Please give us details of where you live</Text>
      </View>
      <Input
        placeholder="Residential Address"
        style={{
          ...styles.input,
          marginTop: 20,
        }}
        keyboardType="email-address"
        onChangeText={(text) => {
          dispatch(setUserRegistrationData({ address: text }));
        }}
        value={registrationData.address}
      />
      <ActionButton
        canContinue={canContinue}
        pressHandler={async () => {
          incrementStep();
        }}
      />
    </View>
  );
}
