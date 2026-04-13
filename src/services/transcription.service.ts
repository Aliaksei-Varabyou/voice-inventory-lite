export const transcriptionService = {
  async transcribe(audioUri: string): Promise<string> {
    // imitation of transcription
    await new Promise(resolve => setTimeout(resolve, 1000));

    // return mock result
    return 'bottles 5, cans 8';
  }
}
