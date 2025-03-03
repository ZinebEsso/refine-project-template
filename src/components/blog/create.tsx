"use client";

import { Create, useForm, useSelect } from "@refinedev/antd";
import { useInvalidate } from "@refinedev/core";
import { Form, Input, Select } from "antd";
import React from "react";

export default function BlogPostCreateComponent() {
  
  const invalidate = useInvalidate();

  const { formProps, saveButtonProps } = useForm({
    resource: "blog_posts",
    redirect: "list",
    mutationMode: "pessimistic", 
    mutationMeta: {
      onSuccess: () => {
        invalidate({
          resource: "blog_posts",
          invalidates: ["list", "many", "detail"]
        });
      },
    },
  });
  
  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Title"}
          name={["title"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Content"}
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          label={"Category"}
          name={["category", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
        <Form.Item
          label={"Status"}
          name={["status"]}
          initialValue={"draft"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            defaultValue={"draft"}
            options={[
              { value: "draft", label: "Draft" },
              { value: "published", label: "Published" },
              { value: "rejected", label: "Rejected" },
            ]}
            style={{ width: 120 }}
          />
        </Form.Item>
      </Form>
    </Create>
  );
}
