import { useDispatch } from "react-redux";
import { useServerRequest } from "../../../../hooks";
import { CLOSE_MODAL, openModal, removePostAsync } from "../../../../actions";
import { Icon } from "../../../../components";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const SpecialPanelContainer = ({ id, className, publishedAt, editButton }) => {
  const dispatch = useDispatch();
  const requestServer = useServerRequest();
  const navigate = useNavigate();

  const onPostRemove = (id) => {
    dispatch(
      openModal({
        text: "Удалить статью?",
        onConfirm: () => {
          dispatch(removePostAsync(requestServer, id)).then(() => {
            navigate("/");
          });
          dispatch(CLOSE_MODAL);
        },

        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

  return (
    <div className={className}>
      <div className="published-at">
        {publishedAt && (
          <>
            <Icon id="fa-calendar-o" margin="0 7px 0 0" size="18px"></Icon>
            {publishedAt}
          </>
        )}
      </div>

      <div className="buttons">
        {editButton}
        {publishedAt && (
          <Icon
            size="18px"
            id="fa-trash-o"
            onClick={() => onPostRemove(id)}
          ></Icon>
        )}
      </div>
    </div>
  );
};

export const SpecialPanel = styled(SpecialPanelContainer)`
  margin: ${({ margin }) => margin};
  display: flex;
  justify-content: space-between;

  & .published-at {
    display: flex;
    font-size: 18px;
  }

  & .buttons {
    display: flex;
  }

  & i {
    position: relative;
    top: -1px;
  }
`;
