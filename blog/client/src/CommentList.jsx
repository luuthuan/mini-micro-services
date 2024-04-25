import React from "react";

const CommentList = ({ comments }) => {
  const renderComments = Object.values(comments).map((comment) => {
    let content = comment.content;

    if (comment.status === "pending") {
      content = "This comment is awating moderation";
    }
    if (comment.status === "rejected") {
      content = "This comment has been rejected";
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderComments}</ul>;
};

export default CommentList;
