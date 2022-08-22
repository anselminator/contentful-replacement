const contentful = require("contentful");
const { config } = require("dotenv");
const fs = require("fs");
const express = require("express");

const app = express();
config();

const PORT = process.env.PORT || 5000;
console.log("API:", process.env.CONTENTFUL_API);
console.log("SPACE:", process.env.CONTENTFUL_SPACE);
const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_API,
});

app.route("/").get(async(req, res) => {
    const content = await client.getEntries().then((entries) => {
        console.log("inside contenfuls client call:", entries);
        return entries;
    });
    console.log("after async await:", content);
    fs.writeFile("./contentful.json", JSON.stringify(content), (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
    });
    res.json(content);
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));