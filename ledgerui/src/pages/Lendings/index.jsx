import React, { useMemo, useRef, useState } from "react";
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
import AddEditLeandings from "./AddEditLeandings";

const { Text, Title } = Typography;

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const TrackLendings = () => {
  const [modal, setModal] = useState(false);
  const dataRef = useRef({ data: {} });

  const data = useMemo(
    () => [
      {
        id: 1,
        lentDate: "07 Jun 2026",
        dueDate: "20 Jun 2026",
        borrowerName: "Rahul Patil",
        loanAmount: 18000,
        outstanding: 18000,
        purpose: "Emergency medical support",
        status: "Open",
      },
      {
        id: 2,
        lentDate: "02 Jun 2026",
        dueDate: "18 Jun 2026",
        borrowerName: "Neha Kulkarni",
        loanAmount: 25000,
        outstanding: 12000,
        purpose: "Short-term business cash flow",
        status: "Partially Repaid",
      },
      {
        id: 3,
        lentDate: "25 May 2026",
        dueDate: "05 Jun 2026",
        borrowerName: "Sagar Jadhav",
        loanAmount: 10000,
        outstanding: 10000,
        purpose: "Travel advance",
        status: "Overdue",
      },
      {
        id: 4,
        lentDate: "18 May 2026",
        dueDate: "30 May 2026",
        borrowerName: "Aarya Deshmukh",
        loanAmount: 15000,
        outstanding: 0,
        purpose: "Rent bridge loan",
        status: "Repaid",
      },
    ],
    [],
  );

  const summary = useMemo(() => {
    const totalLent = data.reduce(
      (sum, item) => sum + Number(item.loanAmount || 0),
      0,
    );
    const outstanding = data.reduce(
      (sum, item) => sum + Number(item.outstanding || 0),
      0,
    );
    const overdue = data
      .filter((item) => item.status === "Overdue")
      .reduce((sum, item) => sum + Number(item.outstanding || 0), 0);

    return {
      total: data.length,
      totalLent,
      outstanding,
      overdue,
      collected: totalLent - outstanding,
    };
  }, [data]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "lentDate",
        header: "Lent On",
        cell: ({ row }) => (
          <Space size={10}>
            <Avatar
              shape="square"
              size={40}
              style={{ background: "#e6fffb", color: "#08979c" }}
              icon={<CalendarOutlined />}
            />
            <div>
              <div style={{ fontWeight: 600, color: "#1f1f1f" }}>
                {row.original?.lentDate}
              </div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Due {row.original?.dueDate}
              </Text>
            </div>
          </Space>
        ),
      },
      {
        accessorKey: "borrowerName",
        header: "Borrower",
        cell: ({ row }) => (
          <Space size={10}>
            <Avatar style={{ backgroundColor: "#fff1f0", color: "#cf1322" }}>
              {row.original?.borrowerName?.[0]}
            </Avatar>
            <span>{row.original?.borrowerName}</span>
          </Space>
        ),
      },
      {
        accessorKey: "loanAmount",
        header: "Loan Amount",
        cell: ({ row }) => (
          <span style={{ fontWeight: 700, color: "#1677ff" }}>
            {formatCurrency(row.original?.loanAmount)}
          </span>
        ),
      },
      {
        accessorKey: "outstanding",
        header: "Outstanding",
        cell: ({ row }) => (
          <span
            style={{
              fontWeight: 700,
              color: row.original?.outstanding > 0 ? "#d46b08" : "#389e0d",
            }}
          >
            {formatCurrency(row.original?.outstanding)}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const colorMap = {
            Open: "blue",
            "Partially Repaid": "gold",
            Repaid: "green",
            Overdue: "red",
          };

          return (
            <Tag color={colorMap[row.original?.status]}>
              {row.original?.status}
            </Tag>
          );
        },
      },
      {
        accessorKey: "purpose",
        header: "Purpose",
        cell: ({ row }) => (
          <div>
            <div style={{ fontWeight: 500 }}>{row.original?.purpose}</div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Personal lending note
            </Text>
          </div>
        ),
      },
      {
        accessorKey: "action",
        header: "Actions",
        cell: ({row}) => (
          <Space size={16}>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => {
                dataRef.current.data = row.original;
                setModal(true)
              }}
            />
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
                  "linear-gradient(135deg, #fff7e6 0%, #ffffff 35%, #e6f4ff 100%)",
                boxShadow: "0 16px 40px rgba(31, 35, 41, 0.08)",
              }}
            >
              <Row gutter={[24, 24]} align="middle" justify="space-between">
                <Col xs={24} lg={16}>
                  <Space direction="vertical" size={8}>
                    <Tag
                      bordered={false}
                      color="orange"
                      style={{ width: "fit-content", paddingInline: 12 }}
                    >
                      Loan and lending tracker
                    </Tag>
                    <Title level={2} style={{ margin: 0 }}>
                      Money Lent
                    </Title>
                    <Text type="secondary" style={{ fontSize: 16 }}>
                      Track who borrowed from you, how much is still due, and
                      which loans need follow-up.
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
                    Add Lending
                  </Button>
                </Col>
              </Row>

              <Divider style={{ marginBlock: 24 }} />

              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} xl={6}>
                  <Card bordered={false} style={{ borderRadius: 18 }}>
                    <Statistic title="Total Loans" value={summary.total} />
                  </Card>
                </Col>
                <Col xs={24} sm={12} xl={6}>
                  <Card bordered={false} style={{ borderRadius: 18 }}>
                    <Statistic
                      title="Total Lent"
                      value={summary.totalLent}
                      prefix={<WalletOutlined />}
                      formatter={(value) => formatCurrency(value)}
                      valueStyle={{ color: "#1677ff" }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} xl={6}>
                  <Card bordered={false} style={{ borderRadius: 18 }}>
                    <Statistic
                      title="Outstanding"
                      value={summary.outstanding}
                      prefix={<WalletOutlined />}
                      formatter={(value) => formatCurrency(value)}
                      valueStyle={{ color: "#d46b08" }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} xl={6}>
                  <Card bordered={false} style={{ borderRadius: 18 }}>
                    <Statistic
                      title="Overdue Amount"
                      value={summary.overdue}
                      prefix={<WalletOutlined />}
                      formatter={(value) => formatCurrency(value)}
                      valueStyle={{
                        color: summary.overdue > 0 ? "#cf1322" : "#389e0d",
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
              <DataTable
                title="Lending history"
                columns={columns}
                data={data}
              />
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        style={{ top: 24 }}
        open={modal}
        title={
          <span style={{ fontSize: 24, fontWeight: 700 }}>Add New Lending</span>
        }
        destroyOnHidden
        onCancel={() => {
          setModal(false);
        }}
        footer={null}
        width={960}
      >
        <AddEditLeandings onCancel={() => setModal(false)} initialValues={dataRef.current.data} />
      </Modal>
    </>
  );
};

export default TrackLendings;
