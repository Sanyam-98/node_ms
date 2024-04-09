const express = require("express");
const cors = require("cors");
const axios = require('axios');
const app = express();
// Use the CORS middleware
app.use(cors());
require('dotenv').config({ path: process.env.ENVCONFIG || '.env' });

const {
  APP_PORT,
  MS_GATEWAY,
} = process.env;

app.get("/api/v1/ms2/", (req, res) => {
    return res.status(200).json({m:"Hello-2"});
});

app.get("/api/v1/ms2/hello-1", async (req, res) => {
  try {
      let obj = await axios({
        method: 'get',
        url: `${MS_GATEWAY}/api/v1/ms1`,
      });
      console.log(obj?.data, 24)
      return res.status(200).json({...obj?.data, n:'ms2/hello-1'});
  } catch (e) {
    console.log(`Error fetching res`, e);
    return res.status(500).json({message: "error fetching hello-1", data: e.response});
  }
});

app.get("/api/v1/ms2/hello-3", async (req, res) => {
  try {
      let obj = await axios({
        method: 'get',
        url: `${MS_GATEWAY}/api/v1/ms3`,
      });
      console.log(obj?.data, 38)
      return res.status(200).json({...obj?.data, n:'ms2/hello-3'});
  } catch (e) {
    console.log(`Error fetching res`, e);
    return res.status(500).json({message: "error fetching hello-3", data: e.response});
  }
});

app.listen(APP_PORT, () => {
  console.log(`app listening at http://localhost:${APP_PORT}`);
});
