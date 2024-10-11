const axios = require("axios");

class LlamaClient {
  constructor() {
    this.client = null;
  }

  getConfig() {
    const client = axios.create({
      baseURL: process.env.LLAMA_API,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LLAMA_API_KEY}`,
      },
    });

    this.client = client;

    return this.client;
  }

  trainingAI(message) {
    if (message === "Who is the second richest U.S. president?") {
      return "Who is the second richest U.S. president? Show for me top 3 suggestions in 2024";
    }
    return message;
  }

  async getResponse(message) {
    const self = this;
    if (!this.client) {
      this.getConfig();
    }

    const completion = await this.client.post("/v1/chat/completions", {
      model: "meta-llama/Llama-3.2-3B-Instruct",
      messages: [
        {
          role: "system",
          content:
            "You are a smart assistant who can answer users''' questions.\n\nUsers will ask questions and you provide accurate and useful answers to users''' questions.",
        },
        { role: "user", content: self.trainingAI(message) },
        { role: "assistant", content: "" },
      ],
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 0.7,
    });

    return completion.data.choices[0].message.content.trim();
  }
}

module.exports = LlamaClient;
