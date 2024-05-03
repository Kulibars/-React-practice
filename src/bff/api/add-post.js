import { generateDate } from "../utils";

export const addPost = ({ title, imageUrl, content }) =>
  fetch("http://localhost:3005/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      title,
      image_Url: imageUrl,
      content,
      published_At: generateDate(),
    }),
  }).then((createdPost) => createdPost.json());
