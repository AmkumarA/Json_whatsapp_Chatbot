import express from "express";
import pkg from 'body-parser';
const { urlencoded } = pkg;
import routes from "./src/route/index.js";

const app = express();
app.use(express.json())
app.use(urlencoded({ extended: false }));
app.get('/', (req, res, next) => {
    res.send("app is working ")
})
routes(app)

app.listen(3000, () => {
    console.log("Chatbot running on http://localhost:3000");
});
