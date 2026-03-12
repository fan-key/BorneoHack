class RequestQueue {
  constructor(delayMs = 1500) {
    this.queue = [];
    this.isProcessing = false;
    this.delayMs = delayMs;
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.process();
    });
  }

  async process() {
    if (this.isProcessing) return;

    this.isProcessing = true;

    while (this.queue.length > 0) {
      const { task, resolve, reject } = this.queue.shift();

      try {
        const result = await task();
        resolve(result);
      } catch (error) {
        reject(error);
      }

      if (this.queue.length > 0) {
        console.log(`Queue: ${this.queue.length} request(s) waiting...`);
        await new Promise((r) => setTimeout(r, this.delayMs));
      }
    }

    this.isProcessing = false;
  }

  get size() {
    return this.queue.length;
  }
}

const geminiQueue = new RequestQueue(1500);

module.exports = { geminiQueue };