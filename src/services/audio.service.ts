import { recordingState } from "@/store/recording.state";
import { Audio } from "expo-av";

let recording: Audio.Recording | null = null;
let isReady = false;

export const audioService = {
  async requestPermission() {
    const permission = await Audio.requestPermissionsAsync();
    return permission.granted;
  },

  async startRecording() {
    isReady = false;

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const result = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );

    recording = result.recording;
    recordingState.set(true);
    isReady = true;
  },

  async stopRecording() {
    if (!recording || !isReady) {
      console.warn("Recording not ready yet");
      return null;
    }

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    recordingState.set(false);

    recording = null;

    return uri;
  },
};
