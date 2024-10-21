import { View, Text } from "react-native";
import React from "react";
import { Button, ButtonProps } from "tamagui";

interface StyledButtonProps extends ButtonProps {
  buttonStyle?: any;
  children: React.ReactNode;
}

export default function StyledButton({
  buttonStyle,
  children,
  ...props
}: StyledButtonProps) {
  return (
    <Button
      style={{
        color: "#fff",
        backgroundColor: "#008080",
        borderWidth: 1,
        borderColor: "#008080",
        height: 40,
        ...buttonStyle,
      }}
      //hoverStyle={{ backgroundColor: "#C5F5D6", borderColor: "#008080" }}
      //pressStyle={{ backgroundColor: "#C5F5D6", borderColor: "#008080" }}
      {...props}
    >
      {children}
    </Button>
  );
}
