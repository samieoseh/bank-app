import { View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectLastTransaction } from "@/store/transactionSlice";
import { TransactionStateProps } from "@/typings/transaction-typings";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styles from "../auth/styles";
import { Text } from "tamagui";
import { LucideCheckCircle2 } from "lucide-react-native";
import ActionButton from "@/components/registration-steps/action-button";
import { useRouter } from "expo-router";

export default function Receipt() {
  const router = useRouter();
  const lastTransaction = useSelector(
    (state: { transactions: TransactionStateProps }) =>
      selectLastTransaction(state)
  );

  const { data } = useQuery({
    queryKey: ["lastTransaction"],
    queryFn: async () => {
      const response = await axios.get(
        `/api/transactions/receipts/${lastTransaction.transactionId}/${lastTransaction.userId}`
      );
      const data = await response.data;
      return data;
    },
    enabled: !!lastTransaction?.transactionId && !!lastTransaction?.userId,
  });

  console.log({ data });

  return (
    <View>
      {data && (
        <View style={{ ...styles.containerBox, marginTop: 48 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 200,
              textAlign: "center",
            }}
          >
            Transaction Successful
          </Text>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <LucideCheckCircle2 height={96} width={96} stroke="green" />
          </View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 900,
              marginVertical: 10,
              textAlign: "center",
              color: "green",
            }}
          >
            ₦{data.amount}
          </Text>
          <View>
            <Text
              style={{
                textAlign: "center",
                marginTop: 40,
                color: "#A5A5A5",
                fontSize: 12,
                fontWeight: 400,
              }}
            >
              Your transaction details are shown below
            </Text>
            <View
              style={{
                marginVertical: 20,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fafafa",
                  padding: 15,
                  borderRadius: 8,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fafafa",
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 400,
                      color: "#A5A5A5",
                    }}
                  >
                    Transaction ID
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      color: "#5C5C5C",
                    }}
                  >
                    {data?.id}
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fafafa",
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 400,
                      color: "#A5A5A5",
                    }}
                  >
                    Receiver
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      color: "#5C5C5C",
                    }}
                  >
                    {data?.transaction.reciever.fullName}
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fafafa",
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 400,
                      color: "#A5A5A5",
                    }}
                  >
                    New Balance
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      color: "#5C5C5C",
                    }}
                  >
                    {data?.newBalance}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <ActionButton
            message="Confirm"
            pressHandler={() => {
              router.push("/");
            }}
          />
        </View>
      )}
    </View>
  );
}
