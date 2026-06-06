import { useState } from 'react';
import { Card, Table, Button, Space, Badge, Tag, Typography, Row, Col, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, BankOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteLoan, recordPayment } from '../../features/lending/lendingSlice';
import { LOAN_STATUS_LABELS, LOAN_STATUS_COLORS, STORAGE_KEYS } from '../../shared/constants';

const { Title } = Typography;

const STATUS_COLORS = {
  unpaid: '#ff4d4f',
  paid: '#52c41a',
  partial: '#faad14',
};

const STATUS_LABELS = {
  unpaid: 'Unpaid',
  paid: 'Paid',
  partial: 'Partial',
};

export default function Lending() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loans = useAppSelector((state) => state.lending.loans);

  const handleAddLoan = () => {
    navigate('/lending/new');
  };

  const handleDelete = (id) => {
    dispatch(deleteLoan(id));
  };

  const handlePayment = (loan) => {
    navigate(`/lending/payments?loanId=${loan.id}`);
  };

  const columns = [
    {
      title: 'Borrower',
      dataIndex: 'borrowerName',
      key: 'borrowerName',
    },
    {
      title: 'Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount) => `₹${amount.toLocaleString()}`,
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date) => (date ? new Date(date).toLocaleDateString() : 'Not Set'),
    },
    {
      title: 'Partial Payments',
      dataIndex: 'partialPayments',
      key: 'partialPayments',
      render: (payments) => {
        if (payments && payments.length > 0) {
          const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
          return `₹${totalPaid.toLocaleString()} (${payments.length})`;
        }
        return '-';
      },
    },
    {
      title: 'Balance',
      dataIndex: 'remainingBalance',
      key: 'remainingBalance',
      render: (balance) => `₹${balance.toLocaleString()}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge color={LOAN_STATUS_COLORS[status]} text={STATUS_LABELS[status]} />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {record.remainingBalance > 0 && (
            <Button type="link" size="small" onClick={() => handlePayment(record)}>
              <BankOutlined />
            </Button>
          )}
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger size="small" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data = loans.map((l) => ({
    ...l,
    key: l.id,
    status: l.status === 'unpaid' ? 'unpaid' : l.remainingBalance === 0 ? 'paid' : 'partial',
  }));

  return (
    <div>
      <Space style={{ marginBottom: 24 }} direction="vertical">
        <Title level={2}>Loans (Money Lent)</Title>
        <Button type="primary" onClick={handleAddLoan} icon={<PlusOutlined />}>
          Add Loan
        </Button>
      </Space>

      <Card>
        <Table columns={columns} dataSource={data} rowKey="id" scroll={{ x: 1000 }} pagination={{ pageSize: 10 }}>
          <Button type="text" danger block onClick={() => {}}>
            Edit
          </Button>
        </Table>
      </Card>
    </div>
  );
}
