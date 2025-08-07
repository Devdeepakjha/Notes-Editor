const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server running on port ${port}`);
});

//My Temporary DataBase...
let Notes = [
  {
    id: uuidv4(),
    title: "Deepak_Jha",
    content: "I Love Coding!",
  },
  {
    id: uuidv4(),
    title: "Shubham_Jha",
    content: "Hard Work is very important to achieve succes :)",
  },
  {
    id: uuidv4(),
    title: "Roopam_Jha",
    content: "Only X that i want is Xtra money :)",
  },
];

//PERFORMING CRUD OPERATIONS ON OUR NOTES APP

//? #1)Homepage -> to see all notes, also perform edit and delete operations
app.get("/Notes", (req, res) => {
  res.render("index.ejs", { Notes });
});

//? #2)Adding form link to add new posts
//serving the form and taking data from user
app.get("/Notes/new", (req, res) => {
  res.render("newnote.ejs");
});
//now updating it on main page
app.post("/Notes", (req, res) => {
  let { title, content } = req.body;
  let id = uuidv4();
  Notes.push({ id, title, content });
  res.redirect("/Notes");
});

//? #3)Seeing Note in detail
app.get("/Notes/:id", (req, res) => {
  let { id } = req.params;
  let note = Notes.find((n) => n.id == id);
  res.render("shownote.ejs", { note });
});

//? #4)Editing/Updating any specific Note
//serving the form
app.get("/Notes/:id/edit", (req, res) => {
  let { id } = req.params;
  let note = Notes.find((n) => id == n.id); // Find the post in array
  res.render("edit.ejs", { note });
});
//updating the contents
app.patch("/Notes/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content; // Get new content from the form
  let Note = Notes.find((n) => id == n.id);
  Note.content = newContent; // Update the content
  res.redirect("/Notes");
});

//? #5)Deleting an note
app.delete("/Notes/:id", (req, res) => {
  let { id } = req.params;
  Notes = Notes.filter((n) => n.id !== id);
  res.redirect("/Notes");
});
