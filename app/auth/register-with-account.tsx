import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Text } from "tamagui";
import styles from "./styles";
import StepOne from "@/components/registration-steps-account/step-one";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import StepTwo from "@/components/registration-steps-account/step-two";
import StepThree from "@/components/registration-steps-account/step-three";

export default function RegisterWithAccount() {
  const [step, setStep] = useState(1);

  const router = useRouter();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.containerBox}>
          <View>
            <ArrowLeft
              stroke="#0EBC60"
              onPress={() => {
                if (step === 1) {
                  router.push("/");
                }
                setStep((prev) => prev - 1);
              }}
            />
          </View>
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
                User Information
              </Text>
              <Text fontSize="$2">
                Please provide your user information below to activate your
                account and get started!
              </Text>
            </View>

            {step === 1 && (
              <StepOne incrementStep={() => setStep((prev) => prev + 1)} />
            )}

            {step === 2 && (
              <StepTwo incrementStep={() => setStep((prev) => prev + 1)} />
            )}

            {step === 3 && <StepThree />}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
