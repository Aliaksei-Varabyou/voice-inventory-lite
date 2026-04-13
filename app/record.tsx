import { useState } from "react";
import { Pressable, Text, View } from "react-native"
import { audioService } from "@/services/audio.service";
import { transcriptionService } from "@/services/transcription.service";
import { parserService } from "@/services/parser.service";

export default function Record() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const stopAllProcesses = () => {
    setIsProcessing(false);
    setIsRecording(false);
  }

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
    setIsProcessing(true);

    const uri = await audioService.stopRecording();
    if (!uri) return;

    const text = await transcriptionService.transcribe(uri);
    if (!text || typeof text !== "string") {
      console.warn("Invalid transcription result");
      stopAllProcesses();
      return;
    }
    const parsed = parserService.parse(text);

    console.log('Recorded file - ', uri);
    console.log('Transcribed text - ', text);
    console.log('Parsed items - ', parsed);

    stopAllProcesses();
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
