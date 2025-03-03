"use client";

import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord } from "@refinedev/core";
import { Skeleton, Space, Table } from "antd";

export default function BlogPostListComponent() {
  const { tableProps, current, pageSize, setCurrent } = useTable({
    resource: "blog_posts",
    syncWithLocation: true,
    pagination: {
      current: 1,
      pageSize: 10,
      mode: "server",
    },
    queryOptions: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10, 
      refetchOnWindowFocus: false, 
    },
  });
  console.log(tableProps)
  const { tableProps: categoryData } = useTable({
    resource: "categories",
    pagination : {
      mode: "off"
    },
    queryOptions: {
      enabled: !!tableProps?.dataSource,
      staleTime : 1000 * 60 * 5,
    },
  });
  console.log(categoryData)
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
        }}
      >
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="title" title={"Title"} />
        <Table.Column
          dataIndex="content"
          title={"Content"}
          render={(value: any) => {
            if (!value) return "-";
            return <MarkdownField value={value.slice(0, 40) + "..."} />;
          }}
        />
        <Table.Column
          dataIndex={"category"}
          title={"Category"}
          render={(value) =>{
            console.log( value?.id)
            console.log(categoryData?.dataSource?.find(
              (item: any) => item?.id === value?.id)
              ?.title )
            return categoryData?.dataSource ? (
              categoryData?.dataSource?.find((item: any) => item?.id === value?.id)?.title 
            ) : (
              <Skeleton.Input
                active
                size="small"
                style={{ width: 50, height: 20, verticalAlign: "middle" }}
              />
            )
          }}
        />
        <Table.Column dataIndex="status" title={"Status"} />
        
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
