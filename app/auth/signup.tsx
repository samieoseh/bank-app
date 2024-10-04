import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Platform,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import React, { useState } from "react";
import styles from "./styles";
import StepOne from "@/components/registration-steps/step-one";
import StepTwo from "@/components/registration-steps/step-two";
import StepThree from "@/components/registration-steps/step-three";
import { router, useRouter } from "expo-router";
import StepFour from "@/components/registration-steps/step-four";
import StepFive from "@/components/registration-steps/step-five";
import StepSix from "@/components/registration-steps/step-six";

export default function Signup() {
  const [registrationStep, setRegistrationStep] = useState(1);
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
                if (registrationStep === 1) {
                  router.push("/");
                }
                setRegistrationStep((prev) => prev - 1);
              }}
            />
          </View>

          {/* steps */}
          {registrationStep === 1 && (
            <StepOne
              incrementStep={() => setRegistrationStep(registrationStep + 1)}
            />
          )}

          {registrationStep === 2 && (
            <StepTwo
              incrementStep={() => setRegistrationStep(registrationStep + 1)}
            />
          )}

          {registrationStep === 3 && (
            <StepThree
              incrementStep={() => setRegistrationStep(registrationStep + 1)}
            />
          )}

          {registrationStep === 4 && (
            <StepFour
              incrementStep={() => setRegistrationStep(registrationStep + 1)}
            />
          )}

          {registrationStep === 5 && (
            <StepFive
              incrementStep={() => setRegistrationStep(registrationStep + 1)}
            />
          )}
          {registrationStep === 6 && <StepSix />}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
