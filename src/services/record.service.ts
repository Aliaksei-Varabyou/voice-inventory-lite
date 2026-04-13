import { RecordItem } from "@/types/record";
import { audioService } from "./audio.service"
import { parserService } from "./parser.service";
import { transcriptionService } from "./transcription.service";
import { storageService } from "./storage.service";

export const recordService = {
  async stopAndProcess(): Promise<RecordItem> {
    const uri = await audioService.stopRecording();
    if (!uri) {
      throw new Error('No Audio Uri');
    }

    const text = await transcriptionService.transcribe(uri);
    if (!text) {
      throw new Error('Transcription error');
    }

    const parsed = parserService.parse(text);

    const record: RecordItem = {
      id: Date.now().toString(),
      audioUri: uri,
      rawText: text,
      parsedItems: parsed,
      status: "pending",
      createdAt: Date.now()
    }

    storageService.add(record);

    return record;
  }
}
