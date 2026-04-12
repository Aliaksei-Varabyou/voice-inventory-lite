export type Record = {
  id: string,
  audioUri: string,
  rawText: string,
  parsedItems: {item: string, quantity: number}[],
  status: "pending" | "failed" | "synced",
  createdAt: number
};
