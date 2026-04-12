import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"

export default function Detail() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20 }}>
        Detail screen {id}
      </Text>
    </View>
  )
}
