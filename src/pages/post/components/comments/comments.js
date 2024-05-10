import { useState } from "react";
import { Icon } from "../../../../components";
import styled from "styled-components";
import { useServerRequest } from "../../../../hooks";
import { addCommentAsync } from "../../../../actions";
import { Comment } from "./components";
import { selectUserId, selectUserRole } from "../../../../selectors";
import { useDispatch, useSelector } from "react-redux";
import { ROLE } from "../../../../constants";

const CommentsContainer = ({ className, comments, postId }) => {
  const [newComment, setNewComment] = useState();
  const userId = useSelector(selectUserId);
  const userRole = useSelector(selectUserRole);
  const dispatch = useDispatch();
  const requestServer = useServerRequest();
  const onNewCommentAdd = (userId, postId, newComment) => {
    dispatch(addCommentAsync(requestServer, userId, postId, newComment));
    setNewComment("");
  };

  const isGuest = userRole === ROLE.GUEST;

  return (
    <div className={className}>
      {!isGuest && (
        <div className="new-comment">
          <textarea
            name="comment"
            value={newComment}
            placeholder="Комментарий"
            onChange={({ target }) => setNewComment(target.value)}
          ></textarea>
          <Icon
            id="fa-paper-plane-o"
            margin="0 0 0 10px"
            size="18px"
            onClick={() => onNewCommentAdd(userId, postId, newComment)}
          ></Icon>
        </div>
      )}

      <div className="comments">
        {comments.map(({ id, author, content, publishedAt }) => (
          <Comment
            key={id}
            postId={postId}
            id={id}
            author={author}
            content={content}
            publishedAt={publishedAt}
          ></Comment>
        ))}
      </div>
    </div>
  );
};

export const Comments = styled(CommentsContainer)`
  margin: 0 auto;
  width: 580px;

  & .new-comment {
    margin: 20px 0 0;
    display: flex;
    width: 100%;
  }

  & .new-comment textarea {
    font-size: 18px;
    height: 120px;
    width: 550px;
    resize: none;
  }
`;
