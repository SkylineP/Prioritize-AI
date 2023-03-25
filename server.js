//start server:  node server.js
const fs = require("fs");
const express = require("express");
const multer = require("multer");
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: "org-876MRt2xbQukXu73Dl37MPTq",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    console.log(messages);

    const chatGPT = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    const chatGPTMessage = chatGPT.data.choices[0].message.content;

    console.log(chatGPT.data.choices[0]);
    console.log(chatGPTMessage);

    res.json({
      message: chatGPTMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// set up the multer middleware to handle file uploads
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());

app.post("/audio", upload.single("file"), async (req, res) => {
  console.log("INSIDE INSIDE INSIDE INSIDE");
  try {
    const file = req.file;

    if (!file) {
      throw new Error("File not provided");
    }

    const whisperGPT = await openai.createTranscription(
      file.buffer,
      "whisper-1"
    );

    const whisperGPTMessage = whisperGPT.data.text;

    console.log(whisperGPT.data);
    console.log(whisperGPTMessage);

    res.json({
      text: whisperGPTMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
