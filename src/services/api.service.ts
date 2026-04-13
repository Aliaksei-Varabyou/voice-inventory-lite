export const apiService = {
  async sendRecord(record: any) {
    // imitation api request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // random response
    const success = Math.random() > 0.3;

    if (!success) {
      throw new Error('Network error');
    }

    return {ok: true};
  }
}