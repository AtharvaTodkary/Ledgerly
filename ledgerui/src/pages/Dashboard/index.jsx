import { useMemo } from "react";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DollarCircleOutlined,
  RiseOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Card,
  Col,
  Progress,
  Row,
  Space,
  Statistic,
  Tag,
  Typography,
} from "antd";
import DataTable from "../../shared/components/core-components/DataTable";

const { Title, Text } = Typography;

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export default function Dashboard() {
  const kpiList = [
    {
      title: "Total Balance",
      value: 84250,
      icon: <WalletOutlined />,
      accent: "#1677ff",
      note: "+8.4% from last month",
    },
    {
      title: "Money Lent",
      value: 24000,
      icon: <ArrowUpOutlined />,
      accent: "#13c2c2",
      note: "6 active settlements",
    },
    {
      title: "This Month Spent",
      value: 18650,
      icon: <ArrowDownOutlined />,
      accent: "#cf1322",
      note: "Top category: household",
    },
    {
      title: "Amount Due",
      value: 9300,
      icon: <DollarCircleOutlined />,
      accent: "#7b61ff",
      note: "2 payments expected this week",
    },
  ];

  const activityCards = [
    {
      title: "Budget health",
      value: "72%",
      description: "Monthly spending is within your planned range.",
      progress: 72,
      strokeColor: "#52c41a",
    },
    {
      title: "Collections progress",
      value: "58%",
      description: "Recoveries are moving steadily across current loans.",
      progress: 58,
      strokeColor: "#1677ff",
    },
  ];

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <Space>
            <Avatar
              style={{
                background:
                  row.original.status === "Active" ? "#e6fffb" : "#fff1f0",
                color: row.original.status === "Active" ? "#08979c" : "#cf1322",
              }}
            >
              {row.original.name[0]}
            </Avatar>
            <div>
              <div style={{ fontWeight: 600 }}>{row.original.name}</div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {row.original.email}
              </Text>
            </div>
          </Space>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ getValue }) => (
          <Text style={{ color: "#595959" }}>{getValue()}</Text>
        ),
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ getValue }) => <Tag color="blue">{getValue()}</Tag>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => (
          <Tag color={getValue() === "Active" ? "green" : "red"}>
            {getValue()}
          </Tag>
        ),
      },
    ],
    [],
  );

  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "john@test.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@test.com",
      role: "Manager",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@test.com",
      role: "Developer",
      status: "Active",
    },
  ];

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card
            bordered={false}
            style={{
              borderRadius: 24,
              overflow: "hidden",
              background:
                "linear-gradient(135deg, #f0f5ff 0%, #ffffff 40%, #f6ffed 100%)",
              boxShadow: "0 16px 40px rgba(31, 35, 41, 0.08)",
            }}
          >
            <Space direction="vertical" size={8} style={{ width: "100%" }}>
              <Tag
                bordered={false}
                color="geekblue"
                style={{ width: "fit-content", paddingInline: 12 }}
              >
                Financial command center
              </Tag>
              <Title level={2} style={{ margin: 0 }}>
                Dashboard overview
              </Title>
              <Text type="secondary" style={{ fontSize: 16 }}>
                Keep track of balances, lending activity, and recent movement in
                one place.
              </Text>
            </Space>

            <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
              {kpiList.map((kpi) => (
                <Col xs={24} sm={12} xl={6} key={kpi.title}>
                  <Card bordered={false} style={{ borderRadius: 18 }}>
                    <Space direction="vertical" size={10} style={{ width: "100%" }}>
                      <Avatar
                        size={44}
                        style={{
                          background: `${kpi.accent}14`,
                          color: kpi.accent,
                        }}
                        icon={kpi.icon}
                      />
                      <Statistic
                        title={kpi.title}
                        value={kpi.value}
                        formatter={(value) => formatCurrency(value)}
                        valueStyle={{ fontSize: 24 }}
                      />
                      <Text type="secondary">{kpi.note}</Text>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        {activityCards.map((item) => (
          <Col xs={24} lg={12} key={item.title}>
            <Card
              bordered={false}
              style={{
                borderRadius: 24,
                boxShadow: "0 16px 40px rgba(31, 35, 41, 0.08)",
              }}
            >
              <Row align="middle" justify="space-between" gutter={[16, 16]}>
                <Col xs={24} sm={16}>
                  <Space direction="vertical" size={8}>
                    <Space>
                      <RiseOutlined style={{ color: item.strokeColor }} />
                      <Text strong>{item.title}</Text>
                    </Space>
                    <Title level={3} style={{ margin: 0 }}>
                      {item.value}
                    </Title>
                    <Text type="secondary">{item.description}</Text>
                  </Space>
                </Col>
                <Col xs={24} sm={8}>
                  <Progress
                    type="circle"
                    percent={item.progress}
                    strokeColor={item.strokeColor}
                    trailColor="#f0f0f0"
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        ))}

        <Col xs={24} xl={12}>
          <Card
            title="Recent Transactions"
            bordered={false}
            style={{
              borderRadius: 24,
              boxShadow: "0 16px 40px rgba(31, 35, 41, 0.08)",
            }}
          >
            <DataTable title="Latest activity" columns={columns} data={data} />
          </Card>
        </Col>
        <Col xs={24} xl={12}>
          <Card
            title="Recent Loans"
            bordered={false}
            style={{
              borderRadius: 24,
              boxShadow: "0 16px 40px rgba(31, 35, 41, 0.08)",
            }}
          >
            <DataTable title="Open relationships" columns={columns} data={data} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
