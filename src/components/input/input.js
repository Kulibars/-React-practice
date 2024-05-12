import styled from "styled-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
  return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
  width: ${({ width = "100%" }) => width};
  font-size: 18px;
  height: 40px;
  margin: 0 0 10px;
  padding: 10px;
  border: 1px solid #000;
`;

Input.propTypes = {
  width: PropTypes.string,
};
