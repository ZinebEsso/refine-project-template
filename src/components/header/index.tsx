
"use client";

import { ColorModeContext } from "@context/color-mode";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { useGetIdentity } from "@refinedev/core";
import {
  Layout as AntdLayout,
  Avatar,
  Skeleton,
  Space,
  Switch,
  theme,
  Typography,
} from "antd";
import React, { useContext, useMemo } from "react";

const { Text } = Typography;
const { useToken } = theme;

type IUser = {
  id: number;
  name: string;
  avatar?: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { token } = useToken();
  const { data: user, isLoading } = useGetIdentity<IUser>();
  const { mode, setMode } = useContext(ColorModeContext);

  // Header Styles
  const headerStyles: React.CSSProperties = useMemo(
    () => ({
      backgroundColor: token.colorBgElevated,
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      padding: "0px 24px",
      height: "64px",
      ...(sticky && { position: "sticky", top: 0, zIndex: 1 }),
    }),
    [token.colorBgElevated, sticky]
  );

  // Get fallback avatar
  const avatarSrc = useMemo(
    () => user?.avatar || (user?.name ? user.name[0] : undefined),
    [user]
  );

  return (
    <AntdLayout.Header style={headerStyles}>
      <Space>
        {/* Theme Toggle Switch */}
        <Switch
          checkedChildren="🌛"
          unCheckedChildren="🔆"
          onChange={() => setMode(mode === "light" ? "dark" : "light")}
          defaultChecked={mode === "dark"}
        />

        {/* User Info with Fast Skeleton Fallback */}
        {isLoading ? (
          <Space style={{ marginLeft: "8px" }} size="middle">
            <Skeleton.Input
              active
              size="small"
              style={{ width: 50, height: 20, verticalAlign: "middle" }}
            />
            <Skeleton.Avatar active shape="circle" style={{ verticalAlign: "middle" }} />
          </Space>
        ) : (
          <Space style={{ marginLeft: "8px" }} size="middle">
            <Text strong>{user?.name || "Guest"}</Text>
            <Avatar  src={avatarSrc} alt={user?.name || "User"} />
          </Space>
        )}
      </Space>
    </AntdLayout.Header>
  );
};
