const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};
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

  if (type == "PostCreated") {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }

  if (type == "CommentCreated") {
    const { id, content, postId } = data;
    const post = posts[postId]; // find post with postId
    post.comments.push({ id, content }); // push id & content into list comment at post was found
  }

  console.log(posts);
  res.send({});
});

app.listen(4002, () => {
  console.log("Listening on 4002");
});
