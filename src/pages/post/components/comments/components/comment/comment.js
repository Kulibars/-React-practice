import { Icon } from "../../../../../../components";
import styled from "styled-components";
const CommentContainer = ({ className, id, author, content, publishedAt }) => {
  return (
    <div className={className}>
      <div className="comment">
        <div className="information-panel">
          <div className="author">
            <Icon
              id="fa-user-circle-o"
              margin="0 0 0 10px"
              size="18px"
              onClick={() => {}}
            />
            {author}
          </div>
          <div className="published-at">
            <Icon
              id="fa-calendar-o"
              margin="0 10px 0 0"
              size="18px"
              onClick={() => {}}
            ></Icon>
            {publishedAt}
          </div>
        </div>
        <div className="comment-text">{content}</div>
      </div>
      <Icon
        id="fa-trash-o"
        margin="0 0 0 10px"
        size="18px"
        onClick={() => {}}
      />
    </div>
  );
};

export const Comment = styled(CommentContainer)`
  display: flex;
  width: 100%;
  margin-top: 10px;

  & .comment {
    border: 1px solid #000;
    padding: 5px 10px;
    width: 550px;
  }

  & .information-panel {
    display: flex;
    justify-content: space-between;
  }

  & .author {
    display: flex;
  }

  & .published-at {
    display: flex;
  }
`;
