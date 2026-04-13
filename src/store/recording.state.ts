type Listener = (isRecording: boolean) => boolean;

let isRecording = false;
let listeners: Listener[] = [];

export const recordingState = {
  get: () => isRecording,

  set(value: boolean) {
    isRecording = value;
    listeners.forEach(l => l(value));
  },

  subscribe(listener: Listener) {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  }
}
