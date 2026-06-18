import { Button, Card, Col, Divider, Form, Row, Space, Typography } from "antd";
import { Field, Formik } from "formik";
import React from "react";

import GenericSelect from "../../shared/components/core-components/GenericSelect";
import GenericInput from "../../shared/components/core-components/GenericInput";
import { expenseFormValidation } from "./form";
import GenericDatePicker from "../../shared/components/core-components/GenericDatePicker";

const { Text } = Typography;

const AddEditExpense = ({ onCancel, initialValues }) => {
  return (
    <div style={{ marginTop: 12 }}>
      <Formik
        initialValues={{
          date: initialValues?.date || null,
          type: initialValues?.type || undefined,
          amount: initialValues?.amount || null,
          category: initialValues?.category || undefined,
          recipient: initialValues?.recipient || "",
          description: initialValues?.description || "",
        }}
        validationSchema={expenseFormValidation}
        enableReinitialize
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {() => {
          return (
            <Form>
              <Space direction="vertical" size={20} style={{ width: "100%" }}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius: 20,
                    background:
                      "linear-gradient(135deg, rgba(230,244,255,0.8) 0%, rgba(246,255,237,0.9) 100%)",
                  }}
                >
                  <Space direction="vertical" size={4}>
                    <Text strong style={{ fontSize: 16 }}>
                      Transaction details
                    </Text>
                    <Text type="secondary">
                      Capture the essentials now and refine the note later if
                      needed.
                    </Text>
                  </Space>
                </Card>

                <Row gutter={[24, 24]}>
                  <Col xs={24}>
                    <Field
                      as={GenericDatePicker}
                      label={"Date"}
                      name={"date"}
                      required
                    />
                  </Col>
                  <Col xs={24} lg={12}>
                    <Field
                      as={GenericSelect}
                      name={"type"}
                      label="Type"
                      placeholder="Select transaction type"
                      required
                      options={[
                        { label: "Income", value: "Income" },
                        { label: "Expense", value: "Expense" },
                      ]}
                    />
                  </Col>
                  <Col xs={24} lg={12}>
                    <Field
                      as={GenericSelect}
                      name={"category"}
                      label={"Category"}
                      placeholder={"Select a category"}
                      required
                      options={[
                        { label: "Salary", value: "Salary" },
                        { label: "Bonus", value: "Bonus" },
                        { label: "Investments", value: "Investments" },
                        { label: "Gifts", value: "Gifts" },
                        { label: "Other", value: "Other" },
                        { label: "Food", value: "Food" },
                        { label: "Transport", value: "Transport" },
                        { label: "Utilities", value: "Utilities" },
                        { label: "Shopping", value: "Shopping" },
                        { label: "Entertainment", value: "Entertainment" },
                        { label: "Healthcare", value: "Healthcare" },
                        { label: "Education", value: "Education" },
                      ]}
                    />
                  </Col>
                  <Col xs={24} lg={12}>
                    <Field
                      as={GenericInput}
                      name={"amount"}
                      label={"Amount (INR)"}
                      placeholder={"Enter amount"}
                      required
                    />
                  </Col>
                  <Col xs={24} lg={12}>
                    <Field
                      as={GenericInput}
                      name={"recipient"}
                      label={"Paid To / Received From"}
                      placeholder={"Enter name"}
                      required
                    />
                  </Col>
                  <Col xs={24}>
                    <Field
                      as={GenericInput}
                      name={"description"}
                      label={"Description"}
                      placeholder={"Add a short note"}
                      type={"textarea"}
                      rows={4}
                    />
                  </Col>
                </Row>

                <Divider style={{ margin: 0 }} />

                <Row gutter={[16, 16]} justify="end">
                  <Col xs={24} sm={10} lg={6}>
                    <Button block size="large" onClick={onCancel}>
                      Cancel
                    </Button>
                  </Col>
                  <Col xs={24} sm={10} lg={6}>
                    <Button block size="large" type="primary" htmlType="submit">
                      Save Transaction
                    </Button>
                  </Col>
                </Row>
              </Space>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddEditExpense;
