import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

let cache = null;
let lastFetch = 0;

async function getData() {
  const now = Date.now();

  // cache na 10 minut (ważne żeby nie było 429)
  if (cache && now - lastFetch < 10 * 60 * 1000) {
    return cache;
  }

  const res = await axios.get("https://db.biggames.io/config/Pets");
  cache = res.data;
  lastFetch = now;

  return cache;
}

app.get("/pets", async (req, res) => {
  try {
    const data = await getData();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "API error", details: e.message });
  }
});

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
