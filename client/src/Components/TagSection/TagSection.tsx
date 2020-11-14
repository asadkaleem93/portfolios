import * as React from "react";
import Tag from "antd/es/tag";

type TagSectionType = {
  tags: Array<string>;
};

export const TagSection = (props: TagSectionType) => {
  const { tags } = props;
  return (
    <>
      {tags.map((tag: string) => (
        <Tag color="blue">{tag}</Tag>
      ))}
    </>
  );
};
