import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  className = "",
  as: Component = "button",
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:ring-offset-2
    disabled:opacity-50 disabled:pointer-events-none
    rounded-[var(--radius-card)]
  `;

  const variants = {
    primary: `
      bg-[var(--primary)] text-[var(--bg)]
      hover:bg-[var(--primary-600)]
      active:bg-[var(--primary-700)]
    `,
    secondary: `
      bg-transparent border border-[var(--border)] text-[var(--text)]
      hover:bg-[var(--surface-elev)]
    `,
    ghost: `
      bg-transparent border border-[var(--border)] text-[var(--text)]
      hover:bg-[var(--surface-elev)]
    `,
  };

  const sizes = {
    small: "px-3 py-2 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  return (
    <Component
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
