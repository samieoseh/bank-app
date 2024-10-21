import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Image, Text } from "tamagui";
import homeStyles from "@/style/home-style";
import {
  ArrowLeftRight,
  LucideBell,
  LucideChevronRight,
  LucideClock,
} from "lucide-react-native";
import { selectCurrentLoggedInUser } from "@/store/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Favorite from "@/components/home/Favorite";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();
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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}
        >
          <View
            style={{
              borderRadius: 16,
              overflow: "hidden",
              width: 32,
              height: 32,
            }}
          >
            <Image
              source={{
                uri: "https://picsum.photos/200/300",
              }}
              style={{
                width: 32,
                height: 32,
              }}
            />
          </View>
          <Text
            style={{
              color: "#111",
            }}
          >
            Hi, {user.fullName}!
          </Text>
        </View>
        <LucideBell stroke="#111" />
      </View>

      <View
        style={{
          backgroundColor: "#008080",
          //height: 80,
          width: "100%",
          marginTop: 20,
          borderRadius: 16,
          padding: 15,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
            }}
            fontSize="$2"
            fontWeight="200"
          >
            Available Balance
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            fontSize="$8"
            fontWeight="900"
            style={{
              color: "#fff",
            }}
          >
            {"₦" + user.balance}
          </Text>
          <TouchableOpacity onPress={() => console.log("Button pressed")}>
            <View
              style={{
                borderRadius: 16,
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: 4,
              }}
            >
              <ArrowLeftRight
                height={24}
                width={24}
                stroke="#008080"
                onPress={() => {
                  router.push("/transactions");
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          minHeight: 150,
          borderRadius: 16,
          padding: 15,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
          marginTop: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text fontSize="$3" fontWeight="500" style={{ color: "#111" }}>
            Recent Transactions
          </Text>
          <TouchableOpacity onPress={() => console.log("Button pressed")}>
            <Text
              fontSize="$2"
              fontWeight="200"
              style={{ color: "#008080", textDecorationLine: "underline" }}
            >
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 25,
              gap: 8,
            }}
          >
            <LucideClock height={20} width={20} stroke="#999" />
            <Text
              style={{
                color: "#999",
              }}
              fontSize="$3"
            >
              No recent transactions
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          marginTop: 10,
          display: "flex",
          gap: 5,
          padding: 15,
        }}
      >
        <Text fontSize="$3" fontWeight="500" style={{ color: "#111" }}>
          Favorites
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            flexWrap: "wrap",
          }}
        >
          {[
            { firstName: "John", lastName: "DOE" },
            { firstName: "Lionel", lastName: "MESSI" },
            { firstName: "Cristiano", lastName: "RONALDO" },
            { firstName: "Neymar", lastName: "JR" },
          ].map((data, index) => (
            <Favorite key={index} data={data} />
          ))}
        </View>
      </View>
    </View>
  );
}
