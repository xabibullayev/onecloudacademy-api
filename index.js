import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://0.0.0.0/onecloud")
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/api/sendToTelegram", async (req, res) => {
  const { name, phone, age, gender, course, time } = req.body;
  console.log(req.body);

  const botToken = "7008625758:AAGgTDnooeBDGW-xnfbfEThxyv3syb2fvhM"; // Replace with your Telegram bot token
  const chatId = "-1002472085554"; // Replace with the channel's chat ID
  const text = `<b>Name:</b> ${name}\n<b>Phone</b>: ${phone}\n<b>Age:</b> ${age}\n<b>Gender:</b> ${gender}\n<b>Course:</b> ${course}\n<b>Time:</b> ${time}`;

  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const response = await fetch(telegramApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: "HTML",
    }),
  });

  if (response.ok) {
    res.status(200).json({ message: "Message sent to Telegram" });
  } else {
    res.status(500).json({ error: "Failed to send message" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000...");
});
