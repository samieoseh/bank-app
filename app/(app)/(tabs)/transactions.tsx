import { View } from "react-native";
import { useState } from "react";
import { Button, Input, Label, Text } from "tamagui";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { selectCurrentLoggedInUser } from "@/store/authSlice";
import Drawer from "@/components/ui/drawer";
import axios from "axios";

export default function Transaction() {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isAccountNumberVerified, setIsAccountNumberVerified] = useState(false);

  const verifyAccountNumber = async () => {
    const response = await axios.get(`/verify-and-get-user/${accountNumber}`);
    setIsAccountNumberVerified(true);
  };

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
          paddingVertical: 20,
        }}
      >
        <View>
          <Label>Account Number</Label>
          <Input
            placeholder="Account Number"
            value={accountNumber}
            keyboardType="phone-pad"
            onChangeText={(text) => {
              setAccountNumber(text);
            }}
          />
        </View>

        <View>
          <Label>Amount</Label>
          <Input
            placeholder="Amount e.g ₦100"
            value={amount}
            onChangeText={(text) => {
              setAmount(text);
            }}
            keyboardType="phone-pad"
          />
        </View>

        <View>
          <Label>Description</Label>
          <Input placeholder="Description" />
        </View>
      </View>
      <Drawer disabled={!isAccountNumberVerified && Number(amount) < 100} />
    </View>
  );
}
