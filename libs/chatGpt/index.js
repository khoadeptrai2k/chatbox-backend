const OpenAI = require("openai");

class ChatGptClient {
  constructor() {
    this.client = null;
  }

  getConfig() {
    const client = new OpenAI({
      apiKey: process.env["OPENAI_API_KEY"],
      project: process.env["OPENAI_PROJECTID"],
      organization: process.env["OPENAI_ORGANIZATION"],
    });

    this.client = client;
    return this.client;
  }

  async getResponse(message) {
    if (!this.client) {
      this.getConfig();
    }
    const completion = await this.client.chat.completions.create({
      messages: [{ role: "user", content: "Say this is a test" }],
      model: "gpt-3.5-turbo",
      max_tokens: 100,
      // another params
    });
    console.log(completion);
    return completion.data.choices[0].message.trim();
  }
}

module.exports = ChatGptClient;
