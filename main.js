require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3000;
const db = require("./database/client.js");
const fs = require("fs");
const fakeDB = require("./contentful.json");
const axios = require("axios");
const cors = require("cors");

let app = express();

console.log(__dirname);

const PUToptions = {
    root: __dirname,
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.route("/showGet").get((req, res) => {
    console.log("query:", req.query);
    //console.log("body:", req.body);
    res.send(
        `<h4>Your query was this: ${req.query.firstName} ${req.query.lastName}</h4>`
        //        `<h4>Your query was this: ${req.body.firstName} ${req.body.lastName}</h4>`
    );
});

app.route("/number/:id").get((req, res) => {
    console.log(req.params);
    const n = req.params.id;
    console.log("param id is ", n);
    res.send("And the number is:" + n);
});
// 10) & 11)
app.route("/postlist").get(async(req, res) => {
    let axRes = await axios
        .get("http://jsonplaceholder.typicode.com/posts/1")
        .then((response) => {
            console.log("inside axios: ", response.data);
            res.json(resp.data);
            fs.writeFile("./posts.json", JSON.stringify(data), (err) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
            });

            return response.data;
        });

    console.log("axios responded this here:");
    console.log(axRes);
});

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.get("/insertCategories", async(req, res) => {
    console.log("Trying to insert all categories  into Elephant...");
    fakeDB.items.fields.categories.map((e, i) =>
        console.log("wow we have cat: ", e)
    );
    const { rows } = await db.query("SELECT * FROM categories;", []);
    console.log("Elephant SQL responded with:", rows);
    res.send(rows);
});

app.get("/allCategories", async(req, res) => {
    console.log("Trying to fetch all table _categories_...");
    const { rows } = await db.query("SELECT * FROM categories;", []);
    console.log("Elephant SQL responded with:", rows);
    res.send(rows);
});
app.get("/allCategories/:id", async(req, res) => {
    const { id } = req.params;
    console.log(`Trying to fetch single ${id} table _categories_...`);
    const { rows } = await db.query("SELECT * FROM categories WHERE id=$1;", [
        id,
    ]);
    console.log("Elephant SQL responded with:", rows);
    res.send(rows);
});

app.get("/byAuthor/:aut", async(req, res) => {
    try {
        const { rows } = await db.query(`SELECT * from artices where aut=${aut};`);
        return res.status(200).send(rows);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Something went wrong");
    }
});

app.get("/allPosts", async(req, res) => {
    try {
        const resp = fakeDB;
        if (false) {
            return res.status(404).send(`The user with id ${id} does not exist`);
        }
        console.log("allPosts from fake = ", resp);
        return res.status(200).send(resp);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Something went wrong");
    }
});
app.get("/allPosts/:id", async(req, res) => {
    const { id } = req.params;
    try {
        const { rows, rowCount } = await db.query(
            "SELECT * from users where id=$1", [id]
        );
        if (!rowCount)
            return res.status(404).send(`The user with id ${id} does not exist`);
        return res.status(200).send(rows);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Something went wrong");
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

/*
var express = require("express");
const pets = require("./helper.js");

var app = express();
//create a server object:
const PORT = process.env.PORT || 8080;

app.route("/").get((req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Document</title>
    </head>
    <body>
  <h1>Adopt a Pet!</h1>
  <p>Browse through the links below to find your new furry friend:</p>
  <ul>
  <li><a href="/animals/dogs/">Dogs</a></li>
  <li><a href="/animals/cats/">Cats</a></li>
  <li><a href="/animals/rabbits/">Rabbits</a></li>
  </ul>
  </body>`);
});

app.route("/animals/").get((req, res) => {
    let animalList = "<h3>These are the available animals:</h3><ul>";
    for (let pet in pets) {
        console.log(pet);
        animalList += ` <li> <a href = "/animals/${pet}" > ${pet} </a> </li> `;
    }
    animalList += "</ul>";
    console.log(animalList);
    res.send(animalList);
});

app.route("/animals/:type").get((req, res) => {
    const petType = req.params.type;
    let animalList = "";
    console.log(petType);
    animalList += "<ul>";
    console.log(pets[petType]);
    for (const [index, animal] of pets[petType].entries()) {
        console.log(animal.name, "has index:", index);

        animalList += ` < li > < a href = "/animals/${petType}/${index}" < /a>${animal.name}</li > `;
        console.log(animal.name);
        console.log("has index:", index);
    }
    animalList += "</ul>";
    res.send(
        ` < h1 > Adopt a $ { petType.slice(0, -1) }! < /h1><br>` + animalList
    );
});

app.get("/animals/:type/:index", (req, res) => {
    const t = req.params.type;
    const i = req.params.index;
    const pet = pets[t][i];
    console.log(pet);

    var html = `<h1>${pet.name}'s page! </h1>`;
    html += `<img src=${pet.url} alt=${pet.name}/>`;
    html += `<p>${pet.description}</p>`;
    html += `<ul>`;
    html += `<li>${pet.breed}</li>`;
    html += `<li>${pet.age}</li>`;
    html += `</ul>`;

    console.log("individual page for", pet.name, "which is of type", t);
    res.send(html);
});

app.listen(PORT, () => console.log("Pet store server listening on port", PORT));

console.log("this is my list of pets from the other file:");
console.log(pets);
// can you save it? If I save it, then it cretaes a branch
*/