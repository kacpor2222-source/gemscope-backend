import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

// test endpoint
app.get("/", (req, res) => {
  res.send("GemScope backend działa 🚀");
});

// API proxy
app.get("/prices", async (req, res) => {
  try {
    const response = await axios.get("https://db.biggames.io/");

    res.json({
      success: true,
      data: response.data
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
