import { View, Text } from "react-native";
import React from "react";
import StyledButton from "../ui/button";

export default function ActionButton({
  pressHandler,
  canContinue = () => true,
  loading,
  message,
}: {
  pressHandler: () => void;
  canContinue?: () => boolean;
  loading?: boolean;
  message?: string;
}) {
  return (
    <StyledButton
      buttonStyle={{
        width: "100%",
        backgroundColor: canContinue() && !loading ? "#008080" : "#D3D3D3",
        borderColor: canContinue() && !loading ? "#008080" : "#D3D3D3",
        marginVertical: 35,
        // position: "absolute",
        // bottom: 0,
      }}
      disabled={!canContinue() || loading}
      onPress={() => {
        pressHandler();
      }}
    >
      {loading ? "Please wait..." : message || "Continue"}
    </StyledButton>
  );
}
