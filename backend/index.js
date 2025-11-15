const express = require("express");
const app = express();
const port = process.env.PORT || 9000;

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
  console.log(`server is running on http://192.168.0.3:${port}`);
});
