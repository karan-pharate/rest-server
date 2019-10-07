const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
app.use(bodyParser.json());
let posts = [
  { id: "2", title: "post 2", description: "some description" },
  { id: "1", title: "post 1", description: "some description" },
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
//Get posts
app.get("/api/post", (req, res) => {
  res.json({ posts });
});

//Get posts by id
app.get("/api/post/:id", (req, res) => {
  let Id = req.params.id;
  let postData = posts.filter(post => {
    return post.id === Id;
  });
  res.json({ postData });
});
//Post method
app.post("/api/post", (req, res) => {
  posts.push(req.body);
  res.json(posts);
});
//Put method
app.put("/api/post", (req, res) => {
  let Id = req.body.id;
  let index = posts.findIndex(obj => {
    return obj.id == Id;
  });
  if(index == -1){
    res.json({
      success:  false,
      error: "index not matched!"
    });
  }else {
  posts[index] = req.body;
  res.json({
    success:  true
  });
}
});
//Delete method
app.delete("/api/post/:Id", (req, res) => {
  let id = req.params.Id;
  let index = posts.findIndex(obj => {
    return obj.id == id;
  });
  if(index == -1){
    res.json({
      success:  false,
      error: "index not matched!"
    });
  }else {
  posts.splice(index, 1);
  res.json({
    success:  true
  });
}
});
//Get Comments by postid
app.get("/api/comment", (req, res) => {
    let id = req.query.postId;
    let commentData = comments.filter(comment => {
      return comment.postId === id;
    });
    if(id === undefined)
    {
      res.json({comments});
    }
    else {
    res.json({ commentData });
    }
  });
  //post comments
  app.post("/api/comment", (req, res) => {
    let Id = req.body.postId;
    let index = posts.findIndex(obj => {
      return obj.id == Id;
    });
    if(index == -1){
      res.json({
        success:  false,
      });
    }else {
    comments.push(req.body);
    res.json({
      success:  true
    });
  }
  })
  app.put("/api/comment", (req, res) => {
    let Id = req.body.postId;
    let index = comments.findIndex(obj => {
      return obj.postId == Id;
    });
    if(index == -1){
      res.json({
        success:  false,
        error: "index not matched!"
      });
    }else {
    comments[index] = req.body;
    res.json({
      success:  true
    });
  }
  })
  app.delete("/api/comment/:postId", (req, res) => {
    let id = req.params.postId;
    let index = comments.findIndex(obj => {
      return obj.postId == id;
    });
    if(index == -1){
      res.json({
        success:  false,
        error: "index not matched!"
      });
    }else {
    comments.splice(index, 1);
    res.json({
      success:  true
    });
  }
  });
app.listen(port, () => {
  console.log(`port listening on port ${port}`);
});
