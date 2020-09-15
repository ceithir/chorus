import React from "react";
import { List } from "antd";

const ColumnsList = ({ dataSource, ...props }) => {
  return (
    <List
      grid={{
        gutter: 16,
        column: dataSource.length,
        xs: 1,
      }}
      dataSource={dataSource}
      {...props}
    />
  );
};

export default ColumnsList;
