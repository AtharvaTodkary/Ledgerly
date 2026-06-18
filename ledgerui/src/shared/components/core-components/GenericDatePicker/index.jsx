import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useField, useFormikContext } from "formik";

const normalizeDateValue = (value) => {
  if (!value) {
    return null;
  }

  if (dayjs.isDayjs(value)) {
    return value.isValid() ? value : null;
  }

  const parsedValue = dayjs(value);
  return parsedValue.isValid() ? parsedValue : null;
};

export default function GenericDatePicker({
  label,
  required = false,
  ...props
}) {
  const [field, meta] = useField(props.name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const hasError = meta.touched && meta.error;
  const dateValue = normalizeDateValue(field.value);

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
          {required && (
            <span style={{ color: "#ff4d4f" }}> *</span>
          )}
        </label>
      )}

      <DatePicker
        {...props}
        value={dateValue}
        status={hasError ? "error" : ""}
        style={{
          width: "100%",
          ...props.style,
        }}
        onChange={(date, dateString) => {
          setFieldValue(props.name, date || null);
          setFieldTouched(props.name, true, false);

          if (props.onChange) {
            props.onChange(date, dateString);
          }
        }}
        onBlur={() => setFieldTouched(props.name, true)}
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
