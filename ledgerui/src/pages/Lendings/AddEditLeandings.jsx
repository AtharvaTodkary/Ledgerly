import { Button, Card, Col, Divider, Row, Space, Typography } from "antd";
import { Field, Formik, Form } from "formik";
import React from "react";
import GenericDatePicker from "../../shared/components/core-components/GenericDatePicker";
import GenericInput from "../../shared/components/core-components/GenericInput";
import GenericSelect from "../../shared/components/core-components/GenericSelect";
import { lendingFormValidation } from "./form";

const { Text } = Typography;

const AddEditLeandings = ({ initialValues, onCancel }) => {
  const INITIAL_VALUES = {
    lentDate: initialValues?.lentDate || null,
    borrowerName: initialValues?.borrowerName || "",
    loanAmount: initialValues?.loanAmount || "",
    dueDate: initialValues?.dueDate || null,
    status: initialValues?.status || "Open",
    repaymentType: initialValues?.repaymentType || undefined,
    purpose: initialValues?.purpose || "",
    notes: initialValues?.notes || "",
  };

  return (
    <div style={{ marginTop: 12 }}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={lendingFormValidation}
        enableReinitialize
        onSubmit={(values) => {
          console.log(values);
          onCancel?.();
        }}
      >
        {({ values, errors }) => {
          return (
            <Form>
              <Space direction="vertical" size={20} style={{ width: "100%" }}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius: 20,
                    background:
                      "linear-gradient(135deg, rgba(255,247,230,0.95) 0%, rgba(230,244,255,0.9) 100%)",
                  }}
                >
                  <Space direction="vertical" size={4}>
                    <Text strong style={{ fontSize: 16 }}>
                      Lending details
                    </Text>
                    <Text type="secondary">
                      Add the borrower, amount, and due date now so repayment
                      reminders stay easy to follow.
                    </Text>
                  </Space>
                </Card>

                <Row gutter={[12, 12]}>
                  <Col xs={24} lg={12}>
                    <Field
                      as={GenericInput}
                      name={"borrowerName"}
                      label={"Borrower Name"}
                      placeholder={"Enter borrower name"}
                      required
                      value={values?.borrowerName}
                    />
                  </Col>
                  <Col xs={24} lg={12}>
                    <Field
                      as={GenericInput}
                      name={"loanAmount"}
                      label={"Loan Amount (INR)"}
                      placeholder={"Enter loan amount"}
                      type={"number"}
                      required
                    />
                  </Col>
                  <Col xs={24} lg={12}>
                    <Field
                      as={GenericDatePicker}
                      label={"Lent On"}
                      name={"lentDate"}
                      required
                    />
                  </Col>
                  <Col xs={24} lg={12}>
                    <Field
                      as={GenericDatePicker}
                      label={"Due Date"}
                      name={"dueDate"}
                      required
                    />
                  </Col>
                  <Col xs={24} lg={12}>
                    <Field
                      as={GenericSelect}
                      name={"status"}
                      label="Status"
                      placeholder="Select loan status"
                      required
                      options={[
                        { label: "Open", value: "Open" },
                        {
                          label: "Partially Repaid",
                          value: "Partially Repaid",
                        },
                        { label: "Repaid", value: "Repaid" },
                        { label: "Overdue", value: "Overdue" },
                      ]}
                    />
                  </Col>
                  <Col xs={24} lg={12}>
                    <Field
                      as={GenericSelect}
                      name={"repaymentType"}
                      label="Repayment Type"
                      placeholder="Select repayment type"
                      options={[
                        { label: "One-time", value: "One-time" },
                        { label: "Installments", value: "Installments" },
                        { label: "Flexible", value: "Flexible" },
                      ]}
                    />
                  </Col>
                  <Col xs={24}>
                    <Field
                      as={GenericInput}
                      name={"purpose"}
                      label={"Reason / Purpose"}
                      placeholder={"What was this loan for?"}
                    />
                  </Col>
                  <Col xs={24}>
                    <Field
                      as={GenericInput}
                      name={"notes"}
                      label={"Notes (Optional)"}
                      placeholder={"Add any repayment context or reminders"}
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
                      Save Lending
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

export default AddEditLeandings;
