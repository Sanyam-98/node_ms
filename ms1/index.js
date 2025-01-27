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

app.get("/api/v1/ms1/", (req, res) => {
    return res.status(200).json({m:"Hello-1"});
});

app.get("/api/v1/ms1/hello-2", async (req, res) => {
  try {
      let obj = await axios({
        method: 'get',
        url: `${MS_GATEWAY}/api/v1/ms2`,
      });
      console.log(obj?.data, 24)
      return res.status(200).json({...obj?.data, n:'ms1/hello-2'});
  } catch (e) {
    console.log(`Error fetching res`, e);
    return res.status(500).json({message: "error fetching hello-2", data: e.response});
  }
});

app.get("/api/v1/ms1/hello-3", async (req, res) => {
  try {
      let obj = await axios({
        method: 'get',
        url: `${MS_GATEWAY}/api/v1/ms3`,
      });
      console.log(obj?.data, 38)
      return res.status(200).json({...obj?.data, n:'ms1/hello-3'});
  } catch (e) {
    console.log(`Error fetching res`, e);
    return res.status(500).json({message: "error fetching hello-3", data: e.response});
  }
});


app.get("/api/v1/ms1/hello-2-3", async (req, res) => {
  try {
      let obj = await axios({
        method: 'get',
        url: `${MS_GATEWAY}/api/v1/ms2`,
      });
      console.log(obj?.data, 53);
      let obj2 = await axios({
        method: 'get',
        url: `${MS_GATEWAY}/api/v1/ms3`,
      });
      console.log(obj2?.data, 58);
      return res.status(200).json({...obj?.data, m2: obj2?.data?.m, n:'ms1/hello-2-3'});
  } catch (e) {
    console.log(`Error fetching res`, e);
    return res.status(500).json({message: "error fetching hello-2-3", data: e.response});
  }
});


app.listen(APP_PORT, () => {
  console.log(`App listening at http://localhost:${APP_PORT}`);
});
