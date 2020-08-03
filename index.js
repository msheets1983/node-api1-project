const express = require("express");
const shortid = require("shortid");
const server = express();

server.use(express.json());

let users = [
  {
    id: shortid.generate(),
    name: "Michael Sheets",
    bio: "My name is Michael Sheets, I am from Chicago.",
  },
];

server.get("/", (req, res) => {
  res.send("Hello World!");
});

// POST - Create
server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  userInfo.id = shortid.generate();
  users.push(userInfo);
  res.status(201).json(userInfo);
});

// GET - Read
server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const found = users.find((user) => user.id === id);

  try {
    if (found) {
      users = users.filter((user) => user.id !== id);
      res.status(200).json(found);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The user information could not be retrieved.", err });
  }
});

// UPDATE - Put
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  changes.id = id;

  try {
    let found = users.find((user) => user.id === id);
    if (found) {
      Object.assign(found, changes);
      res.status(200).json(found);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The user information could not be modified.", err });
  }
});

// DELETE - Delete
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const deleted = users.find((user) => user.id === id);

  try {
    if (deleted) {
      users = users.filter((user) => user.id !== id);
      res.status(200).json(deleted);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (err) {
    res.status(500).json({ message: "The user could not be removed", err });
  }
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log("listening on localhost:", PORT);
});
