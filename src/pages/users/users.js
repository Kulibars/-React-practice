import { H2, Content } from "../../components";
import { UserRow, TableRow } from "./components";
import { useServerRequest } from "../../hooks";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ROLE } from "../../constants";

const UsersContainer = ({ className }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

  const requestServer = useServerRequest();

  useEffect(() => {
    Promise.all([
      requestServer("fetchUsers"),
      requestServer("fetchRoles"),
    ]).then(([usersRes, rolesRes]) => {
      if (usersRes.error || rolesRes.error) {
        setErrorMessage(usersRes.error || rolesRes.error);
        return;
      }
      setUsers(usersRes.res);
      setRoles(rolesRes.res);
    });
  }, [requestServer, shouldUpdateUserList]);

  const onUserRemove = (userId) => {
    requestServer("removeUser", userId).then(() => {
      setShouldUpdateUserList(!shouldUpdateUserList);
    });
  };

  return (
    <div className={className}>
      <Content error={errorMessage}>
        <>
          <H2>Пользователи</H2>
          <div>
            <TableRow>
              <div className="login-column">логин</div>
              <div className="registed-at-column">дата регистрации</div>
              <div className="role-column">роль</div>
            </TableRow>

            {users.map(({ id, registeredAt, roleId, login }) => (
              <UserRow
                id={id}
                key={id}
                login={login}
                registeredAt={registeredAt}
                roleId={roleId}
                roles={roles.filter(({ id }) => id !== ROLE.GUEST)}
                onUserRemove={() => onUserRemove(id)}
              />
            ))}
          </div>
        </>
      </Content>
    </div>
  );
};

export const Users = styled(UsersContainer)`

font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width 570px;

`;
