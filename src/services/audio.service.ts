import { Audio } from "expo-av";

let recording: Audio.Recording | null = null;

export const audioService = {
  async requestPermission() {
    const permission = await Audio.requestPermissionsAsync();
    return permission.granted;
  },

  async startRecording() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const result = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );

    recording = result.recording;
  },

  async stopRecording() {
    if (!recording) return null;

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();

    recording = null;

    return uri;
  },
};
