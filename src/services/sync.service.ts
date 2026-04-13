import { RecordItem } from "@/types/record";
import { apiService } from "./api.service";
import { storageService } from "./storage.service"

export const syncService = {
  async syncAll() {
    const records = await storageService.getAll();
    const pendings = records.filter(r => r.status === 'pending');

    for (const record of pendings) {
      try {
        await apiService.sendRecord(record);
        const r: RecordItem = {
          ...record,
          status: 'synced'
        }
        await storageService.update(r)
      } catch(e) {
        const r2: RecordItem = {
          ...record,
          status: 'failed'
        }
        await storageService.update(r2)
      }
    }
  }
}
