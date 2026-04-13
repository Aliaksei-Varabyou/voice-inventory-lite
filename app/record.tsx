import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native"
import { audioService } from "@/services/audio.service";
import { recordService } from "@/services/record.service";
import { syncService } from "@/services/sync.service";
import { useRouter } from "expo-router";
import { recordingState } from "@/store/recording.state";

export default function Record() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(recordingState.get());
  const [isProcessing, setIsProcessing] = useState(false);
  const [isStopping, setIsStopping] = useState(false);

  useEffect(() => {
    const unsubscribe = recordingState.subscribe((value) => {
      setIsRecording(value);
    })

    return unsubscribe;
  }, []);

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
    if (isStopping) return;

    setIsStopping(true);
    try {
      setIsProcessing(true);

      await recordService.stopAndProcess();
      await syncService.syncAll();

    } catch(e) {
      console.log(`Error: ${e}`)
    } finally {
      setIsProcessing(false);
      setIsRecording(false);
      setIsStopping(false);
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
