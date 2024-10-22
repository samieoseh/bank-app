import axios from "axios";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { TextInputProps } from "react-native";
import { Input, debounce } from "tamagui";

interface DebouncedInputProps {
  accountNumber: string;
  setAccountNumber: Dispatch<SetStateAction<string>>;
  handler: (inputValue: string) => void;
  focusStyle: {
    borderColor: string;
    borderWidth: number;
  };
}

export default function DebouncedInput(
  props: JSX.IntrinsicAttributes & TextInputProps & DebouncedInputProps
) {
  const [debouncedInput, setDebouncedInput] = useState(props.value || "");

  async function handleDebounceFn(inputValue: string) {
    try {
      props.handler(inputValue);
    } catch (error) {
      console.error(error);
    }
  }

  const debounceFn = useCallback(debounce(handleDebounceFn, 100), []);

  function handleChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    if (props.onChange) {
      props.onChange(event);
    }
    setDebouncedInput(event.nativeEvent.text);
    debounceFn(event.nativeEvent.text);
  }

  useEffect(() => {
    setDebouncedInput(props.value || "");
  }, [props.value]);

  return <Input {...props} value={debouncedInput} onChange={handleChange} />;
}
