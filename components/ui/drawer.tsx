import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Sheet } from "@tamagui/sheet";

import { Button, Text } from "tamagui";
import TokenInput from "./token-input";
import axios, { isAxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentLoggedInUser } from "@/store/authSlice";
import { RootState } from "@/store";
import { useRouter } from "expo-router";
import { TransactionReciepientProps } from "@/typings/transaction-typings";
import { setLastTransaction } from "@/store/transactionSlice";

const spModes = ["percent", "constant", "fit", "mixed"] as const;

export default function Drawer({
  disabled,
  amount,
  reciepient,
  accountNumber,
}: {
  disabled: boolean;
  amount: number;
  reciepient: TransactionReciepientProps | null;
  accountNumber: string;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) =>
    selectCurrentLoggedInUser(state)
  );

  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [position, setPosition] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [modal, setModal] = React.useState(true);
  const [snapPointsMode, setSnapPointsMode] =
    React.useState<(typeof spModes)[number]>("constant");
  const [transactionPin, setTransactionPin] = React.useState("0220");
  const snapPoints = [400, 190];

  const handleTransfer = async () => {
    console.log("Transfering money");
    try {
      const response = await axios.post("/api/transactions", {
        sender: user.id,
        reciever: reciepient?.id,
        amount,
        description: "test",
        transactionType: "TRANSFER",
        transactionPin,
      });
      const transactionData = await response.data;
      console.log({ transactionData });
      dispatch(
        setLastTransaction({
          transactionId: transactionData.id,
          userId: user.id,
        })
      );
      setOpen(false);
      router.push("/receipts");
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

      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <View>
      <>
        <View>
          <Button
            style={{
              backgroundColor: disabled ? "#d3d3d3" : "#008080",
              color: "#fff",
              marginTop: 20,
            }}
            disabled={disabled}
            onPress={() => setOpen(true)}
          >
            Next
          </Button>
        </View>

        <Sheet
          forceRemoveScrollEnabled={open}
          modal={modal}
          open={open}
          onOpenChange={setOpen}
          snapPoints={snapPoints}
          snapPointsMode={snapPointsMode}
          dismissOnSnapToBottom
          position={position}
          onPositionChange={setPosition}
          zIndex={100_000}
          animation="medium"
        >
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />

          <Sheet.Handle />
          <Sheet.Frame justifyContent="center" alignItems="center">
            <Text
              style={{
                fontSize: 24,
                fontWeight: 900,
                color: "#008080",
              }}
            >
              ₦{amount}
            </Text>
            <View
              style={{
                gap: 10,
                paddingVertical: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                <Text>Account Number</Text>
                <Text
                  style={{
                    fontWeight: 700,
                  }}
                >
                  {accountNumber}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                <Text>Reciepient</Text>
                <Text
                  style={{
                    fontWeight: 700,
                  }}
                >
                  {reciepient?.fullName}
                </Text>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                <Text>Amount</Text>
                <Text
                  style={{
                    fontWeight: 700,
                  }}
                >
                  ₦{amount}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                <Text>Transaction Fee</Text>
                <Text
                  style={{
                    fontWeight: 700,
                  }}
                >
                  ₦0
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                <Text>Total</Text>
                <Text
                  style={{
                    fontWeight: 700,
                  }}
                >
                  ₦{amount}
                </Text>
              </View>
            </View>

            <View
              style={{
                gap: 10,
                paddingVertical: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                }}
              >
                Enter your transaction pin
              </Text>
              <TokenInput
                valueLabel="transactionPin"
                value={transactionPin}
                setValue={(text: string) => setTransactionPin(text)}
                length={4}
              />
            </View>
            <Button
              style={{
                backgroundColor:
                  transactionPin.length < 4 ? "#d3d3d3" : "#008080",
                color: "#fff",
                marginTop: 20,
                width: "80%",
              }}
              onPress={async () => {
                await handleTransfer();
              }}
              disabled={transactionPin.length < 4}
            >
              Send money
            </Button>
          </Sheet.Frame>
        </Sheet>
      </>
    </View>
  );
}
