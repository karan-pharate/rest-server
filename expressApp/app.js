const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
app.use(bodyParser.json());
let posts = [
  { id: "1", title: "post 1", description: "some description" },
  { id: "2", title: "post 2", description: "some description" },
  { id: "3", title: "post 3", description: "some description" }
];
let comments = [
  {
    postId: "1",
    commentData: "some comment",
    timestamp: 1519211809934
  },
  {
    postId: "2",
    commentData: "some comment",
    timestamp: 1519211810362
  },
  {
    postId: "1",
    commentData: "some comment",
    timestamp: 15192118132456
  },
  {
    postId: "2",
    commentData: "some comment",
    timestamp: 1519211816434
  },
  {
    postId: "3",
    commentData: "some comment",
    timestamp: 1519211811670
  }
];
app.get("/api/post", (req, res) => {
  res.json({ posts });
});
app.get("/api/comment/:postId", (req, res) => {
  let id = req.params.postId;
  let commentData = comments.filter(comment => {
    return comment.postId === id;
  });
  res.json({ commentData });
});

app.post("/api/post", (req, res) => {
  posts.push(req.body);
  res.json(posts);
});

app.put("/api/post", (req, res) => {
  let Id = req.body.id;
  let posts1 = posts.map(obj => {
    if (obj.id == Id) {
      return req.body;
    } else {
      return obj;
    }
  });
  res.json(posts1);
});
app.delete("/api/post/:id", (req, res) => {
  let id = req.params.id;
  posts.splice(id - 1, 1);
  res.json(posts);
});
app.listen(port, () => {
  console.log(`port listening on port ${port}`);
});
