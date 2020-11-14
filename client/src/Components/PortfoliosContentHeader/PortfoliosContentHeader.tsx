import * as React from "react";
import Search from "antd/es/input/Search";

type PortfoliosContentHeaderType = {
  onCardSearch: (searchedString: string) => void;
};

export const PortfoliosContentHeader = (props: PortfoliosContentHeaderType) => {
  const { onCardSearch } = props;
  return (
    <Search
      placeholder="Search you target"
      allowClear
      onSearch={onCardSearch}
      style={{ width: 200 }}
    />
  );
};
