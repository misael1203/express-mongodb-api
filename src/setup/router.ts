import { Express, Request, Response } from "express";
import { getHome, getAbout } from "../controllers/SiteController";

const setupRouter = (app: Express) => {
    app.get("/", getHome)
    .get("/about", getAbout)
}

export default setupRouter