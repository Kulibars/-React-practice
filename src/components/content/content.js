import { H2 } from "../h2/h2";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = ({ children, error }) =>
  error ? (
    <>
      <H2>ОШИБКА</H2>
      <Div>{error}</Div>
    </>
  ) : (
    children
  );

export const Content = styled(ContentContainer)`
  padding: 120px 0;
`;
