import { ACTION_TYPE } from "./action-type";

export const setPostData = (PostData) => ({
  type: ACTION_TYPE.SET_POST_DATA,
  payload: PostData,
});
