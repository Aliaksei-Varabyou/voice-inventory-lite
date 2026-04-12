import { useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "600" }}>
        Voice Inventory
      </Text>
      <Pressable
        onPress={() => router.push("/record")}
        style={{
          marginTop: 20,
          padding: 16,
          backgroundColor: "black",
        }}
      >
        <Text style={{color: 'white'}}>Start recording</Text>
      </Pressable>
    </View>
  );
}
