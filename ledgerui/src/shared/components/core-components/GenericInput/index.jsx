import { Input } from "antd";
import { useField } from "formik";

const { Password, TextArea } = Input;

export default function GenericInput({
  label,
  type = "text",
  required = false,
  ...props
}) {
  const [field, meta] = useField(props.name);

  const hasError = meta.touched && meta.error;

  const renderInput = () => {
    switch (type) {
      case "password":
        return (
          <Password
            {...field}
            {...props}
            style={{
              width: "100%",
              ...props.style,
            }}
            status={hasError ? "error" : ""}
          />
        );

      case "textarea":
        return (
          <TextArea
            {...field}
            {...props}
            style={{
              width: "100%",
              ...props.style,
            }}
            status={hasError ? "error" : ""}
          />
        );

      default:
        return (
          <Input
            {...field}
            {...props}
            style={{
              width: "100%",
              ...props.style,
            }}
            type={type}
            status={hasError ? "error" : ""}
          />
        );
    }
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={props.name}
          style={{
            display: "block",
            marginBottom: 8,
            fontWeight: 500,
          }}
        >
          {label}
          {required && <span style={{ color: "#ff4d4f" }}> *</span>}
        </label>
      )}

      {renderInput()}

      {hasError && (
        <div
          style={{
            color: "#ff4d4f",
            fontSize: 12,
            marginTop: 4,
          }}
        >
          {meta.error}
        </div>
      )}
    </div>
  );
}
