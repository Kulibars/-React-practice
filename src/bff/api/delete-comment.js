export const deleteComment = (commentid) =>
  fetch(`http://localhost:3005/comments/${commentid}`, {
    method: "DELETE",
  });
