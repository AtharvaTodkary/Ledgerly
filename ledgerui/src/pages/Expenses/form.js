import * as Yup from "yup";

export const expenseFormValidation = Yup.object({
  date: Yup.date().required("Date is required"),
  type: Yup.string().required("Type is required"),
  amount: Yup
    .number()
    .positive("Amount must be positive")
    .required("Amount is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().max(200),
  recipient: Yup.string().max(100),
});
