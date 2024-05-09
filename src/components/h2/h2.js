import styled from "styled-components";

const H2Container = ({ children, className }) => (
  <h2 className={className}>{children}</h2>
);

export const H2 = styled(H2Container)`
  text-align: center;
  margin: 40px 0;
`;
