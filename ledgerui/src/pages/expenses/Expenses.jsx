import { useState } from 'react';
import { Card, Table, Button, Space, Badge, Tag, Typography, Row, Col, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteTransaction } from '../../features/expenses/expensesSlice';
import { LOAN_STATUS_COLORS, LOAN_STATUS_LABELS } from '../../shared/constants';

const { Title, Text } = Typography;

const STATUS_COLORS = {
  income: '#52c41a',
  expense: '#ff4d4f',
};

const STATUS_LABELS = {
  income: 'Income',
  expense: 'Expense',
};

export default function Expenses() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const transactions = useAppSelector((state) => state.expenses.transactions);

  const handleAddExpense = () => {
    navigate('/expenses/new');
  };

  const handleDelete = (id) => {
    dispatch(deleteTransaction(id));
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Badge color={type === 'income' ? 'green' : 'red'} text={STATUS_LABELS[type]} />
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `₹${amount.toLocaleString()}`,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Recipient',
      dataIndex: 'recipient',
      key: 'recipient',
      render: (recipient) => recipient || '- ',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data = transactions.map((t) => ({
    ...t,
    key: t.id,
    status: t.type === 'income' ? 'income' : 'expense',
  }));

  return (
    <div>
      <Space style={{ marginBottom: 24 }} direction="vertical">
        <Title level={2}>Transactions</Title>
        <Button type="primary" onClick={handleAddExpense} icon={<PlusOutlined />}>
          Add Transaction
        </Button>
      </Space>

      <Card>
        <Table columns={columns} dataSource={data} rowKey="id" scroll={{ x: 1000 }}>
          <Button type="text" danger block onClick={() => {}}>
            Edit
          </Button>
        </Table>
      </Card>
    </div>
  );
}
