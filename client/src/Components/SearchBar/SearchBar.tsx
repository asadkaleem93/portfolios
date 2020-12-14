import * as React from "react";
import Search, { SearchProps } from "antd/es/input/Search";

import "./SearchBar.scss";

type PropType = {
  onCardSearch: (searchedString: string) => void;
  placeHolder: string;
  searchStyle?: object;
} & SearchProps;

export const SearchBar = (props: PropType) => {
  const { onCardSearch, placeHolder, searchStyle = {} } = props;
  return <Search placeholder={placeHolder} allowClear onSearch={onCardSearch} style={{ width: 200, ...searchStyle }} />;
};
