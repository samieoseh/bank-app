import { View } from "react-native";
import React from "react";
import { Input, Text } from "tamagui";
import styles from "@/app/auth/styles";
import ActionButton from "../registration-steps/action-button";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserUpdateRegistrationData,
  setUserUpdateRegistrationData,
} from "@/store/authSlice";
import { RootState } from "@/store";

export default function StepOne({
  incrementStep,
}: {
  incrementStep: () => void;
}) {
  const dispatch = useDispatch();

  const userUpdateRegistrationData = useSelector((state: RootState) =>
    selectUserUpdateRegistrationData(state)
  );

  const canContinue = () => {
    return (
      userUpdateRegistrationData.fullName.length >= 8 &&
      userUpdateRegistrationData.accountNumber.length >= 10
    );
  };

  return (
    <View>
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
          Account Number
        </Text>

        <Input
          placeholder="Account Number"
          style={{
            ...styles.input,
            marginTop: 5,
          }}
          keyboardType="number-pad"
          onChangeText={(text) => {
            dispatch(setUserUpdateRegistrationData({ accountNumber: text }));
          }}
          value={userUpdateRegistrationData.accountNumber}
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
          Full Name
        </Text>

        <Input
          placeholder="Full Name"
          style={{
            ...styles.input,
            marginTop: 5,
          }}
          keyboardType="default"
          onChangeText={(text) => {
            dispatch(setUserUpdateRegistrationData({ fullName: text }));
          }}
          value={userUpdateRegistrationData.fullName}
        />
      </View>

      <ActionButton
        canContinue={() => canContinue()}
        pressHandler={async () => {
          incrementStep();
        }}
      />
    </View>
  );
}
