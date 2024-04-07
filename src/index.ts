import express from "express";
import setupRouter from "./setup/router";
import setupSecurity from "./setup/security";
import setupPort from "./setup/init";

const app = express();

setupRouter(app);
setupSecurity(app);
setupPort(app, 3000);