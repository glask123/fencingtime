const express = require("express");
const app = express();
const dayjs = require("dayjs");
const axios = require("axios");
dayjs().format();
const fencerRoute = require("./routes/fencer/fencer");

const port = process.env.PORT || 5000;

app.use("/fencer", fencerRoute);

app.get("/tournaments", async (req, res) => {
  try {
    let start = dayjs().subtract(1, "week").format("YYYY-MM-DD");
    let end = dayjs().add(1, "week").format("YYYY-MM-DD");
    const { data } = await axios.get(
      `https://www.fencingtimelive.com/tournaments/list/data?from=${start}&to=${end}`
    );
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
