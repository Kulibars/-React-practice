import { H2 } from "../h2/h2";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
`;

export const Error = ({ error }) =>
  error && (
    <div>
      <H2>ОШИБКА</H2>
      <Div>{error}</Div>
    </div>
  );
