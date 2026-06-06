import { useNavigate, useParams } from 'react-router-dom';
import {
  Form,
  Card,
  Typography,
  DatePicker,
  Radio,
  Select,
  Button,
  Input,
  Space,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import dayjs from 'dayjs';

const { Title } = Typography;
const { TextArea } = Input;

const validationSchema = yup.object({
  date: yup.date().required('Date is required'),
  type: yup.string().required('Type is required'),
  amount: yup
    .number()
    .positive('Amount must be positive')
    .required('Amount is required'),
  category: yup.string().required('Category is required'),
  description: yup.string().max(200),
  recipient: yup.string().max(100),
});

export default function AddTransaction() {
  const navigate = useNavigate();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      date: new Date().toISOString().split('T')[0],
      type: 'expense',
      amount: '',
      category: '',
      description: '',
      recipient: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const expenses = JSON.parse(
        localStorage.getItem('ledgerly_expenses') || '[]'
      );

      if (id) {
        const index = expenses.findIndex(
          (expense) => expense.id === id
        );

        if (index !== -1) {
          expenses[index] = {
            ...expenses[index],
            ...values,
            id,
          };
        }
      } else {
        expenses.push({
          ...values,
          id: crypto.randomUUID(),
        });
      }

      localStorage.setItem(
        'ledgerly_expenses',
        JSON.stringify(expenses)
      );

      navigate('/expenses');
    },
  });

  useEffect(() => {
    if (!id) return;

    const expenses = JSON.parse(
      localStorage.getItem('ledgerly_expenses') || '[]'
    );

    const transaction = expenses.find(
      (expense) => expense.id === id
    );

    if (transaction) {
      formik.setValues({
        date: new Date(transaction.date)
          .toISOString()
          .split('T')[0],
        type: transaction.type || 'expense',
        amount: transaction.amount || '',
        category: transaction.category || '',
        description: transaction.description || '',
        recipient: transaction.recipient || '',
      });
    }
  }, [id]);

  return (
    <div>
      <Space
        style={{ marginBottom: 24 }}
        direction="vertical"
      >
        <Title level={2}>
          {id ? 'Edit Transaction' : 'Add Transaction'}
        </Title>

        <Space>
          <Button onClick={() => navigate('/expenses')}>
            Cancel
          </Button>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => formik.handleSubmit()}
          >
            Save
          </Button>
        </Space>
      </Space>

      <Card>
        <Form
          layout="vertical"
          style={{ maxWidth: 600 }}
          onFinish={formik.handleSubmit}
        >
          <Form.Item
            label="Date"
            validateStatus={
              formik.touched.date && formik.errors.date
                ? 'error'
                : ''
            }
            help={
              formik.touched.date && formik.errors.date
            }
          >
            <DatePicker
              style={{ width: '100%' }}
              value={dayjs(formik.values.date)}
              format="DD/MM/YYYY"
              onChange={(date) =>
                formik.setFieldValue(
                  'date',
                  date?.format('YYYY-MM-DD')
                )
              }
            />
          </Form.Item>

          <Form.Item label="Type">
            <Radio.Group
              value={formik.values.type}
              onChange={(e) =>
                formik.setFieldValue(
                  'type',
                  e.target.value
                )
              }
            >
              <Radio.Button value="income">
                Income
              </Radio.Button>
              <Radio.Button value="expense">
                Expense
              </Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Amount (INR)"
            validateStatus={
              formik.touched.amount &&
              formik.errors.amount
                ? 'error'
                : ''
            }
            help={
              formik.touched.amount &&
              formik.errors.amount
            }
          >
            <Input
              addonBefore="₹"
              type="number"
              name="amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Category"
            validateStatus={
              formik.touched.category &&
              formik.errors.category
                ? 'error'
                : ''
            }
            help={
              formik.touched.category &&
              formik.errors.category
            }
          >
            <Select
              value={formik.values.category}
              onChange={(value) =>
                formik.setFieldValue(
                  'category',
                  value
                )
              }
            >
              <Select.Option value="Salary">
                Salary
              </Select.Option>
              <Select.Option value="Bonus">
                Bonus
              </Select.Option>
              <Select.Option value="Investments">
                Investments
              </Select.Option>
              <Select.Option value="Gifts">
                Gifts
              </Select.Option>
              <Select.Option value="Other">
                Other
              </Select.Option>
              <Select.Option value="Food">
                Food
              </Select.Option>
              <Select.Option value="Transport">
                Transport
              </Select.Option>
              <Select.Option value="Utilities">
                Utilities
              </Select.Option>
              <Select.Option value="Shopping">
                Shopping
              </Select.Option>
              <Select.Option value="Entertainment">
                Entertainment
              </Select.Option>
              <Select.Option value="Healthcare">
                Healthcare
              </Select.Option>
              <Select.Option value="Education">
                Education
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Description">
            <TextArea
              rows={2}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </Form.Item>

          <Form.Item label="Paid To (Recipient Name)">
            <Input
              name="recipient"
              value={formik.values.recipient}
              onChange={formik.handleChange}
              placeholder="Enter recipient name (optional)"
            />
          </Form.Item>

          <Form.Item>
            <Typography.Text type="secondary">
              Select type and category to add this
              transaction to your ledger. Recipient
              name is for tracking who you paid.
            </Typography.Text>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}