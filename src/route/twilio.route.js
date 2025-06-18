import express from "express";
import sendQuerry from "../controller/twilio.controller.js";
const route = express.Router();

route.post("/whatsapp", sendQuerry);
export { route as sendMessage }