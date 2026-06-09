import React, { useMemo, useState } from "react";
import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Modal,
  Row,
  Space,
  Statistic,
  Tag,
  Typography,
} from "antd";
import DataTable from "../../shared/components/core-components/DataTable";
import AddEditExpense from "./AddEditExpense";

const { Text, Title } = Typography;

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const Expenses = () => {
  const [modal, setModal] = useState(false);

  const data = useMemo(
    () => [
      {
        id: 1,
        date: "05 Jun 2026",
        type: "Expense",
        amt: 1500,
        category: "Food",
        desc: "Family dinner and groceries",
        recipient: "Atharva Todkary",
      },
      {
        id: 2,
        date: "04 Jun 2026",
        type: "Income",
        amt: 12000,
        category: "Salary",
        desc: "Monthly freelance payout",
        recipient: "Northstar Labs",
      },
      {
        id: 3,
        date: "03 Jun 2026",
        type: "Expense",
        amt: 850,
        category: "Transport",
        desc: "Cab and metro top-up",
        recipient: "Uber India",
      },
      {
        id: 4,
        date: "01 Jun 2026",
        type: "Expense",
        amt: 2200,
        category: "Utilities",
        desc: "Electricity and internet bill",
        recipient: "Household Services",
      },
    ],
    [],
  );

  const summary = useMemo(() => {
    const income = data
      .filter((item) => item.type === "Income")
      .reduce((sum, item) => sum + Number(item.amt || 0), 0);

    const expense = data
      .filter((item) => item.type === "Expense")
      .reduce((sum, item) => sum + Number(item.amt || 0), 0);

    return {
      total: data.length,
      income,
      expense,
      balance: income - expense,
    };
  }, [data]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => (
          <Space size={10}>
            <Avatar
              shape="square"
              size={40}
              style={{ background: "#f0f5ff", color: "#2f54eb" }}
              icon={<CalendarOutlined />}
            />
            <div>
              <div style={{ fontWeight: 600, color: "#1f1f1f" }}>
                {row.original?.date}
              </div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Recorded transaction
              </Text>
            </div>
          </Space>
        ),
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
          <Tag color={row.original?.type === "Income" ? "green" : "volcano"}>
            {row.original?.type}
          </Tag>
        ),
      },
      {
        accessorKey: "amt",
        header: "Amount",
        cell: ({ row }) => (
          <span
            style={{
              fontWeight: 700,
              color: row.original?.type === "Income" ? "#389e0d" : "#cf1322",
            }}
          >
            {row.original?.type === "Income" ? "+" : "-"}
            {formatCurrency(row.original?.amt)}
          </span>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => <Tag>{row.original?.category}</Tag>,
      },
      {
        accessorKey: "desc",
        header: "Description",
        cell: ({ row }) => (
          <div>
            <div style={{ fontWeight: 500 }}>{row.original?.desc}</div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Personal ledger note
            </Text>
          </div>
        ),
      },
      {
        accessorKey: "recipient",
        header: "Recipient",
        cell: ({ row }) => (
          <Space size={10}>
            <Avatar style={{ backgroundColor: "#fde3cf", color: "#d46b08" }}>
              {row.original?.recipient?.[0]}
            </Avatar>
            <span>{row.original?.recipient}</span>
          </Space>
        ),
      },
      {
        accessorKey: "action",
        header: "Actions",
        cell: () => (
          <Space size={16}>
            <Button type="text" icon={<EditOutlined />} />
            <Button danger type="text" icon={<DeleteOutlined />} />
          </Space>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <div>
        <Row gutter={[24, 24]}>
          <Col xs={24}>
            <Card
              bordered={false}
              style={{
                borderRadius: 24,
                overflow: "hidden",
                background:
                  "linear-gradient(135deg, #f6ffed 0%, #ffffff 35%, #f0f5ff 100%)",
                boxShadow: "0 16px 40px rgba(31, 35, 41, 0.08)",
              }}
            >
              <Row gutter={[24, 24]} align="middle" justify="space-between">
                <Col xs={24} lg={16}>
                  <Space direction="vertical" size={8}>
                    <Tag
                      bordered={false}
                      color="blue"
                      style={{ width: "fit-content", paddingInline: 12 }}
                    >
                      Smart expense tracking
                    </Tag>
                    <Title level={2} style={{ margin: 0 }}>
                      Transactions
                    </Title>
                    <Text type="secondary" style={{ fontSize: 16 }}>
                      Review income and expenses, then add new entries without
                      leaving this screen.
                    </Text>
                  </Space>
                </Col>
                <Col xs={24}>
                  <Button
                    size="large"
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      setModal(true);
                    }}
                  >
                    Add Transaction
                  </Button>
                </Col>
              </Row>

              <Divider style={{ marginBlock: 24 }} />

              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} xl={6}>
                  <Card bordered={false} style={{ borderRadius: 18 }}>
                    <Statistic title="Total Transactions" value={summary.total} />
                  </Card>
                </Col>
                <Col xs={24} sm={12} xl={6}>
                  <Card bordered={false} style={{ borderRadius: 18 }}>
                    <Statistic
                      title="Total Income"
                      value={summary.income}
                      prefix={<WalletOutlined />}
                      formatter={(value) => formatCurrency(value)}
                      valueStyle={{ color: "#389e0d" }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} xl={6}>
                  <Card bordered={false} style={{ borderRadius: 18 }}>
                    <Statistic
                      title="Total Expenses"
                      value={summary.expense}
                      prefix={<WalletOutlined />}
                      formatter={(value) => formatCurrency(value)}
                      valueStyle={{ color: "#cf1322" }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} xl={6}>
                  <Card bordered={false} style={{ borderRadius: 18 }}>
                    <Statistic
                      title="Net Balance"
                      value={summary.balance}
                      prefix={<WalletOutlined />}
                      formatter={(value) => formatCurrency(value)}
                      valueStyle={{
                        color: summary.balance >= 0 ? "#1677ff" : "#cf1322",
                      }}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24}>
            <Card
              bordered={false}
              style={{
                borderRadius: 24,
                boxShadow: "0 16px 40px rgba(31, 35, 41, 0.08)",
              }}
            >
              <DataTable title="Transaction history" columns={columns} data={data} />
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        style={{ top: 24 }}
        open={modal}
        title={<span style={{ fontSize: 24, fontWeight: 700 }}>Add New Transaction</span>}
        destroyOnHidden
        onCancel={() => {
          setModal(false);
        }}
        footer={null}
        width={960}
      >
        <AddEditExpense onCancel={() => setModal(false)} />
      </Modal>
    </>
  );
};

export default Expenses;
