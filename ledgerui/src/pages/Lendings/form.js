import * as Yup from "yup";

export const lendingFormValidation = Yup.object({
  lentDate: Yup.date().required("Lent date is required"),
  borrowerName: Yup.string()
    .trim()
    .max(100, "Borrower name must be 100 characters or less")
    .required("Borrower name is required"),
  loanAmount: Yup.number()
    .typeError("Loan amount must be a number")
    .positive("Loan amount must be positive")
    .required("Loan amount is required"),
  dueDate: Yup.date()
    .required("Due date is required")
    .min(Yup.ref("lentDate"), "Due date cannot be before lent date"),
  status: Yup.string().required("Status is required"),
  repaymentType: Yup.string().nullable(),
  purpose: Yup.string().max(120, "Purpose must be 120 characters or less"),
  notes: Yup.string().max(300, "Notes must be 300 characters or less"),
});
