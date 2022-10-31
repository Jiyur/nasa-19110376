  const express = require("express");
  const app = express();
  const planetsRouter = require("./routers/planets/planets.router");
  const launchesRouter=require("./routers/launches/launches.router");
  const cors = require("cors");
  const path = require("path");
  const morgan=require("morgan");
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
  app.use(morgan('combined'))
  app.use(express.json());
    app.use(express.static(path.join(__dirname, "..","..","client","build")));

  app.use("/launches",launchesRouter);
  app.use(planetsRouter);

  app.get("/*", (req, res) => {
      res.sendFile(path.join(__dirname, "..","..","client","build","index.html"));
  })



  module.exports = app;
