import { useNavigate } from 'react-router-dom';
import {
  Form,
  Card,
  Typography,
  DatePicker,
  Button,
  Input,
  Space,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import dayjs from 'dayjs';

const { Title } = Typography;
const { TextArea } = Input;

const validationSchema = yup.object({
  borrowerName: yup.string().required('Borrower name is required'),
  totalAmount: yup
    .number()
    .positive('Amount must be positive')
    .required('Amount is required'),
  dueDate: yup
    .date()
    .required('Due date is required')
    .min(new Date(), 'Due date cannot be in the past'),
  notes: yup.string().max(200, 'Maximum 200 characters'),
});

export default function AddLoan() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      borrowerName: '',
      totalAmount: '',
      dueDate: '',
      notes: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const loans = JSON.parse(
        localStorage.getItem('ledgerly_loans') || '[]'
      );

      const newLoan = {
        id: crypto.randomUUID(),
        borrowerName: values.borrowerName,
        totalAmount: Number(values.totalAmount),
        dueDate: values.dueDate,
        notes: values.notes,
        status: 'unpaid',
        createdAt: new Date().toISOString(),
      };

      loans.push(newLoan);

      localStorage.setItem(
        'ledgerly_loans',
        JSON.stringify(loans)
      );

      navigate('/lending');
    },
  });

  return (
    <div>
      <Space
        style={{ marginBottom: 24 }}
        direction="vertical"
      >
        <Title level={2}>Add New Loan</Title>

        <Space>
          <Button onClick={() => navigate('/lending')}>
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
          style={{ maxWidth: 500 }}
          onFinish={formik.handleSubmit}
        >
          <Form.Item
            label="Borrower Name"
            validateStatus={
              formik.touched.borrowerName &&
              formik.errors.borrowerName
                ? 'error'
                : ''
            }
            help={
              formik.touched.borrowerName &&
              formik.errors.borrowerName
            }
          >
            <Input
              name="borrowerName"
              placeholder="e.g. John Doe"
              value={formik.values.borrowerName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>

          <Form.Item
            label="Loan Amount (INR)"
            validateStatus={
              formik.touched.totalAmount &&
              formik.errors.totalAmount
                ? 'error'
                : ''
            }
            help={
              formik.touched.totalAmount &&
              formik.errors.totalAmount
            }
          >
            <Input
              addonBefore="₹"
              type="number"
              min="0"
              step="0.01"
              name="totalAmount"
              value={formik.values.totalAmount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>

          <Form.Item
            label="Due Date"
            validateStatus={
              formik.touched.dueDate &&
              formik.errors.dueDate
                ? 'error'
                : ''
            }
            help={
              formik.touched.dueDate &&
              formik.errors.dueDate
            }
          >
            <DatePicker
              style={{ width: '100%' }}
              value={
                formik.values.dueDate
                  ? dayjs(formik.values.dueDate)
                  : null
              }
              onChange={(date) =>
                formik.setFieldValue(
                  'dueDate',
                  date
                    ? date.toISOString()
                    : ''
                )
              }
              disabledDate={(current) =>
                current &&
                current <
                  dayjs().startOf('day')
              }
            />
          </Form.Item>

          <Form.Item
            label="Notes (Optional)"
            validateStatus={
              formik.touched.notes &&
              formik.errors.notes
                ? 'error'
                : ''
            }
            help={
              formik.touched.notes &&
              formik.errors.notes
            }
          >
            <TextArea
              rows={3}
              name="notes"
              placeholder="Any additional notes about this loan..."
              value={formik.values.notes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>

          <Form.Item>
            <Typography.Text type="secondary">
              Status defaults to Unpaid. The due date
              will be set to the date you select.
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