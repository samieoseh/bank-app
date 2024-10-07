import { View } from "react-native";
import React, { useRef, useState } from "react";
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

interface Errors {
  phoneNumber?: string;
  emailAddress?: string;
}

export default function StepTwo({
  incrementStep,
}: {
  incrementStep: () => void;
}) {
  const [errors, setErrors] = useState<Errors>({});
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);

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

  const validatePhoneNumber = async (phoneNumber: string) => {
    try {
      const response = await axios.get(
        process.env.EXPO_PUBLIC_REMOTE_DEPLOYMENT_URL +
          `/api/users/register/validate-phone-number/${phoneNumber}`
      );
      {
        setErrors({});
      }

      return response;
    } catch (error) {
      setErrors((prev) => ({ ...prev, phoneNumber: error.response.data }));
      phoneInputRef?.current?.focus();
    }
  };

  const validateEmail = async (emailAddress: string) => {
    try {
      const response = await axios.get(
        process.env.EXPO_PUBLIC_REMOTE_DEPLOYMENT_URL +
          `/api/users/register/validate-email/${emailAddress}`
      );
      {
        setErrors({});
      }
      return response;
    } catch (error) {
      setErrors((prev) => ({ ...prev, emailAddress: error.response.data }));
      emailInputRef?.current?.focus();
    }
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
            borderWidth: errors?.phoneNumber ? 1 : 0,
            borderColor: errors?.phoneNumber ? "red" : "transparent",
          }}
          ref={phoneInputRef}
          keyboardType="phone-pad"
          onChangeText={(text) => {
            dispatch(setUserRegistrationData({ phoneNumber: text }));
          }}
          value={registrationData.phoneNumber}
        />
        <Text>
          {errors?.phoneNumber ? (
            <Text style={{ color: "red" }}>{errors?.phoneNumber}</Text>
          ) : null}
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
          Email Address
        </Text>
        <Input
          placeholder="Email Address"
          ref={emailInputRef}
          style={{
            ...styles.input,
            marginTop: 5,
            borderWidth: errors?.emailAddress ? 1 : 0,
            borderColor: errors?.emailAddress ? "red" : "transparent",
          }}
          keyboardType="email-address"
          onChangeText={(text) => {
            dispatch(setUserRegistrationData({ emailAddress: text }));
          }}
          value={registrationData.emailAddress}
        />
        <Text>
          {errors?.emailAddress ? (
            <Text style={{ color: "red" }}>{errors?.emailAddress}</Text>
          ) : null}
        </Text>
      </View>
      <ActionButton
        canContinue={canContinue}
        pressHandler={async () => {
          // send email to the provided email address
          if (registrationData.emailVerified) {
            incrementStep();
          } else {
            const response1 = await validatePhoneNumber(
              registrationData.phoneNumber
            );
            const response2 = await validateEmail(
              registrationData.emailAddress
            );
            if (response1?.status === 200 && response2?.status === 200) {
              await sendEmail(registrationData.emailAddress);
            } else {
              console.log("error", response1, response2);
            }
          }
        }}
        loading={sendingEmail}
      />
    </View>
  );
}
