export const InputField = (props) => {
  return (
    <div className="form-floating mb-3 input-field">
      <input
        onChange={props.onChange}
        type={props.type}
        className="form-control"
        placeholder={props.placeholder}
        name={props.name}
        id={props.name}
        required
        minLength={props.min}
        maxLength={props.max}
        autoComplete="off"
      />
      <label htmlFor={props.name}>{props.placeholder}</label>
    </div>
  );
};
