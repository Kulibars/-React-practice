import { updatePost, addPost } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";

export const savePost = async (hash, newPostData) => {
  const accessRoles = [ROLE.ADMINISTRATOR];

  const access = await sessions.access(hash, accessRoles);
  if (!access) {
    return {
      error: "Доступ запрещен",
      res: null,
    };
  }

  const savePost =
    newPostData.id === ""
      ? await addPost(newPostData)
      : await updatePost(newPostData);

  return {
    error: null,
    res: savePost,
  };
};
