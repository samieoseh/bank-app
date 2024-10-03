import { View, Text } from "react-native";
import React from "react";
import StyledButton from "../ui/button";

export default function ActionButton({
  pressHandler,
  canContinue,
  loading,
  message,
}: {
  pressHandler: () => void;
  canContinue: () => boolean;
  loading?: boolean;
  message?: string;
}) {
  console.log({ loading });
  return (
    <StyledButton
      buttonStyle={{
        width: "100%",
        backgroundColor: canContinue() && !loading ? "#0EBC60" : "#D3D3D3",
        borderColor: canContinue() && !loading ? "#0EBC60" : "#D3D3D3",
        position: "absolute",
        bottom: 30,
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
