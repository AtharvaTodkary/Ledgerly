import { Select } from "antd";
import { useField, useFormikContext } from "formik";

export default function GenericSelect({
  label,
  required = false,
  options = [],
  ...props
}) {
  const [field, meta] = useField(props.name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const hasError = meta.touched && meta.error;

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

      <Select
        {...props}
        value={field.value}
        options={options}
        status={hasError ? "error" : ""}
        showSearch
        allowClear
        optionFilterProp="label"
        onChange={(value, option) => {
          setFieldValue(props.name, value);

          if (props.onChange) {
            props.onChange(value, option);
          }
        }}
        style={{
          width: "100%",
          ...props.style,
        }}
      />

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
