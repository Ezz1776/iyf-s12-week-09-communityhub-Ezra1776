import styles from './Button.module.css';

function Button({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  ...rest
}) {
  const combinedClassName = [
    styles.button,
    styles[variant] || styles.primary,
    styles[size] || styles.medium,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={combinedClassName}
      disabled={disabled || loading} /* Prevents double submission when loading */
      aria-busy={loading || undefined}
      {...rest} /* Forwards onClick, aria-*, type, etc. */
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  );
}

export default Button;
