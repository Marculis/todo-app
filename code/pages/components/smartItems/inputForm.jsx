import { Field } from "react-final-form";
import "./inputForm.scss";

export const InputFormWithState = ({
  name,
  placeholder,
  type,
  textValue,
  onChange,
}) => {
  return (
    <Field
      name={name}
      placeholder={placeholder}
      type={type}
      render={({ input, meta }) => (
        <div className="divInput">
          <label className="inputName">{name} </label>
          <input
            {...input}
            placeholder={placeholder}
            className="input"
            onChange={(e) => onChange(e.currentTarget.value)}
            value={textValue}
          />
          {meta.touched && meta.error && <span>{meta.error}</span>}
        </div>
      )}
    ></Field>
  );
};

export const InputForm = ({ name, placeholder, type }) => {
  return (
    <Field
      name={name}
      placeholder={placeholder}
      type={type}
      render={({ input, meta }) => (
        <div className="divInput">
          <label className="inputName">{name} </label>
          <input {...input} placeholder={placeholder} className="input" />
          {meta.touched && meta.error && <span>{meta.error}</span>}
        </div>
      )}
    ></Field>
  );
};
