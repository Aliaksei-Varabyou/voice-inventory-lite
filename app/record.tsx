import { useState } from "react";
import { Pressable, Text, View } from "react-native"
import { audioService } from "@/services/audio.service";
import { transcriptionService } from "@/services/transcription.service";
import { parserService } from "@/services/parser.service";
import { recordService } from "@/services/record.service";

export default function Record() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStart = async () => {
    if (isRecording) return;
    const granted = await audioService.requestPermission();

    if (!granted) {
      alert('Microphone permission denied!');
      return;
    }
    try {
      await audioService.startRecording();
      setIsRecording(true);
    } catch (e) {
      console.log(e);
    }
  }

  const handleStop = async () => {
    try {
      setIsProcessing(true);

      const record = recordService.stopAndProcess();

      console.log('Record saved: ', record);
    } catch(e) {
      console.log(`Error: ${e}`)
    } finally {
      setIsProcessing(false);
      setIsRecording(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20 }}>
        {isRecording ? "Recording..." : 
        isProcessing ? "Processing..." :
        "Ready"}
      </Text>

      <Pressable
        onPress={isRecording ? handleStop : handleStart}
        style={{
          marginTop: 20,
          padding: 16,
          backgroundColor: isRecording ? "red" : "black",
        }}
      >
        <Text style={{ color: "white" }}>
          {isRecording ? "Stop" : "Start Recording"}
        </Text>
      </Pressable>
    </View>
  )
}
