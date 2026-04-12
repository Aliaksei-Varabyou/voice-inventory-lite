import { useState } from "react";
import { Pressable, Text, View } from "react-native"
import { audioService } from "@/services/audio.service";

export default function Record() {
  const [isRecording, setIsRecording] = useState(false);

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
    const uri = await audioService.stopRecording();
    console.log('Recorded file - ', uri);
    setIsRecording(false);
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20 }}>
        {isRecording ? "Recording..." : "Ready to record"}
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
