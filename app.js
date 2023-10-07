import express from "express";
import session from "express-session";
import lodash from "lodash";
import morgan from "morgan";
import nunjucks from "nunjucks";
import ViteExpress from "vite-express";

const app = express();
const port = "8000";

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  session({ secret: "ssshhhhh", saveUninitialized: true, resave: false })
);

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

const MOST_LIKED_FOSSILS = {
  aust: {
    img: "/img/australopith.png",
    name: "Australopithecus",
    num_likes: 584,
  },
  quetz: {
    img: "/img/quetzal_torso.png",
    name: "Quetzal",
    num_likes: 587,
  },
  steg: {
    img: "/img/stego_skull.png",
    name: "Stegosaurus",
    num_likes: 598,
  },
  trex: {
    img: "/img/trex_skull.png",
    name: "Tyrannosaurus Rex",
    num_likes: 601,
  },
};

const OTHER_FOSSILS = [
  {
    img: "/img/ammonite.png",
    name: "Ammonite",
  },
  {
    img: "/img/mammoth_skull.png",
    name: "Mammoth",
  },
  {
    img: "/img/ophthalmo_skull.png",
    name: "Opthalmosaurus",
  },
  {
    img: "/img/tricera_skull.png",
    name: "Triceratops",
  },
];
app.get("/top-fossils", (req, res) => {
  console.log("Received GET request to /top-fossils");
  const userName = req.session.userName || "";
  res.render("top-fossils.html.njk", {
    fossils: MOST_LIKED_FOSSILS,
    userName,
  }); //confused on how this works
});

app.get("/", (req, res) => {
  res.render("homepage.html.njk");
});
// TODO: Replace this comment with your code

app.get("/random-fossil.json", (req, res) => {
  const randomFossil = lodash.sample(OTHER_FOSSILS);
  res.json(randomFossil);
});

app.post("/get-name", (req, res) => {
  console.log("Received POST request to /get-name");
  const { name } = req.body;

  if (name) {
    // Store the user's name in the session
    req.session.userName = name;

    // Redirect the user to the /top-fossils route
    res.redirect("/top-fossils");
  } else {
    res.send("Please enter a valid name."); //i need hlp explaining what this does
  }
});

ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}...`);
});
