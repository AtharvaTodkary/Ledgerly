import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Form, Typography, DatePicker, InputNumber, Button, Space, Tag, Result, Input } from 'antd';
import { BankOutlined, DollarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { recordPayment } from '../../features/lending/lendingSlice';

const { Title } = Typography;
const { TextArea } = Input;

export default function LoanPayments() {
  const navigate = useNavigate();
  const { loanId } = useParams();
  const dispatch = useAppDispatch();
  const loans = useAppSelector((state) => state.lending.loans);

  const [loan, setLoan] = useState(null);

  useEffect(() => {
    if (loanId) {
      const foundLoan = loans.find((l) => l.id === loanId);
      if (foundLoan) {
        setLoan(foundLoan);
      }
    }
  }, [loanId, loans]);

  if (!loan) {
    return <Result status="error" title="Loan not found" subTitle="The requested loan has been deleted or does not exist." />;
  }

  const formik = useFormik({
    initialValues: {
      paymentAmount: 0,
      paymentDate: new Date(),
      paymentNote: '',
    },
    validationSchema: yup.object({
      paymentAmount: yup.number().positive('Payment amount must be positive'),
    }),
    onSubmit: async (values) => {
      const payment = {
        amount: values.paymentAmount,
        date: values.paymentDate,
        note: values.paymentNote || 'Payment received',
      };

      const updatedLoan = {
        ...loan,
        partialPayments: [...(loan.partialPayments || []), payment],
      };

      dispatch(recordPayment({ loanId: loan.id, payment }));
      navigate('/lending');
    },
  });

  const totalPaid = loan.partialPayments?.reduce((sum, p) => sum + p.amount, 0) || 0;
  const remaining = loan.remainingBalance || 0;
  const percentage = ((totalPaid / loan.totalAmount) * 100) || 0;
  const isPaid = remaining === 0;

  return (
    <div>
      <Space style={{ marginBottom: 24 }} direction="vertical">
        <Title level={2}>
          <BankOutlined style={{ marginRight: 8 }} />
          Record Payment for {loan.borrowerName}
        </Title>
      </Space>

      <Card>
        <Title level={4} style={{ marginBottom: 16 }}>
          Loan Summary
        </Title>

        <div style={{ marginBottom: 24 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Original Amount:</span>
              <span>₹{loan.totalAmount.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total Paid:</span>
              <span style={{ color: '#52c41a' }}>₹{totalPaid.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Remaining Balance:</span>
              <span style={{ color: remaining > 0 ? '#ff4d4f' : '#52c41a' }}>
                ₹{remaining.toLocaleString()}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Due Date:</span>
              <span>{loan.dueDate ? new Date(loan.dueDate).toLocaleDateString() : 'Not Set'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Status:</span>
              <Tag color={LOAN_STATUS_COLORS[loan.status]}>
                {LOAN_STATUS_LABELS[loan.status]}
              </Tag>
            </div>
          </Space>
        </div>

        <Title level={5} style={{ marginBottom: 12 }}>
          <DollarOutlined style={{ marginRight: 8 }} />
          Record Partial Payment
        </Title>

        <Form
          name="payment"
          layout="vertical"
          onFinish={formik.handleSubmit}
          form={formik}
        >
          <Form.Item
            name="paymentAmount"
            label="Payment Amount (INR)"
            rules={[
              { required: true, message: 'Payment amount is required!' },
              { min: 1, message: 'Payment must be at least 1 rupee!' },
            ]}
          >
            <InputNumber
              addonBefore="₹"
              type="number"
              step="0.01"
              min="1"
              max={remaining}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="paymentDate"
            label="Payment Date"
          >
            <DatePicker showTime disabledDate={(d) => d > new Date()} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="paymentNote"
            label="Payment Notes (Optional)"
          >
            <TextArea rows={2} placeholder="Any notes about this payment..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<CheckCircleOutlined />}>
              Record Payment
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
