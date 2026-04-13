import { storageService } from "@/services/storage.service";
import { RecordItem } from "@/types/record";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";

export default function Home() {
  const router = useRouter();
  const [records, setRecords] = useState<RecordItem[]>([]);

  const loadRecords = async () => {
    const data: RecordItem[] = await storageService.getAll();
    setRecords(data);
  }

  useFocusEffect(
    useCallback(() => {
      loadRecords()
    }, [])
  );

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

      <FlatList
        data={records}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <Pressable
            onPress={() => router.push(`/detail/${item.id}`)}
            style={{
              padding: 12,
              borderBottomWidth: 1,
            }}
          >
            <Text>{item.rawText}</Text>
            <Text>Status: {item.status}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
