export type RecordItem = {
  id: string;
  audioUri?: string;
  rawText?: string;
  parsedItems?: { item: string; quantity: number }[];
  status: "pending" | "synced" | "failed";
  createdAt: number;
};
