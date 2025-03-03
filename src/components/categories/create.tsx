"use client";

import { Create, useForm } from "@refinedev/antd";
import { useInvalidate } from "@refinedev/core";
import { Form, Input } from "antd";
import React from "react";

export default function CategoryCreateComponent() {
    const invalidate = useInvalidate();
  
  const { formProps, saveButtonProps } = useForm({
    resource: "categories",
    redirect: "list",
    mutationMode: "pessimistic", 
    mutationMeta: {
      onSuccess: () => {
        invalidate({
          resource: "categories",
          invalidates: ["list", "many", "detail"]
        });
      },
    },
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
      </Form>
    </Create>
  );
}
