import express from "express";
import axios from "axios";

const app = express();

let cache = null;
let lastTime = 0;

const CACHE_TIME = 60 * 1000; // 60 sekund

app.get("/prices", async (req, res) => {
  const now = Date.now();

  if (cache && now - lastTime < CACHE_TIME) {
    return res.json(cache);
  }

  try {
    const r = await axios.get("https://db.biggames.io/api");

    cache = r.data;
    lastTime = now;

    res.json(cache);
  } catch (e) {
    res.json({ error: "API error", msg: e.message });
  }
});

app.listen(3000, () => {
  console.log("OK");
});
