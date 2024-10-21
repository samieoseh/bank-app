import { View } from "react-native";
import React from "react";
import { Sheet } from "@tamagui/sheet";

import { Button, Input, Text, XStack, YStack } from "tamagui";
import TokenInput from "./token-input";

const spModes = ["percent", "constant", "fit", "mixed"] as const;

export default function Drawer({ disabled }: { disabled: boolean }) {
  const [position, setPosition] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [modal, setModal] = React.useState(true);
  const [snapPointsMode, setSnapPointsMode] =
    React.useState<(typeof spModes)[number]>("constant");
  const [transactionPin, setTransactionPin] = React.useState("");
  const snapPoints = [400, 190];

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
              ₦200
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
                  1234567890
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
                  ₦200
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
                  ₦200
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
                backgroundColor: "#008080",
                color: "#fff",
                marginTop: 20,
                width: "80%",
              }}
              disabled={disabled}
            >
              Send money
            </Button>
          </Sheet.Frame>
        </Sheet>
      </>
    </View>
  );
}
