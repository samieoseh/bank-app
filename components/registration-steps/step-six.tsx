import { View } from "react-native";
import React, { useState } from "react";
import { Text } from "tamagui";
import ActionButton from "./action-button";
import TokenInput from "../ui/token-input";
import axios from "axios";
import CurrentToast from "../ui/current-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  selectUserRegistrationData,
  setCurrentLoggedInUser,
  setUserRegistrationData,
} from "@/store/authSlice";
import { useToastController } from "@tamagui/toast";
import { useRouter } from "expo-router";
import { useAuth } from "@/app/context/AuthContext";

export default function StepSix() {
  const registrationData = useSelector((state: RootState) =>
    selectUserRegistrationData(state)
  );

  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const toast = useToastController();

  const router = useRouter();

  const canContinue = () => {
    return (
      registrationData.transactionPin.length === 4 &&
      registrationData.transactionPin === registrationData.confirmTransactionPin
    );
  };

  const handleRegistration = async () => {
    try {
      // make api call to register user
      // get all roles
      setLoading(true);
      const rolesResponse = await axios.get(
        process.env.EXPO_PUBLIC_REMOTE_DEPLOYMENT_URL + "/api/roles"
      );
      const roles = await rolesResponse.data;

      // get all accountTypes
      const accountTypesResponse = await axios.get(
        process.env.EXPO_PUBLIC_REMOTE_DEPLOYMENT_URL + "/api/account-types"
      );
      const accountTypes = await accountTypesResponse.data;

      // find the user role
      const userRole = roles.find((role: any) => role.roleName === "user");

      // find the savings account
      const savingsAccount = accountTypes.find(
        (accountType: any) => accountType.typeName === "Savings"
      );

      const response = await axios.post(
        process.env.EXPO_PUBLIC_REMOTE_DEPLOYMENT_URL + "/api/users/register",
        {
          username: registrationData.username,
          fullName: registrationData.fullName,
          email: registrationData.emailAddress,
          phoneNumber: registrationData.phoneNumber,
          password: registrationData.password,
          address: registrationData.address,
          active: registrationData.active,
          emailVerified: registrationData.emailVerified,
          balance: registrationData.balance,
          accountNumber: registrationData.phoneNumber.slice(1),
          transactionPin: registrationData.transactionPin,
          userRole: {
            id: userRole.id,
          },
          accountType: {
            id: savingsAccount.id,
          },
        }
      );

      await response.data;

      login.mutate({
        username: registrationData.username,
        password: registrationData.password,
      });

      toast.show("Account created successfully!", {
        message: "Horray, your account has been created successfully",
        native: true,
        type: "success",
      });

      router.push("/auth/welcome");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
          Create your transaction pin
        </Text>
        <Text fontSize="$2">Please enter a 4-digit transaction pin</Text>
      </View>
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
              value={registrationData.transactionPin}
              setValue={setUserRegistrationData}
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
              value={registrationData.confirmTransactionPin}
              setValue={setUserRegistrationData}
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
  );
}
