import { View } from "react-native";
import React, { useRef, useState } from "react";
import { Input, Text } from "tamagui";
import styles from "@/app/auth/styles";
import ActionButton from "./action-button";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserRegistrationData,
  setUserRegistrationData,
} from "@/store/authSlice";
import { AppDispatch, RootState } from "@/store";
import axios from "axios";
import { useToastController } from "@tamagui/toast";

interface Errors {
  username?: string;
}

export default function StepOne({
  incrementStep,
}: {
  incrementStep: () => void;
}) {
  const [errors, setErrors] = useState<Errors>({});
  const usernameInputRef = useRef(null);

  const registrationData = useSelector((state: RootState) =>
    selectUserRegistrationData(state)
  );
  const dispatch: AppDispatch = useDispatch();

  const canContinue = () => {
    return (
      registrationData.username.length > 8 &&
      registrationData.fullName.length > 8
    );
  };

  const validateUsernameAndIncrement = async (username: string) => {
    try {
      await axios.get(
        process.env.EXPO_PUBLIC_REMOTE_DEPLOYMENT_URL +
          `/api/users/register/validate-username/${username}`
      );
      {
        setErrors({});
        incrementStep();
      }
    } catch (error) {
      setErrors({ username: error.response.data });
      usernameInputRef?.current?.focus();
    }
  };

  console.log({ errors });

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
          Basic Information
        </Text>
        <Text fontSize="$2">
          Enter your basic information you want to use to create your account
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
            dispatch(setUserRegistrationData({ fullName: text }));
          }}
          value={registrationData.fullName}
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
          Username
        </Text>
        <Input
          placeholder="Username"
          style={{
            ...styles.input,
            marginTop: 5,

            borderWidth: errors?.username ? 1 : 0,
            borderColor: errors?.username ? "red" : "transparent",
          }}
          keyboardType="default"
          onChangeText={(text) => {
            dispatch(setUserRegistrationData({ username: text }));
          }}
          ref={usernameInputRef}
          value={registrationData.username}
        />
        <Text>
          {errors?.username ? (
            <Text style={{ color: "red" }}>{errors?.username}</Text>
          ) : null}
        </Text>
      </View>

      <ActionButton
        canContinue={canContinue}
        pressHandler={async () => {
          await validateUsernameAndIncrement(registrationData.username);
        }}
      />
    </View>
  );
}
