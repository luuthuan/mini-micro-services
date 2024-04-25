const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};
const handleEvent = (type, data) => {
  if (type == "PostCreated") {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }

  if (type == "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId]; // find post with postId
    post.comments.push({ id, content, status }); // push id & content into list comment at post was found
  }

  if (type === "CommentModerated") {
    const { id, postId, content, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
};
// QUICK EXAMPLE
// posts ===
//   {
//     asjd23sd: {
//       id: "asjd23sd",
//       title: "post title",
//       comments: [
//         { id: "fkd23t", content: "first comment" },
//         { id: "fkd23es2t", content: "second comment" },
//       ],
//     },
//     ds3fs2: {
//         id: "ds3fs2",
//         title: "post title",
//         comments: [
//           { id: "ds34s", content: "first comment" },
//           { id: "dstg3", content: "second comment" },
//         ],
//       },
//   };

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on 4002");
  const res = await axios("http://localhost:4005/events");
  for (let event of res.data) {
    console.log("Processing event: ", event.type);
    handleEvent(event.type, event.data);
  }
});
