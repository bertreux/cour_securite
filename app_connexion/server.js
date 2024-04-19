import express from "express";
import nunjucks from "nunjucks";
import http from 'node:http';
import app_router from "./router/app_router.js";
import {firewall, firewall_admin, headerMiddleware, loggerMiddleware} from "./middleware/app_middleware.js";

const app = express();
const router = express.Router();

app.use(router);
router.use(express.json());
router.use(express.static("public"));
router.use(loggerMiddleware);
router.use(headerMiddleware);
router.use(firewall);
router.use(firewall_admin);

nunjucks.configure('templates', {
    autoescape: true,
    noCache: true,
    express: app
});

router.use(app_router);

const server = http.createServer(app);

export default server;