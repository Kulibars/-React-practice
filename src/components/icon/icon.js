import PropTypes from "prop-types";
import styled from "styled-components";

const IconContainer = ({ className, id, size, margin, disabled, ...props }) => (
  <div className={className}>
    <i className={`fa ${id} `} aria-hidden="true" {...props}></i>
  </div>
);

export const Icon = styled(IconContainer)`
  margin: ${({ margin = "0" }) => margin};
  font-size: ${({ size = "24px" }) => size};
  color: ${({ disabled }) => (disabled ? "#ccc" : "#000")};

  &:hover {
    cursor: ${({ onClick }) => (onClick ? "pointer" : "default")};
  }
`;

Icon.propTypes = {
  id: PropTypes.string,
  size: PropTypes.string,
  margin: PropTypes.string,
  disabled: PropTypes.bool,
};
