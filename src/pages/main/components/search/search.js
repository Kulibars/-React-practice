import styled from "styled-components";
import { Icon, Input } from "../../../../components";

const SearchContainer = ({ className, searchPhrase, onChange }) => {
  return (
    <div className={className}>
      <Input
        value={searchPhrase}
        placeholder="Поиск по заголовкам"
        onChange={onChange}
      />
      <Icon id="fa fa-search" margin="1px 7px 0 0" size="21px" />
    </div>
  );
};
export const Search = styled(SearchContainer)`
  display: flex;
?
  width: 320px;
  height: 40px;
  margin: 40px auto 0;
  border: 1px solid #000;

  & > div {
    position: absolute;
    right: 9px;
    top: 3px;
  }

  & > input {
    padding: 10px 32px 10px 10px;
  }
`;
