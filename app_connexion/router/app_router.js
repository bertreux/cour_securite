import express from "express";
import { authenticate, hello, home, restricted1, restricted2, register } from "../controller/app_controller.js";

const app_router = express.Router();

app_router.get('/', home);

app_router.get('/hello', hello);

app_router.get('/restricted1', restricted1);

app_router.get('/restricted2', restricted2);

app_router.post('/authenticate', authenticate);

app_router.get('/register', register);

export default app_router;