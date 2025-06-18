const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const Fuse = require("fuse.js");
const { MessagingResponse } = require("twilio").twiml;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const faqs = JSON.parse(fs.readFileSync("faqs.json", "utf-8"));

// Fuse.js options
const fuse = new Fuse(faqs, {
    keys: ["question"],
    threshold: 0.4 // Lower = stricter match, try 0.3 to 0.5
});

app.post("/whatsapp", (req, res) => {
    const twiml = new MessagingResponse();
    const msg = req.body.Body.toLowerCase();

    const result = fuse.search(msg);
    if (result.length > 0) {
        const bestMatch = result[0].item;
        twiml.message(bestMatch.answer);
    } else if (msg.includes("hello") || msg.includes("hi")) {
        twiml.message("Hello! Welcome to UPSIDA chatbot. How can I help you today?");
    } else if (msg.includes("help")) {
        twiml.message("You can ask about UPSIDA services, industrial plots, application process, etc.");
    } else {
        twiml.message("Sorry, I didn’t understand that. Type 'help' to get started.");
    }

    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
});

app.listen(3000, () => {
    console.log("Chatbot running on http://localhost:3000");
});
