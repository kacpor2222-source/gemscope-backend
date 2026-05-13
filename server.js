import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

let cache = null;
let lastFetch = 0;

app.get("/", async (req, res) => {
  try {
    const now = Date.now();

    if (cache && now - lastFetch < 60000) {
      return res.json(cache);
    }

    const response = await fetch("https://db.biggames.io/prices");
    const data = await response.json();

    cache = data;
    lastFetch = now;

    res.json(data);
  } catch (e) {
    res.json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("RUNNING"));
