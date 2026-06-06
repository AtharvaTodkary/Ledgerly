import { useEffect } from 'react';
import { Card, Row, Col, Typography, List, Statistic } from 'antd';
import { DollarOutlined, BankOutlined, InboxOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../app/hooks';
// import { deleteTransaction, markLoanPaid } from '../features/expenses/expensesSlice';

const { Title, Paragraph } = Typography;

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector((state) => state.expenses.transactions);
  const loans = useAppSelector((state) => state.lending.loans);

  useEffect(() => {
    const storedLoans = JSON.parse(localStorage.getItem('ledgerly_loans') || '[]');
    const storedTransactions = JSON.parse(localStorage.getItem('ledgerly_expenses') || '[]');
    if (window.location.href.includes('/dashboard')) {
      window.expenses = storedTransactions;
      window.loans = storedLoans;
    }
  }, []);

  // Calculate totals
  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0);
  const totalLent = loans.reduce((sum, l) => sum + Number(l.totalAmount), 0);
  const totalPaid = loans.reduce((sum, l) => sum + (Number(l.partialPayments?.reduce((p, pp) => p + Number(pp.amount), 0)) || 0), 0);
  const amountDue = totalLent - totalPaid;
  const recentTransactions = [...transactions.slice(-5)].reverse();
  const recentLoans = [...loans.slice(-5)].reverse();

  const stats = [
    {
      title: 'Total Income',
      value: income.toLocaleString(),
      icon: <DollarOutlined style={{ color: '#52c41a' }} />,
      description: 'Total income received',
    },
    {
      title: 'Total Expenses',
      value: expense.toLocaleString(),
      icon: <DollarOutlined style={{ color: '#ff4d4f' }} />,
      description: 'Total expenses paid',
    },
    {
      title: 'Total Lended',
      value: totalLent.toLocaleString(),
      icon: <BankOutlined style={{ color: '#1890ff' }} />,
      description: 'Money lent to others',
    },
    {
      title: 'Amount Due',
      value: amountDue.toLocaleString(),
      icon: <CheckCircleOutlined style={{ color: '#faad14' }} />,
      description: 'Unpaid loans',
    },
  ];

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card title="Financial Summary">
            <Row gutter={[24, 24]}>
              {stats.map((stat, index) => (
                <Col span={6} key={index}>
                  <Statistic
                    title={stat.title}
                    value={Number(stat.value)}
                    precision={2}
                    suffix="₹"
                    valueStyle={{ color: '#3F5460', fontSize: 20 }}
                  />
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Recent Transactions" bordered={false}>
            <List
              dataSource={recentTransactions}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <span key="actions">{item.description || '-'}</span>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<span style={{ fontSize: 24 }}>{item.type === 'income' ? '↗' : '↘'}</span>}
                    title={<span>{item.category} - ₹{Number(item.amount).toLocaleString()}</span>}
                    description={new Date(item.date).toLocaleDateString()}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Recent Loans" bordered={false}>
            <List
              dataSource={recentLoans}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<span style={{ fontSize: 24 }}>💵</span>}
                    title={<span>{item.borrowerName}</span>}
                    description={<span>₹{Number(item.totalAmount).toLocaleString()} - {item.status}</span>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
