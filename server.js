let cache = null;
let lastFetch = 0;

app.get("/prices", async (req, res) => {
  const now = Date.now();

  // 🔥 cache 2 minuty
  if (cache && now - lastFetch < 120000) {
    return res.json({
      success: true,
      source: "cache",
      data: cache
    });
  }

  try {
    const response = await axios.get("https://db.biggames.io/", {
      headers: {
        "User-Agent": "Mozilla/5.0"
      },
      timeout: 10000
    });

    cache = response.data;
    lastFetch = Date.now();

    res.json({
      success: true,
      source: "live",
      data: cache
    });

  } catch (err) {
    res.json({
      success: false,
      error: err.message,
      note: "Big Games rate limit (429)"
    });
  }
});
