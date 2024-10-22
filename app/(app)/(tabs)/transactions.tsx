import { View } from "react-native";
import { useState } from "react";
import { Button, Input, Label, Text } from "tamagui";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { selectCurrentLoggedInUser } from "@/store/authSlice";
import Drawer from "@/components/ui/drawer";
import axios, { isAxiosError } from "axios";
import DebouncedInput from "@/components/ui/debounced-input";
import { TransactionReciepientType } from "@/typings/typings";
import {
  LucideCheck,
  LucideCheckCheck,
  LucideCircle,
} from "lucide-react-native";

export default function Transaction() {
  const [accountNumber, setAccountNumber] = useState("1234567890");
  const [amount, setAmount] = useState("200");
  const [isAccountNumberVerified, setIsAccountNumberVerified] = useState(true);
  const [reciepient, setReciepient] =
    useState<TransactionReciepientType | null>(null);
  const [isBalanceEnough, setIsBalanceEnough] = useState<undefined | boolean>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const verifyAccountNumber = async (accountNumber: string) => {
    try {
      setAccountNumber(accountNumber);
      const response = await axios.get(
        process.env.EXPO_PUBLIC_REMOTE_DEPLOYMENT_URL +
          `/api/transactions/verify-and-get-user/${accountNumber}`
      );
      const data = await response.data;

      if (!data) {
        setIsAccountNumberVerified(false);
        setReciepient(null);
        return;
      }

      setIsAccountNumberVerified(true);
      console.log({ data });
      setReciepient(data);
    } catch (error) {
      console.log({ error });
      setIsAccountNumberVerified(false);
      setReciepient(null);
    }
  };

  const checkBalanceSufficiency = async (amount: string) => {
    // Clear error state and balance sufficiency before making any API calls
    setAmount(amount);
    setErrorMessage(null);
    setIsBalanceEnough(undefined);

    // Validate amount before proceeding
    if (!amount || isNaN(Number(amount))) {
      console.log("Invalid or empty amount");
      setErrorMessage("Please enter a valid amount.");
      return; // Early return, stop further execution
    }

    try {
      console.log("Checking balance for amount:", amount);

      const response = await axios.get(
        process.env.EXPO_PUBLIC_REMOTE_DEPLOYMENT_URL +
          `/api/transactions/verify-balance/${amount}`
      );
      const data = await response.data;

      setIsBalanceEnough(data); // This can be true or false
    } catch (error) {
      console.log("Error: ", error);

      if (!isAxiosError(error)) {
        console.error("Unexpected error: ", error);
        return;
      }

      if (!error.response) {
        setErrorMessage("Network error. Please try again later.");
        return;
      }

      const { data } = error.response;
      console.log({ data });

      if (data === false) {
        setIsBalanceEnough(false);
        setErrorMessage("Insufficient Funds");
      } else {
        setErrorMessage("An error occurred while checking the balance.");
      }
    }
  };

  console.log({ isBalanceEnough, amount, isAccountNumberVerified });

  const user = useSelector((state: RootState) =>
    selectCurrentLoggedInUser(state)
  );

  return (
    <View
      style={{
        width: "90%",
        marginHorizontal: "auto",
        height: "100%",
        paddingVertical: 40,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          color: "#008080",
        }}
      >
        Transfer to other accounts
      </Text>
      <View
        style={{
          marginVertical: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
          }}
        >
          Available Balance
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 24,
            fontWeight: 900,
          }}
        >
          ₦{user.balance}
        </Text>
      </View>
      <View
        style={{
          paddingVertical: 10,
        }}
      >
        <View>
          <Label>Account Number</Label>
          <DebouncedInput
            placeholder="Account Number"
            keyboardType="phone-pad"
            accountNumber={accountNumber}
            setAccountNumber={setAccountNumber}
            handler={verifyAccountNumber}
            focusStyle={{
              borderColor: "#28a745",
              borderWidth: 2,
            }}
          />
          {isAccountNumberVerified && reciepient && (
            <View
              style={{
                paddingVertical: 5,
                paddingHorizontal: 10,
                width: "100%",
                marginVertical: 5,
                backgroundColor: "#28a74533",
                borderRadius: 5,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text
                style={{
                  color: "#28a745",
                }}
              >
                {reciepient.fullName}
              </Text>
            </View>
          )}
        </View>

        <View>
          <Label>Amount</Label>
          <DebouncedInput
            placeholder="Amount"
            keyboardType="phone-pad"
            accountNumber={amount}
            setAccountNumber={setAmount}
            handler={checkBalanceSufficiency}
            focusStyle={{
              borderColor: "#28a745",
              borderWidth: 2,
            }}
          />
          {errorMessage && (
            <View
              style={{
                paddingVertical: 5,
                paddingHorizontal: 10,
                width: "100%",
                marginVertical: 5,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text
                style={{
                  color: "red",
                }}
              >
                {errorMessage}
              </Text>
            </View>
          )}

          {isBalanceEnough !== undefined &&
            !isBalanceEnough &&
            !errorMessage && (
              <View
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  width: "100%",
                  marginVertical: 5,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  Insufficient Funds
                </Text>
              </View>
            )}
        </View>

        {/* <View>
          <Label>Description</Label>
          <Input placeholder="Description" />
        </View> */}
      </View>
      <Drawer
        disabled={
          !isAccountNumberVerified || Number(amount) < 100 || !isBalanceEnough
        }
        accountNumber={accountNumber}
        amount={Number(amount)}
        reciepient={reciepient}
      />
    </View>
  );
}
