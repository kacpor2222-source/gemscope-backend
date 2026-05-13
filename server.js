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
