"use client";

import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import type { BaseRecord } from "@refinedev/core";
import { Space, Table } from "antd";
import React from "react";

export default function CategoryListComponent() {
  const { tableProps, current, pageSize, setCurrent } = useTable({
    resource: "categories",
    syncWithLocation: true,
    pagination: {
      current: 1,
      pageSize: 5,
    },
    queryOptions: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10, 
      refetchOnWindowFocus: false, 
    
    },
  });

  return (
    <List>
      <Table
        {...tableProps}
        rowKey="id"
        loading={tableProps?.loading}
        pagination={{
          current,
          pageSize,
          onChange: (page) => setCurrent(page),
          total:
            tableProps.pagination && tableProps.pagination.total
              ? tableProps.pagination.total
              : 0,
        }}
      >
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="title" title={"title"} />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
}
