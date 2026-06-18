import { Button, Dropdown, Flex, Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { RoutesItems } from "../configs/RouteConfigs";
import { SettingFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../features/auth/authSlice";
import { selectIsAuthenticated } from "../features/auth/authSelectors";

const { Header } = Layout;

export default function AppHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  let sampleMenuItems = RoutesItems.map((route) => {
    if (
      route.location === "/" ||
      route.location === "/login" ||
      route.location === "/register" ||
      route.location === "/profile" ||
      route.location === "/settings" ||
      route.location === "*"
    ) {
      return undefined;
    }

    return {
      key: route.location,
      label: `${route?.path?.charAt(0).toUpperCase() + route?.path?.slice(1)}`,
      onClick: () => navigate(route.location),
    };
  }).filter((k) => Boolean(k?.key));

  const items = [
    {
      key: "1",
      label: "Profile",
      onClick: () => {
        navigate("/profile");
      },
    },
    {
      key: "2",
      label: "Settings",
      onClick: () => {
        navigate("/settings");
      },
    },
    {
      key: "3",
      label: "Logout",
      onClick: () => {
        dispatch(logoutRequest());
      },
    },
  ];

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
      }}
    >
      <Flex justify={"space-between"} align={"center"}>
        <div
          style={{
            color: "#fff",
            fontSize: "20px",
            fontWeight: 600,
            marginRight: "32px",
          }}
        >
          Ledgerly
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          items={sampleMenuItems}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        {isAuthenticated ? (
          <Dropdown menu={{ items }} align={"Center"} trigger={["click"]}>
            <Button
              style={{
                background: "#3270dd",
                border: "1px solid white",
                color: "white",
              }}
              icon={<SettingFilled />}
              // onClick={() => {}}
            ></Button>
          </Dropdown>
        ) : null}
      </Flex>
    </Header>
  );
}
