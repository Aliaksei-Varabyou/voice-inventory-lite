import AsyncStorage from "@react-native-async-storage/async-storage";
import { RecordItem } from "@/types/record";

const STORAGE_KEY = 'records';

export const storageService = {
  async getAll(): Promise<RecordItem[]> {
    const data =  await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  async saveAll(records: RecordItem[]) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  },

  async add(record: RecordItem) {
    const records: RecordItem[] = await this.getAll();
    records.push(record);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }
};
