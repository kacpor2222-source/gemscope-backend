import express from "express";
import cors from "cors";
import axios from "axios";

const app = express(); // 🔥 TO BRAKOWAŁO
app.use(cors());

app.get("/", (req, res) => {
  res.send("GemScope backend działa 🚀");
});

app.get("/prices", async (req, res) => {
  try {
    const response = await axios.get("https://db.biggames.io/", {
      headers: {
        "User-Agent": "Mozilla/5.0"
      },
      timeout: 10000
    });

    res.json({
      success: true,
      raw: response.data
    });

  } catch (err) {
    res.json({
      success: false,
      error: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server działa na porcie", PORT);
});
