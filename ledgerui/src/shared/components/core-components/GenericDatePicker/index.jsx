import { DatePicker } from 'antd';
import { useField, useFormikContext } from 'formik';

export default function GenericDatePicker({
  label,
  required = false,
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
            display: 'block',
            marginBottom: 8,
            fontWeight: 500,
          }}
        >
          {label}
          {required && (
            <span style={{ color: '#ff4d4f' }}> *</span>
          )}
        </label>
      )}

      <DatePicker
        {...props}
        value={field.value}
        status={hasError ? 'error' : ''}
        style={{
          width: '100%',
          ...props.style,
        }}
        onChange={(date, dateString) => {
          setFieldValue(props.name, date);

          if (props.onChange) {
            props.onChange(date, dateString);
          }
        }}
      />

      {hasError && (
        <div
          style={{
            color: '#ff4d4f',
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