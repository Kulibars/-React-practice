import styled from "styled-components";
import { H2, Icon } from "../../../../components";

const PostContentContainer = ({
  className,
  post: { publishedAt, title, imageUrl, content, id },
}) => {
  return (
    <div className={className}>
      <img src={imageUrl} alt={title} />
      <H2>{title}</H2>
      <div className="special-panel">
        <div className="published-at">
          <Icon
            id="fa-calendar-o"
            margin="0 7px 0 0"
            size="18px"
            onClick={() => {}}
          ></Icon>
          {publishedAt}
        </div>
        <div className="buttons">
          <Icon
            id="fa-pencil-square-o"
            margin="0 10px 0 0"
            size="18px"
            onClick={() => {}}
          ></Icon>
          <Icon size="18px" id="fa-trash-o" onClick={() => {}}></Icon>
        </div>
      </div>
      <div className="post-text">{content}</div>
    </div>
  );
};

export const PostContent = styled(PostContentContainer)`
  & img {
    float: left;
    margin: 0 20px 10px 0;
  }

  & .special-panel {
    margin: -20px 0 20px;
    display: flex;
    justify-content: space-between;
  }

  & .published-at {
    display: flex;
    font-size: 18px;
  }

  & i {
    position: relative;
    top: -1px;
  }

  & .buttons {
    display: flex;
  }

  & .post-text {
    font-size: 18px;
  }
`;
