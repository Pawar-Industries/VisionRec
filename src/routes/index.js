const apiRoutes = require("./api");
const visionRoutes = require("./vision");
const userRoutes = require("./users");

const constructorMethod = (app) => {
    app.use("/api", apiRoutes)
    app.use("/vision", visionRoutes);
    app.use("/users", userRoutes);
  
    app.use("*", (req, res) => {
      res.sendStatus(404);
    });
  };
  
  module.exports = constructorMethod;