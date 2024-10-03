import { View, Text } from "react-native";
import React, { useRef } from "react";
import { Input } from "tamagui";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";

export default function TokenInput({
  token,
  setToken,
}: {
  token: string;
  setToken: Function;
}) {
  const dispatch: AppDispatch = useDispatch();

  const inputRefs = useRef<Array<any>>([]);

  const handleInputChange = (text: string, index: number) => {
    const newToken = token.split("");
    newToken[index] = text;
    dispatch(setToken({ token: newToken.join("") }));

    // Move to next input if the current one is filled
    if (text && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Move focus to the previous input if deleted and not the first input
    if (!text && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 5,
      }}
    >
      {[...Array(6)].map((_, index) => (
        <Input
          key={index}
          maxLength={1}
          ref={(el) => (inputRefs.current[index] = el)}
          keyboardType="phone-pad"
          value={token[index] || ""}
          onChangeText={(text) => handleInputChange(text, index)}
          style={{
            textAlign: "center",
            borderWidth: 1,
            borderRadius: 5,
          }}
        />
      ))}
    </View>
  );
}
