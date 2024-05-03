import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Button } from "../../../../components";
import styled from "styled-components";
import { ROLE } from "../../../../constants";
import {
  selectUserRole,
  selectUserLogin,
  selectUserSession,
} from "../../../../selectors";
import { logoutAction } from "../../../../actions";

const RightAligned = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  height: 32px;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const ControlPanelContainer = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roleId = useSelector(selectUserRole);
  const login = useSelector(selectUserLogin);
  const session = useSelector(selectUserSession);

  const onLogout = () => {
    dispatch(logoutAction(session));
    sessionStorage.removeItem("userData");
  };

  return (
    <div className={className}>
      <RightAligned>
        {roleId === ROLE.GUEST ? (
          <Button>
            <Link to="/login">Войти</Link>
          </Button>
        ) : (
          <>
            <UserName>{login}</UserName>

            <Icon
              id="fa-sign-out"
              margin="3px 0px 0px 10px;"
              size="21px;"
              onClick={onLogout}
            />
          </>
        )}
      </RightAligned>
      <RightAligned>
        <Icon
          id="fa-backward"
          margin="5px 0 0 0"
          onClick={() => navigate(-1)}
        />

        <Link to="/post">
          <Icon id="fa-file-text-o" margin="5px 0 0 16px" onClick={() => {}} />
        </Link>
        <Link to="/users">
          <Icon id="fa-users" margin="5px 0 0 16px" onClick={() => {}} />
        </Link>
      </RightAligned>
    </div>
  );
};

export const ControlPanel = styled(ControlPanelContainer)``;
