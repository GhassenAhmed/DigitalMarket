import express from "express";

const router=express.Router();
// passer le router comme parametres
require("./CommandeRoutes")(router);
require("./UserRoutes")(router);
require("./ReviewRoutes")(router);
require("./StatsRoute")(router);
export default router;