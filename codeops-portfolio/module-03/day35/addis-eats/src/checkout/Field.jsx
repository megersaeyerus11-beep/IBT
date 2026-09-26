function Field({
  label,
  id,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  children,
}) {
  const errorId = `${id}-error`;

  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label}
      </label>

      {type === "select" ? (
        <select
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? errorId : undefined
          }
        >
          {children}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? errorId : undefined
          }
          rows="4"
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? errorId : undefined
          }
        />
      )}

      {error && (
        <p
          id={errorId}
          className="form-error"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default Field;